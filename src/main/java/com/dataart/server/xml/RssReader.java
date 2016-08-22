package com.dataart.server.xml;

import com.dataart.server.persistence.Feed;
import com.dataart.server.persistence.Post;
import com.dataart.server.utils.DateConverter;
import com.sun.jersey.spi.resource.Singleton;

import javax.ejb.Stateless;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.events.Characters;
import javax.xml.stream.events.XMLEvent;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by misha on 11.08.16.
 */
@Stateless
@Singleton
public class RssReader {

    public Feed parseFeed(Feed feed) {
        List<Post> posts = new ArrayList<>();
        try {
            URL rssUrl = new URL(feed.getLink());
            XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
            try (InputStream rssStream = rssUrl.openStream()) {
                XMLEventReader xmlReader = xmlInputFactory.createXMLEventReader(new BufferedInputStream(rssStream));
                while (xmlReader.hasNext()) {
                    XMLEvent event = xmlReader.nextEvent();
                    if (event.isStartElement() && event.asStartElement().getName().getLocalPart().toUpperCase().equals("ITEM")) {
                        posts.add(processItem(xmlReader));
                    } else if (event.isStartElement() && event.asStartElement().getName().getLocalPart().toUpperCase().equals("TITLE")){
                        feed.setTitle(getData(xmlReader.nextEvent()));
                    }
                }
                posts.forEach(System.out::println);
                feed.setPosts(posts);
            } catch (Exception ex) {
                System.out.println("Cannot parse rss: "+feed.getLink());
                ex.printStackTrace();
            }
        } catch (IOException ex) {
            System.out.println("Cannot access rss resource");
            ex.printStackTrace();
        }
        return feed;
    }

    private Post processItem(XMLEventReader reader) throws Exception {
        XMLEvent innerEvent;
        String title = "";
        String link = "";
        String desc = "";
        String pubDate = "";
        String guid = "";
        Post post = new Post();
        while (reader.hasNext()) {
            innerEvent = reader.nextEvent();
            if (innerEvent.isEndElement() && innerEvent.asEndElement().getName().getLocalPart().toUpperCase().equals("ITEM")) {
                post.setTitle(title);
                post.setLink(link);
                post.setPubDate(DateConverter.parseDate(pubDate));
                post.setGuid(guid);
                post.setDescription(desc);
                break;
            } else if (innerEvent.isStartElement()) {
                String tag = innerEvent.asStartElement().getName().getLocalPart();
                XMLEvent nextEvent = reader.nextEvent();
                switch (tag.toUpperCase()) {
                    case "TITLE":
                        title = getData(nextEvent);
                        break;
                    case "DESCRIPTION":
                        desc = getData(nextEvent);
                        break;
                    case "LINK":
                        link = getData(nextEvent);
                        break;
                    case "PUBDATE":
                        pubDate = getData(nextEvent);
                        break;
                    case "GUID":
                        guid = getData(nextEvent);
                        break;
                    default:
                        break;
                }
                reader.nextEvent();
            }
        }
        return post;
    }

    private String getData(XMLEvent event) {
        String result = "";
        if (event instanceof Characters) {
            result = event.asCharacters().getData();
        }
        return result;
    }

    public void validateRssSource(String url) {

    }

}
