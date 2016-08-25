package com.dataart.server.dao;

import com.dataart.server.DataSourceConfiguration;
import com.dataart.server.persistence.Feed;
import com.dataart.server.persistence.Post;
import com.dataart.server.utils.DateConverter;
import com.sun.jersey.spi.resource.Singleton;

import javax.ejb.Stateless;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import static com.dataart.server.utils.Pager.PAGE_SIZE;
import static java.sql.Connection.TRANSACTION_SERIALIZABLE;

/**
 * Created by misha on 09.08.16.
 */
@Singleton
@Stateless
public class FeedDao {

    public List<Feed> getAll(String sessionEmail) {
        try (Connection connection = DataSourceConfiguration.getConnection()) {
            List<Feed> list = new ArrayList<>();
            PreparedStatement statement = connection.prepareStatement(
                    "SELECT * FROM rss " +
                            "WHERE id IN (SELECT rss_id FROM users_rss WHERE user_id =(SELECT id FROM users WHERE email=?))"
            );
            statement.setString(1, sessionEmail);
            ResultSet result = statement.executeQuery();
            while (result.next()) {
                list.add(new Feed(
                        result.getLong("id"),
                        result.getString("title"),
                        result.getString("link")));
            }
            return list;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot find all feeds");
        }
    }

