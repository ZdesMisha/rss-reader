package com.dataart.server.dao;

import com.dataart.server.domain.User;

import javax.ejb.Singleton;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Created by misha on 09.08.16.
 */
@Singleton
public class UserDao {

    @Inject
    private DataSource dataSource;

    public void create(User user) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO users (email,password) VALUES (?,?)");
            preparedStatement.setString(1, user.getEmail());
            preparedStatement.setString(2, user.getPassword());
            preparedStatement.executeUpdate();
        }
    }

    public User find(String email) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("SELECT * from users where email=?");
            statement.setString(1, email);
            ResultSet result = statement.executeQuery();
            if (result.next()) {
                User fetchedUser = new User();
                fetchedUser.setPassword(result.getString("password"));
                fetchedUser.setEmail(result.getString("email"));
                return fetchedUser;
            } else {
                return null;
            }

        }
    }

}
