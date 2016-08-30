package com.dataart.server.service;

import com.dataart.server.dao.FeedDao;
import com.dataart.server.exception.ServiceException;
import com.dataart.server.json.entity.RssLink;
import com.dataart.server.persistence.Feed;
import com.dataart.server.xml.RssReader;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.sql.SQLException;
import java.util.List;

import static com.dataart.server.utils.PaginationUtils.*;


/**
 * Created by misha on 09.08.16.
 */
@Stateless
public class FeedService {

    @Inject
    private FeedDao feedDao;

    @Inject
    private RssReader rssReader;


    public List<Feed> getPage(int page) {
        return feedDao.getPage("misha@mail.ru", getStartRow(page));
    }

    public void addFeed(RssLink rss) {
        try {
            Feed feed = new Feed(rss.getLink());
            feedDao.addFeed("misha@mail.ru", rssReader.parseFeed(feed));
        } catch (Exception ex) {
            throw new ServiceException("Unable to add feed." +
                    "Error message: " + ex.getMessage());
        }
    }

    public void removeFeed(Long id) {
        try {
            feedDao.removeFeed("misha@mail.ru", id);
        } catch (SQLException ex) {
            throw new ServiceException("Unable to remove feed." +
                    "Error message: " + ex.getMessage());
        }
    }





    public Feed getSingle(Long id, String sortField, String sortDir, int page) {
        try {
            return feedDao.getSingle("misha@mail.ru", id, sortField, sortDir, getStartRow(page));
        } catch (SQLException ex) {
            throw new ServiceException("Unable to fetch single feeds." +
                    "Error message: " + ex.getMessage());
        }
    }

    public void refreshFeeds() {
        try {
            List<Feed> feeds = feedDao.getAll("misha@mail.ru");
            for (Feed feed : feeds) {
                feedDao.updateFeed("misha@mail.ru", rssReader.parseFeed(feed));
            }
        } catch (Exception ex) {
            throw new ServiceException("Unable to refresh feeds." +
                    "Error message: " + ex.getMessage());
        }
    }

    public List<Feed> getAllPages(int pages) {
        return feedDao.getAllPages("misha@mail.ru", pages);
    }

    public Feed searchByPattern(Long id, String pattern, String sortField, String sortDir, int page) {
        return feedDao.searchByPattern("misha@mail.ru", id, pattern, sortField, sortDir, getStartRow(page));
    }
}
