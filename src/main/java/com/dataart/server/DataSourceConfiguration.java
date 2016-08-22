package com.dataart.server;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Created by misha on 09.08.16.
 */
public class DataSourceConfiguration {
    private static String url = "jdbc:postgresql://127.0.0.1:5432/rss";
    private static String name = "rss_user";
    private static String password = "rss";

    public static Connection getConnection(){

        try {
            Class.forName("org.postgresql.Driver");
            return DriverManager.getConnection(url,name,password);
        }catch (ClassNotFoundException | SQLException ex){
            ex.printStackTrace();
            throw  new RuntimeException("Cannot find db Driver");
        }

    }

}
