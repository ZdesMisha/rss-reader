package com.dataart.server.cache;

import com.dataart.server.persistence.Feed;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by misha on 10.08.16.
 */
public class LocalCache {


    private List<Feed> feeds = new ArrayList<>();

    public LocalCache(List<Feed> feeds) {
        this.feeds = feeds;
    }


    public List<Feed> getFeeds() {
        return feeds;
    }
}
