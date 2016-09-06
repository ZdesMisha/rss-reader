package com.dataart.server.service;

import com.dataart.server.dao.PostDao;
import com.dataart.server.domain.Post;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.sql.SQLException;

/**
 * Created by misha on 25.08.16.
 */
@Stateless
public class PostService {

    @Inject
    private PostDao postDao;

    public void setViewed(Long id) {
        try {
            postDao.setViewed("misha@mail.ru", id);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }


    public Post getPost(Long id) {
        return postDao.getSingle(id);
    }

}
