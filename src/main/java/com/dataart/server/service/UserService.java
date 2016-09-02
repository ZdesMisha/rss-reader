package com.dataart.server.service;

import com.dataart.server.dao.UserDao;
import com.dataart.server.persistence.User;
import javax.ejb.Stateless;
import javax.inject.Inject;

/**
 * Created by misha on 11.08.16.
 */

@Stateless
public class UserService {

    @Inject
    private UserDao userDao;

    public void create(User user) {
        userDao.create(user);
    }

    public boolean isExists(String email, String password) {
        return userDao.find(email, password) != null;
    }
}
