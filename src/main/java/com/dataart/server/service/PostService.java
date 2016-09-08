package com.dataart.server.service;

import com.dataart.server.dao.PostDao;
import com.dataart.server.domain.Post;

import javax.ejb.Singleton;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.sql.SQLException;

/**
 * Created by misha on 25.08.16.
 */
@Singleton
public class PostService {

    @Inject
    private PostDao postDao;

    public void setViewed(String email,Long id) throws Exception {
        postDao.setViewed(email, id);
    }


    public Post getPost(Long id) throws Exception {
        return postDao.getSingle(id);
    }

}
