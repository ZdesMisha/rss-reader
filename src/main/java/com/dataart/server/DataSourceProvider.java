package com.dataart.server;

import com.zaxxer.hikari.HikariDataSource;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Singleton;
import javax.sql.DataSource;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by misha on 09.08.16.
 */
@ApplicationScoped
public class DataSourceProvider {

    @Produces @Singleton
    public DataSource getDataSource() {

        Properties properties = new Properties();
        HikariDataSource dataSource = new HikariDataSource();
        try (InputStream is = getClass().getClassLoader().getResourceAsStream("application.properties")) {

            properties.load(is);
            dataSource.setDriverClassName(properties.getProperty("POSTGRES_DB_DRIVER_CLASS"));
            dataSource.setJdbcUrl(properties.getProperty("POSTGRES_DB_URL"));
            dataSource.setUsername(properties.getProperty("POSTGRES_DB_USERNAME"));
            dataSource.setPassword(properties.getProperty("POSTGRES_DB_PASSWORD"));
            dataSource.setTransactionIsolation("TRANSACTION_SERIALIZABLE");
            return dataSource;

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Unable to initiate datasource");
        }
    }

}
