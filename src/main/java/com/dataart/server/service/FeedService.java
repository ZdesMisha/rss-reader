package com.dataart.server.service;

import com.dataart.server.authentication.AuthProvider;
import com.dataart.server.dao.FeedDao;
import com.dataart.server.domain.service.RssLink;
import com.dataart.server.domain.Feed;
import com.dataart.server.xml.RssParser;

import javax.ejb.Singleton;
import javax.inject.Inject;
import java.util.List;

import static com.dataart.server.utils.PaginationUtils.*;


/**
 * Created by misha on 09.08.16.
 */
@Singleton
public class FeedService {

    @Inject
    private FeedDao feedDao;

    @Inject
    private RssParser rssReader;

    @Inject
    private AuthProvider authProvider;


    public List<Feed> getPage(String email, int page) throws Exception {
        return feedDao.getPage(email, getStartRow(page));
    }

    public void addFeed(String email, RssLink rss) throws Exception {
        Feed feed = new Feed(rss.getLink());
        feedDao.addFeed(email, rssReader.parse(feed));
    }

    public void removeFeed(String email, Long id) throws Exception {
        feedDao.removeFeed(email, id);
    }

    public Feed getFeedPosts(String email, Long id, String sortField, String sortDir, int page) throws Exception {
        return feedDao.getFeedPosts(email, id, sortField, sortDir, getStartRow(page));
    }

    public void refreshFeeds(String email) throws Exception {
        List<Feed> feeds = feedDao.getAll(email);
        for (Feed feed : feeds) {
            feedDao.updateFeed(email, rssReader.parse(feed));
        }
    }

    public List<Feed> getAllPages(String email, int pages) throws Exception {
        return feedDao.getAllPages(email, pages);
    }

    public Feed searchByPattern(String email, Long id, String pattern, String sortField, String sortDir, int page) throws Exception {
        return feedDao.searchByPattern(email, id, pattern, sortField, sortDir, getStartRow(page));
    }
}
