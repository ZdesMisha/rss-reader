package com.dataart.server.service;

import com.dataart.server.dao.UserDao;
import com.dataart.server.domain.User;

import javax.ejb.Stateless;
import javax.inject.Inject;

import static com.dataart.server.utils.MD5Crypter.*;

/**
 * Created by misha on 11.08.16.
 */

@Stateless
public class UserService {

    @Inject
    private UserDao userDao;

    public void create(User user) {
        if (isExists(user.getEmail())) {
            throw new RuntimeException("USER WITH SUCH EMAIL IS ALREADY EXISTS");
        } else {
            user.setPassword(cryptWithMD5(user.getPassword()));
            userDao.create(user);
        }
    }

    private boolean isExists(String email) {
        return userDao.find(email) != null;
    }

    public boolean isValid(String email, String password) {
        User user = userDao.find(email);

        return (user != null && user.getEmail().equals(email) && user.getPassword().equals(cryptWithMD5(password)));
    }
}
