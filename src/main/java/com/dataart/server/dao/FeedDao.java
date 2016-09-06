package com.dataart.server.dao;

import com.dataart.server.domain.Feed;
import com.dataart.server.domain.Post;
import com.dataart.server.utils.DateConverter;
import com.dataart.server.utils.IOUtils;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import static com.dataart.server.utils.PaginationUtils.PAGE_SIZE;
/**
 * Created by misha on 09.08.16.
 */
@Stateless
public class FeedDao {

    @Inject
    private DataSource dataSource;

    public List<Feed> getAll(String sessionEmail) {
        try (Connection connection = dataSource.getConnection()) {
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
        try (Connection connection = dataSource.getConnection()) {
            List<Feed> list = new ArrayList<>();
            statement = connection.prepareStatement(
                    "SELECT * FROM rss " +
                            "WHERE id IN (SELECT rss_id FROM users_rss WHERE user_id=(SELECT id FROM users WHERE email=?)) " +
                            "LIMIT ?");
            statement.setString(1, sessionEmail);
            statement.setInt(2, PAGE_SIZE * (pages + 1));
            result = statement.executeQuery();
            while (result.next()) {
                System.out.println("Feed!!!");
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
        try (Connection connection = dataSource.getConnection()) {
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
        } catch (SQLException ex) {
            throw new RuntimeException("Unable to fetch feed page." +
                    "Error Message: " + ex.getMessage());
        }
    }


    public Feed getSingle(String sessionEmail, Long feedId, String sortField, String sortDir, int startRow) throws SQLException {

        PreparedStatement statement;
        ResultSet result;
        List<Post> list = new ArrayList<>();
        Feed feed;

        try (Connection connection = dataSource.getConnection()) {

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
                            "WHERE users_posts.user_id=(SELECT id FROM USERS WHERE email=?) and users_posts.feed_id=? " +
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

            connection = dataSource.getConnection();
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
            if (result.next()) {
                feed_id = result.getInt("id");
            } else {
                preparedStatement = connection.prepareStatement("SELECT id from rss where link=?");
                preparedStatement.setString(1, link);
                result = preparedStatement.executeQuery();
                result.next();
                feed_id = result.getInt("id");
            }


            //INSERT POSTS

            query = "INSERT INTO post(title,link,description,pubDate,guid) " +
                    "SELECT ?,?,?,?,? WHERE NOT EXISTS  (SELECT 1 FROM post WHERE guid=? )";
            preparedStatement = connection.prepareStatement(query);
            for (Post post : posts) {
                preparedStatement.setString(1, post.getTitle());
                preparedStatement.setString(2, post.getLink());
                preparedStatement.setString(3, post.getDescription());
                preparedStatement.setTimestamp(4, DateConverter.toSqlTimestamp(post.getPubDate()));
                preparedStatement.setString(5, post.getGuid());
                preparedStatement.setString(6, post.getGuid());
                preparedStatement.addBatch();
            }
            preparedStatement.executeBatch();


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
            query = "INSERT INTO rss_posts(feed_id,post_id) " +
                    "SELECT ?,? WHERE NOT EXISTS (SELECT 1 FROM rss_posts WHERE feed_id=? AND post_id=?)";
            preparedStatement = connection.prepareStatement(query);
            for (Long post_id : post_ids) {
                preparedStatement.setLong(1, feed_id);
                preparedStatement.setLong(2, post_id);
                preparedStatement.setLong(3, feed_id);
                preparedStatement.setLong(4, post_id);
                preparedStatement.addBatch();
            }
            preparedStatement.executeBatch();


            //ASSIGN FEED TO USER //TODO if this is really needed
            preparedStatement = connection.prepareStatement(
                    "INSERT INTO users_rss (user_id,rss_id) " +
                            "VALUES (?,?)");
            preparedStatement.setLong(1, user_id);
            preparedStatement.setLong(2, feed_id);
            preparedStatement.executeUpdate();


            //ASSIGN POSTS TO USER
            query = "INSERT INTO users_posts(post_id,feed_id,user_id) " +
                    "VALUES (?,?,?)";
            preparedStatement = connection.prepareStatement(query);
            for (Long post_id : post_ids) {
                preparedStatement.setLong(1, post_id);
                preparedStatement.setLong(2, feed_id);
                preparedStatement.setLong(3, user_id);
                preparedStatement.addBatch();
            }
            preparedStatement.executeBatch();

            connection.commit();

        } catch (SQLException ex) {
            ex.printStackTrace();
            System.out.println("Next exception " + ex.getNextException());
            throw new RuntimeException("Cannot assign feed to user. SQL exception");
        } finally {
            IOUtils.closeQuietly(connection);
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

            connection = dataSource.getConnection();
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
            query = "INSERT INTO post(title,link,description,pubDate,guid) " +
                    "SELECT ?,?,?,?,? WHERE NOT EXISTS  (SELECT 1 FROM post WHERE guid=? )";
            preparedStatement = connection.prepareStatement(query);
            for (Post post : posts) {
                preparedStatement.setString(1, post.getTitle());
                preparedStatement.setString(2, post.getLink());
                preparedStatement.setString(3, post.getDescription());
                preparedStatement.setTimestamp(4, DateConverter.toSqlTimestamp(post.getPubDate()));
                preparedStatement.setString(5, post.getGuid());
                preparedStatement.setString(6, post.getGuid());
                preparedStatement.addBatch();
            }
            preparedStatement.executeBatch();

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
            query = "INSERT INTO rss_posts(feed_id,post_id) " +
                    "SELECT ?,? " +
                    "WHERE NOT EXISTS (SELECT 1 FROM rss_posts WHERE post_id=? AND feed_id=?)";
            preparedStatement = connection.prepareStatement(query);
            for (Long post_id : post_ids) {
                preparedStatement.setLong(1, feed.getId());
                preparedStatement.setLong(2, post_id);
                preparedStatement.setLong(3, post_id);
                preparedStatement.setLong(4, feed.getId());
                preparedStatement.addBatch();
            }
            preparedStatement.executeBatch();

            //ASSIGN NEW POSTS TO USER
            query = "INSERT INTO users_posts(post_id,feed_id,user_id) " +
                    "SELECT ?,?,?" +
                    " WHERE NOT EXISTS (SELECT 1 FROM users_posts WHERE post_id=? AND user_id=?)";
            preparedStatement = connection.prepareStatement(query);
            for (Long post_id : post_ids) {
                preparedStatement.setLong(1, post_id);
                preparedStatement.setLong(2, feed.getId());
                preparedStatement.setLong(3, user_id);
                preparedStatement.setLong(4, post_id);
                preparedStatement.setLong(5, user_id);
                preparedStatement.addBatch();
            }
            preparedStatement.executeBatch();

            connection.commit();

        } catch (SQLException ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot assign feed to user. SQL exception");
        } finally {
            IOUtils.closeQuietly(connection);
        }
    }


    public Feed searchByPattern(String sessionEmail, Long feedId, String pattern, String sortField, String sortDir, int startRow) {
        PreparedStatement statement;
        ResultSet result;
        long user_id;
        Feed feed = new Feed();
        List<Post> list = new ArrayList<>();


        try (Connection connection = dataSource.getConnection()) {
            connection.setAutoCommit(false);

            //EXTRACT USER ID

            statement = connection.prepareStatement("SELECT id FROM users WHERE email=?");
            statement.setString(1, sessionEmail);
            result = statement.executeQuery();
            result.next();
            user_id = result.getInt("id");

            //SEARCH FOR POSTS
            statement = connection.prepareStatement(
                    "SELECT post.id,post.description,post.title,post.link,post.pubdate,post.guid,users_posts.viewed FROM" +
                            " post JOIN users_posts ON (post.id=users_posts.post_id) WHERE" +
                            " users_posts.user_id=? AND users_posts.feed_id=? AND post.title LIKE ? ORDER BY post." + sortField + " " + sortDir + "  LIMIT ? OFFSET ?");
            statement.setLong(1, user_id);
            statement.setLong(2, feedId);
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

            connection = dataSource.getConnection();
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
            if (connection != null) {
                connection.rollback();
            }
            throw new RuntimeException("Cannot unassign feed from user. SQL exception");
        } finally {
            IOUtils.closeQuietly(connection);
        }

    }


}
