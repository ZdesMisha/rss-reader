package com.dataart.server.dao;

import com.dataart.server.domain.Post;
import com.dataart.server.utils.DateConverter;
import com.dataart.server.utils.IOUtils;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import static java.sql.Connection.TRANSACTION_SERIALIZABLE;

/**
 * Created by misha on 25.08.16.
 */
@Stateless
public class PostDao {

    @Inject
   private DataSource dataSource;

    public Post getSingle(Long id) {
        try (Connection connection = dataSource.getConnection()) {

            PreparedStatement statement = connection.prepareStatement("SELECT * FROM post where id=?");
            statement.setLong(1, id);
            ResultSet result = statement.executeQuery();
            result.next();
            return new Post(
                    result.getLong("id"),
                    result.getString("title"),
                    result.getString("description"),
                    result.getString("link"),
                    DateConverter.toDate(result.getTimestamp("pubDate"))
            );

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot find item feeds");

        }
    }

    public void setViewed(String sessionEmail, Long post_id) throws SQLException {

        Connection connection = null;

        try {

            connection = dataSource.getConnection();
            connection.setTransactionIsolation(TRANSACTION_SERIALIZABLE);
            connection.setAutoCommit(false);

            //SET POST VIEWED
            PreparedStatement statement = connection.prepareStatement(
                    "UPDATE users_posts " +
                            "SET viewed = TRUE " +
                            "WHERE user_id=(SELECT id FROM users WHERE email=?) AND post_id=?");
            statement.setString(1, sessionEmail);
            statement.setLong(2, post_id);
            statement.executeUpdate();

            connection.commit();

        } catch (SQLException ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot set feed viewed to user. SQL exception");
        } finally {
            IOUtils.closeQuietly(connection);
        }
    }
}
