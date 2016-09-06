package com.dataart.server.dao;

import com.dataart.server.domain.User;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Created by misha on 09.08.16.
 */
@Stateless
public class UserDao {

    @Inject
    private DataSource dataSource;

    public void create(User user) {
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO users (email,password) VALUES (?,?)");
            preparedStatement.setString(1, user.getEmail());
            preparedStatement.setString(2, user.getPassword());
            preparedStatement.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("UNABLE TO CREATE USER");
        }
    }

    public User find(String email) {
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
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("UNABLE TO FIND USER");
        }
    }

}
