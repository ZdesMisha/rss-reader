package com.dataart.server.cache;

import com.dataart.server.dao.FeedRepository;
import com.dataart.server.dao.UserRepository;
import com.dataart.server.persistence.Feed;
import com.sun.jersey.api.core.InjectParam;
import com.sun.jersey.spi.resource.Singleton;

import javax.ejb.Stateless;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by misha on 10.08.16.
 */
@Stateless
@Singleton
public class LocalCacheManager {

    private Map<String,LocalCache> localCacheMap = new ConcurrentHashMap<>();

    @InjectParam
    private FeedRepository feedRepository;

    @InjectParam
    private UserRepository repository;


    private void refreshUserCache(String sessionEmail){
        //localCacheMap.put(sessionEmail,new LocalCache(list));
    }

    private void refreshCache(){
        localCacheMap.keySet().forEach(this::refreshUserCache);
    }

    public List<Feed> getUserCacheContent(String sessionEmail){
        return localCacheMap.get(sessionEmail).getFeeds();
    }

}
