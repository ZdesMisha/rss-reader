package com.dataart.server.dao;

import com.dataart.server.DataSourceConfiguration;
import com.sun.jersey.spi.resource.Singleton;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
/**
 * Created by misha on 09.08.16.
 */
@Singleton
@Stateless
public class UserDao {


    public void create(String email, String password) {
        try (Connection connection = DataSourceConfiguration.getConnection()){
            PreparedStatement statement = connection.prepareStatement("INSERT INTO users (email,password) VALUES (?,?)");
            statement.setNString(1, email);
            statement.setNString(2, password);
            statement.executeQuery();
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot get password");

        }
    }

    public String getPassword(String email) {
        try (Connection connection = DataSourceConfiguration.getConnection()) {
            PreparedStatement statement = connection.prepareStatement("SELECT password from users where email=?");
            statement.setNString(1, email);
            ResultSet result = statement.executeQuery();
            return result.getString("password");
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot get password");
        }
    }

}
