package com.dataart.server.service;

import com.dataart.server.dao.FeedRepository;
import com.dataart.server.dao.UserRepository;
import com.dataart.server.json.entity.FeedJson;
import com.dataart.server.persistence.Feed;
import com.dataart.server.persistence.Post;
import com.dataart.server.utils.Pager;
import com.dataart.server.xml.RssReader;
import com.sun.jersey.api.core.InjectParam;
import com.sun.jersey.spi.resource.Singleton;

import javax.ejb.Stateless;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Created by misha on 09.08.16.
 */
@Singleton
@Stateless
public class FeedService {

    @InjectParam
    private FeedRepository feedRepository;

    @InjectParam
    private RssReader rssReader;


    public void addFeed(FeedJson feed) {
        try {
            feedRepository.addFeed("misha@mail.ru", rssReader.parseFeed(new Feed(feed.getLink())));
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public void removeFeed(Long id) {
        try {
            feedRepository.removeFeed("misha@mail.ru", id);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public void setViewed(Long id) {
        try {
            feedRepository.setViewed("misha@mail.ru", id);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public List<Feed> getAll(int page) {
        return feedRepository.findAll("misha@mail.ru", Pager.getStartRow(page));
    }

    public List<Feed> getAllDetailed(int page) {
        return feedRepository.findAll("misha@mail.ru", Pager.getStartRow(page)).stream().map(feed -> rssReader.parseFeed(feed)).collect(Collectors.toList());
    }

    public Feed getFeed(Long id, String sortField, String sortDir, int page) {
        return feedRepository.findFeed("misha@mail.ru", id, sortField, sortDir, Pager.getStartRow(page));
    }

    public void refreshUserFeeds() {
        try {
            List<Feed> feeds = feedRepository.findByEmail("misha@mail.ru");
            for (Feed feed : feeds) {
                feedRepository.updateFeed(rssReader.parseFeed(feed));
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public List<Feed> refreshUserFeedList(int pages) {
        return feedRepository.getFeedPages("misha@mail.ru", pages);
    }

    public Post getPost(Long id) {
        return feedRepository.getPost(id);
    }


    public Feed searchByPattern(Long id, String pattern, String sortField, String sortDir, int page) {
        return feedRepository.searchByPattern("misha@mail.ru", id, pattern, sortField, sortDir, Pager.getStartRow(page));
    }
}