    public List<Feed> getAllPages(String sessionEmail, int pages) {
        PreparedStatement statement;
        ResultSet result;
        try (Connection connection = DataSourceConfiguration.getConnection()) {
            List<Feed> list = new ArrayList<>();
            statement = connection.prepareStatement(
                    "SELECT * FROM rss" +
                            "WHERE id IN (SELECT rss_id FROM users_rss WHERE user_id=(SELECT id FROM users WHERE email=?)) " +
                            "OFFSET ?");
            statement.setString(1, sessionEmail);
            statement.setInt(2, PAGE_SIZE * pages);
            result = statement.executeQuery();
            while (result.next()) {
                list.add(new Feed(
                        result.getLong("id"),
                        result.getString("title"),
                        result.getString("link")));
            }
            return list;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot " +
                    "refresh all feeds");
        }
    }

    public List<Feed> getPage(String sessionEmail, int startRow) {

        PreparedStatement statement;
        ResultSet result;
        try (Connection connection = DataSourceConfiguration.getConnection()) {
            List<Feed> list = new ArrayList<>();
            statement = connection.prepareStatement(
                    "SELECT * FROM rss " +
                            "WHERE id IN (SELECT rss_id FROM users_rss WHERE user_id=(SELECT id FROM users WHERE email=?))" +
                            "LIMIT ? OFFSET ?");
            statement.setString(1, sessionEmail);
            statement.setInt(2, PAGE_SIZE);
            statement.setInt(3, startRow);
            result = statement.executeQuery();
            while (result.next()) {
                list.add(new Feed(
                        result.getLong("id"),
                        result.getString("title"),
                        result.getString("link")));
            }
            return list;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot find all feeds");
        }
    }


    public Feed getSingle(String sessionEmail, Long feedId, String sortField, String sortDir, int startRow) {

        PreparedStatement statement;
        ResultSet result;
        List<Post> list = new ArrayList<>();
        Feed feed;

        try (Connection connection = DataSourceConfiguration.getConnection()) {

            // GET FEED INFO
            statement = connection.prepareStatement( //TODO if et really needed
                    "SELECT * FROM rss " +
                            "WHERE id=?");
            statement.setLong(1, feedId);
            result = statement.executeQuery();
            result.next();
            feed = new Feed(
                    result.getLong("id"),
                    result.getString("title"),
                    result.getString("link"));

            //GET POSTS
            statement = connection.prepareStatement(
                    "SELECT post.id,post.title,post.pubdate,users_posts.viewed FROM  post " +
                            "JOIN users_posts ON (post.id=users_posts.post_id) " +
                            "WHERE users_posts.user_id=(SELECT id FROM USERS WHERE email=?) and post.feed_id=? " +
                            "ORDER BY post." + sortField + " " + sortDir + "  " +
                            "LIMIT ? OFFSET ? ");
            statement.setString(1, sessionEmail);
            statement.setLong(2, feedId);
            statement.setInt(3, PAGE_SIZE);
            statement.setInt(4, startRow);
            result = statement.executeQuery();
            while (result.next()) {
                list.add(new Post(result.getLong("id"),
                        result.getString("title"),
                        DateConverter.toDate(result.getTimestamp("pubDate")),
                        result.getBoolean("viewed")));
            }

            feed.setPosts(list);
            return feed;

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot find rss feed");
        }
    }

    public void addFeed(String sessionEmail, Feed feed) throws SQLException {

        Connection connection = null;
        PreparedStatement preparedStatement;
        Statement statement;
        ResultSet result;
        String link = feed.getLink();
        String title = feed.getTitle();
        List<Post> posts = feed.getPosts();
        long feed_id;
        long user_id;
        List<Long> post_ids = new ArrayList<>();
        String query;

        try {

            connection = DataSourceConfiguration.getConnection();
            connection.setTransactionIsolation(TRANSACTION_SERIALIZABLE);
            connection.setAutoCommit(false);

            //EXTRACT USER ID
            preparedStatement = connection.prepareStatement(
                    "SELECT id FROM users " +
                    "WHERE email=?");
            preparedStatement.setString(1, sessionEmail);
            result = preparedStatement.executeQuery();
            result.next();
            user_id = result.getInt("id");


            // INSERT NEW FEED
            preparedStatement = connection.prepareStatement(
                    "INSERT INTO rss(link,title) " +
                            "SELECT ?,? " +
                            "WHERE NOT EXISTS (SELECT 1 FROM rss WHERE link=?) " +
                            "RETURNING id"
            );
            preparedStatement.setString(1, link);
            preparedStatement.setString(2, title);
            preparedStatement.setString(3, link);
            result = preparedStatement.executeQuery();
            result.next();
            feed_id = result.getInt("id");


            //INSERT POSTS

            statement = connection.createStatement();
            for (Post post : posts) {
                query = "INSERT INTO post(title,link,description,pubDate,guid) " +
                        "SELECT " + post.getGuid() + " , " + post.getTitle() + " , " + post.getTitle() + " , " + post.getDescription() + " , " + DateConverter.toSqlTimestamp(post.getPubDate())  +
                        " WHERE NOT EXISTS  (SELECT 1 FROM post WHERE guid= " + post.getGuid() + " )";
                statement.addBatch(query);
                preparedStatement.addBatch();
            }
            statement.executeBatch();


            //EXTRACT POSTs IDs
            for (Post post : posts) {
                preparedStatement = connection.prepareStatement(
                        "SELECT id FROM post " +
                                "WHERE guid=?"
                );
                preparedStatement.setString(1, post.getGuid());
                result = preparedStatement.executeQuery();
                result.next();
                post_ids.add(result.getLong("id"));
            }

            //ASSING POSTs TO FEED
            statement = connection.createStatement();
            for (Long post_id : post_ids) {
                query = "INSERT INTO rss_posts(feed_id,post_id) " +
                        "VALUES (" + feed_id + "," + post_id + ")";
                statement.addBatch(query);
            }
            statement.executeBatch();


            //ASSIGN FEED TO USER //TODO if this is really needed
            preparedStatement = connection.prepareStatement(
                    "INSERT INTO users_rss (user_id,rss_id) " +
                            "VALUES (?,?)");
            preparedStatement.setLong(1, user_id);
            preparedStatement.setLong(2, feed_id);
            preparedStatement.executeUpdate();


            //ASSIGN POSTS TO USER
            statement = connection.createStatement();
            for (Long post_id : post_ids) {
                query = "INSERT INTO users_posts(post_id,feed_id,user_id) " +
                        "VALUES (" + post_id + "," + feed_id + "," + user_id + ")";
                statement.addBatch(query);
            }
            statement.executeBatch();

            connection.commit();

        } catch (SQLException ex) {
            ex.printStackTrace();
           System.out.println("Next exception "+ ex.getNextException());
            throw new RuntimeException("Cannot assign feed to user. SQL exception");
        } finally {
            if (connection != null) {
                connection.close(); //TODO
            }
        }
    }

    public void updateFeed(String sessionEmail, Feed feed) throws SQLException { //TODO
        Connection connection = null;
        PreparedStatement preparedStatement;
        Statement statement;
        ResultSet result;
        String query;
        Long user_id;
        List<Post> posts = feed.getPosts();
        List<Long> post_ids = new ArrayList<>();
        List<Long> user_ids = new ArrayList<>();

        try {

            connection = DataSourceConfiguration.getConnection();
            connection.setTransactionIsolation(TRANSACTION_SERIALIZABLE);
            connection.setAutoCommit(false);

            //EXTRACT USER ID
            preparedStatement = connection.prepareStatement(
                    "SELECT id FROM users " +
                            "WHERE email=?");
            preparedStatement.setString(1, sessionEmail);
            result = preparedStatement.executeQuery();
            result.next();
            user_id = result.getLong("id");

            //ADD NEW POSTS
            statement = connection.createStatement();
            for (Post post : posts) {
                query = "INSERT INTO post(title,link,description,pubDate,guid) " +
                        "SELECT " + post.getGuid() + "," + post.getTitle() + "," + post.getLink() + "," + post.getDescription() + "," + DateConverter.toSqlTimestamp(post.getPubDate()) +
                        "WHERE NOT EXISTS  (SELECT 1 FROM post WHERE guid=" + post.getGuid() + ")";
                statement.addBatch(query);
            }
            statement.executeBatch();

            //EXTRACT POSTs IDs
            for (Post post : posts) {
                preparedStatement = connection.prepareStatement(
                        "SELECT id FROM post " +
                                "WHERE guid=?"
                );
                preparedStatement.setString(1, post.getGuid());
                result = preparedStatement.executeQuery();
                result.next();
                post_ids.add(result.getLong("id"));
            }

            //ASSING POSTs TO FEED
            statement = connection.createStatement();
            for (Long post_id : post_ids) {
                query = "INSERT INTO rss_posts(feed_id,post_id) " +
                        "SELECT " + feed.getId() + "," + post_id +
                        " WHERE NOT EXISTS (SELECT 1 FROM rss_posts WHERE post_id=" + post_id + " AND feed_id=" + feed.getId() + ")";
                statement.addBatch(query);
            }
            statement.executeBatch();

            //ASSIGN NEW POSTS TO USER
            statement = connection.createStatement();
            for (Long post_id : post_ids) {
                query = "INSERT INTO users_posts(post_id,feed_id,user_id) " +
                        "SELECT " + "post_id" + "," + feed.getId() + "," + user_id +
                        " WHERE NOT EXISTS (SELECT 1 FROM users_posts WHERE post_id=" + post_id + " AND user_id=" + user_id + ")";
                statement.addBatch(query);
            }
            statement.executeBatch();

            connection.commit();

        } catch (SQLException ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot assign feed to user. SQL exception");
        } finally {
            if (connection != null) {
                connection.close(); //TODO
            }
        }
    }


    public Feed searchByPattern(String sessionEmail, Long id, String pattern, String sortField, String sortDir, int startRow) {
        PreparedStatement statement;
        ResultSet result;
        long user_id;
        Feed feed = new Feed();
        List<Post> list = new ArrayList<>();


        try (Connection connection = DataSourceConfiguration.getConnection();) {
            connection.setTransactionIsolation(TRANSACTION_SERIALIZABLE);
            connection.setAutoCommit(false);

            //EXTRACT USER ID

            statement = connection.prepareStatement("SELECT id FROM users WHERE email=?");
            statement.setString(1, sessionEmail);
            result = statement.executeQuery();
            result.next();
            user_id = result.getInt("id");

            //SEARCH FOR POSTS
            statement = connection.prepareStatement("" +
                    "SELECT post.id,post.description,post.title,post.link,post.pubdate,post.guid,post.feed_id,users_posts.viewed FROM" +
                    " post JOIN users_posts ON (post.id=users_posts.post_id) WHERE" +
                    " users_posts.user_id=? and post.feed_id=? and post.title LIKE ? ORDER BY post." + sortField + " " + sortDir + "  LIMIT ? OFFSET ?");
            statement.setLong(1, user_id);
            statement.setLong(2, id);
            statement.setString(3, "%" + pattern + "%");
            statement.setInt(4, PAGE_SIZE);
            statement.setInt(5, startRow);
            result = statement.executeQuery();
            while (result.next()) {
                list.add(new Post(result.getLong("id"),
                        result.getString("title"),
                        DateConverter.toDate(result.getTimestamp("pubDate")),
                        result.getBoolean("viewed")));
            }

            connection.commit();
            feed.setPosts(list);
            return feed;
        } catch (SQLException ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot find posts by pattern feed from user. SQL exception");
        }

    }

    public void removeFeed(String sessionEmail, Long feed_id) throws SQLException {

        Connection connection = null;
        PreparedStatement statement;
        ResultSet result;
        long user_id;

        try {

            connection = DataSourceConfiguration.getConnection();
            connection.setTransactionIsolation(TRANSACTION_SERIALIZABLE);
            connection.setAutoCommit(false);

            //EXTRACT USER ID
            statement = connection.prepareStatement("SELECT id FROM users WHERE email=?");
            statement.setString(1, sessionEmail);
            result = statement.executeQuery();
            result.next();
            user_id = result.getInt("id");

            //UNASSIGN FEED FROM USER
            statement = connection.prepareStatement("DELETE FROM users_rss where user_id=? and rss_id=?");
            statement.setLong(1, user_id);
            statement.setLong(2, feed_id);
            statement.executeUpdate();

            //UNASSIGN POSTS FROM USER
            statement = connection.prepareStatement("DELETE FROM users_posts where user_id=? and feed_id=?");
            statement.setLong(1, user_id);
            statement.setLong(2, feed_id);
            statement.executeUpdate();


            connection.commit();

        } catch (SQLException ex) {
            ex.printStackTrace();
            connection.rollback();
            throw new RuntimeException("Cannot unassign feed from user. SQL exception");
        } finally {
            if (connection != null) {
                connection.close(); //TODO
            }
        }

    }


}
