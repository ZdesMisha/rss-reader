package com.dataart.server.dao;

import com.dataart.server.DataSourceConfiguration;
import com.dataart.server.persistence.User;
import com.sun.jersey.spi.resource.Singleton;

import javax.ejb.Stateless;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Created by misha on 09.08.16.
 */
@Stateless
public class UserDao {


    public void create(User user) {
        try (Connection connection = DataSourceConfiguration.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO users (email,password) VALUES (?,?)");
            statement.setNString(1, user.getEmail());
            statement.setNString(2, user.getPassword());
            statement.executeQuery();
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot get password");

        }
    }

    public User find(String email,String password) {
        try (Connection connection = DataSourceConfiguration.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("SELECT * from users where email=? and password=?");
            statement.setString(1, email);
            statement.setString(2, password);
            ResultSet result = statement.executeQuery();
            if (result.next()) {
                return new User(
                        result.getString("email"),
                        result.getString("password"));
            } else {
                return null;
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot get password");
        }
    }

}
