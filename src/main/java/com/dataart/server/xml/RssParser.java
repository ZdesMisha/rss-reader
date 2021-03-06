package com.dataart.server.xml;

import com.dataart.server.domain.Feed;
import com.dataart.server.domain.Post;
import com.dataart.server.exception.ServiceException;
import com.dataart.server.utils.DateConverter;

import javax.ejb.Stateless;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.events.Characters;
import javax.xml.stream.events.XMLEvent;
import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Stateless
public class RssParser {

    public Feed parse(Feed feed) throws ServiceException {

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
                    } else if (event.isStartElement() && event.asStartElement().getName().getLocalPart().toUpperCase().equals("TITLE")) {
                        feed.setTitle(getContent(xmlReader.nextEvent()));
                    }
                }
                feed.setPosts(posts);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new ServiceException("UNABLE TO PROCESS RSS RESOURCE");
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
                        title = getContent(nextEvent);
                        break;
                    case "DESCRIPTION":
                        desc = getContent(nextEvent);
                        break;
                    case "LINK":
                        link = getContent(nextEvent);
                        break;
                    case "PUBDATE":
                        pubDate = getContent(nextEvent);
                        break;
                    case "GUID":
                        guid = getContent(nextEvent);
                        break;
                    default:
                        break;
                }
                reader.nextEvent();
            }
        }
        return post;
    }

    private String getContent(XMLEvent event) {
        String result = "";
        if (event instanceof Characters) {
            result = event.asCharacters().getData();
            if (result.contains("<")) {
                result = result.substring(0, result.indexOf("<"));
            }
        }
        return result;
    }
}
