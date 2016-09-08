package com.dataart.server.service;

import com.dataart.server.dao.UserDao;
import com.dataart.server.domain.User;
import com.dataart.server.exception.ServiceException;

import javax.ejb.Singleton;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import static com.dataart.server.utils.MD5Crypter.*;

/**
 * Created by misha on 11.08.16.
 */

@Singleton
public class UserService {

    @Inject
    private UserDao userDao;

    @Transactional
    public void create(User user) throws Exception {
        if (isExists(user.getEmail())) {
            throw new ServiceException("USER WITH SUCH EMAIL IS ALREADY EXISTS");
        } else {
            user.setPassword(cryptWithMD5(user.getPassword()));
            userDao.create(user);
        }
    }

    private boolean isExists(String email) throws Exception {
        return userDao.find(email) != null;
    }

    public boolean isValid(String email, String password) throws Exception {
        User user = userDao.find(email);
        return (user != null && user.getEmail().equals(email) && user.getPassword().equals(cryptWithMD5(password)));
    }
}
