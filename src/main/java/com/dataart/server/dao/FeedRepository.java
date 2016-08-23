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
public class FeedRepository {

    public Post getPost(Long id) {
        try (Connection connection = DataSourceConfiguration.getConnection()) {

            PreparedStatement statement = connection.prepareStatement("SELECT * FROM post where id=?");
            statement.setLong(1, id);
            ResultSet result = statement.executeQuery();
            result.next();
            Post post = new Post();
            post.setId(result.getLong("id"));
            post.setTitle(result.getString("title"));
            post.setLink(result.getString("link"));
            post.setDescription(result.getString("description"));
            post.setGuid(result.getString("guid"));
            post.setPubDate(DateConverter.toDate(result.getTimestamp("pubDate")));

            return post;

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot find item feeds");

        }
    }

    public List<Feed> findAll(String sessionEmail, int startRow) {

        PreparedStatement statement;
        ResultSet result;
        try (Connection connection = DataSourceConfiguration.getConnection()) {
            List<Feed> list = new ArrayList<>();
            statement = connection.prepareStatement("SELECT * FROM rss WHERE id IN" +
                    " (SELECT rss_id FROM users_rss WHERE user_id=" +
                    "(SELECT id FROM users WHERE email=?)) LIMIT ? OFFSET ?");
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

    public List<Feed> getFeedPages(String sessionEmail, int pages) {
        PreparedStatement statement;
        ResultSet result;
        try (Connection connection = DataSourceConfiguration.getConnection()) {
            List<Feed> list = new ArrayList<>();
            statement = connection.prepareStatement("SELECT * FROM rss WHERE id IN" +
                    " (SELECT rss_id FROM users_rss WHERE user_id=" +
                    "(SELECT id FROM users WHERE email=?)) OFFSET ?");
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
            throw new RuntimeException("Cannot refresh all feeds");
        }
    }

    public List<Feed> findByEmail(String sessionEmail) {
        try (Connection connection = DataSourceConfiguration.getConnection()) {
            List<Feed> list = new ArrayList<>();
            PreparedStatement statement = connection.prepareStatement(
                    "SELECT * FROM rss WHERE id IN " +
                            "(SELECT rss_id FROM users_rss WHERE user_id = " +
                            "(SELECT id FROM users WHERE email=?))"
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

    public Feed findFeed(String sessionEmail, Long id, String sortField, String sortDir, int startRow) {

        PreparedStatement statement;
        ResultSet result;
        List<Post> list = new ArrayList<>();
        Feed feed;
        long user_id;

        try (Connection connection = DataSourceConfiguration.getConnection()) {

            //EXTRACT USER ID
            statement = connection.prepareStatement("SELECT id FROM users WHERE email=?");
            statement.setString(1, sessionEmail);
            result = statement.executeQuery();
            result.next();
            user_id = result.getInt("id");

            // GET FEED INFO
            statement = connection.prepareStatement("SELECT * FROM rss WHERE id=?");
            statement.setLong(1, id);
            result = statement.executeQuery();
            result.next();
            feed = new Feed(
                    result.getLong("id"),
                    result.getString("title"),
                    result.getString("link"));

            //GET POSTS
            statement = connection.prepareStatement("" +
                    "SELECT post.id,post.description,post.title,post.link,post.pubdate,post.feed_id,post.guid,users_posts.viewed FROM" +
                    " post JOIN users_posts ON (post.id=users_posts.post_id) WHERE" +
                    " users_posts.user_id=? and post.feed_id=? ORDER BY post." + sortField + " " + sortDir + "  LIMIT ? OFFSET ? ");
            statement.setLong(1, user_id);
            statement.setLong(2, id);
            statement.setInt(3, PAGE_SIZE);
            statement.setInt(4, startRow);
            result = statement.executeQuery();
            while (result.next()) {
                list.add(new Post(result.getLong("id"),
                        result.getString("title"),
                        result.getString("description"),
                        result.getString("link"),
                        DateConverter.toDate(result.getTimestamp("pubDate")),
                        result.getString("guid"),
                        result.getBoolean("viewed")));
            }

            feed.setPosts(list);
            return feed;

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot find rss feed");
        }
    }

    public void updateFeed(Feed feed) throws SQLException {
        Connection connection = null;
        PreparedStatement statement;
        ResultSet result;
        List<Post> posts = feed.getPosts();
        List<Long> post_ids = new ArrayList<>();
        List<Long> user_ids = new ArrayList<>();

        try {

            connection = DataSourceConfiguration.getConnection();
            connection.setTransactionIsolation(TRANSACTION_SERIALIZABLE);
            connection.setAutoCommit(false);

            //EXTRACT USER IDs
            statement = connection.prepareStatement("SELECT user_id FROM users_rss WHERE rss_id=?");
            statement.setLong(1, feed.getId());
            result = statement.executeQuery();
            while (result.next()) {
                user_ids.add(result.getLong("user_id"));
            }

            //ADD NEW POSTS
            for (Post post : posts) {
                statement = connection.prepareStatement(
                        "INSERT INTO post(guid,feed_id,title,link,description,pubDate) SELECT ?,?,?,?,?,? WHERE NOT EXISTS " +
                                "(SELECT 1 FROM post WHERE guid=?)"
                );
                statement.setString(1, post.getGuid());
                statement.setLong(2, feed.getId());
                statement.setString(3, post.getTitle());
                statement.setString(4, post.getLink());
                statement.setString(5, post.getDescription());
                statement.setTimestamp(6, DateConverter.toSqlTimestamp(post.getPubDate()));
                statement.setString(7, post.getGuid());
                statement.executeUpdate();
            }

            //EXTRACT NEW POSTS ID
            statement = connection.prepareStatement("SELECT id FROM post WHERE feed_id=?");
            statement.setLong(1, feed.getId());
            result = statement.executeQuery();
            while (result.next()) {
                post_ids.add(result.getLong("id"));
            }

            //ASSIGN NEW POSTS TO USER
            for (Long user_id : user_ids) {
                for (Long post_id : post_ids) {
                    statement = connection.prepareStatement("INSERT INTO users_posts(post_id,feed_id,user_id) SELECT ?,?,? WHERE NOT EXISTS " +
                            "(SELECT 1 FROM users_posts WHERE post_id=? and user_id=?)");
                    statement.setLong(1, post_id);
                    statement.setLong(2, feed.getId());
                    statement.setLong(3, user_id);
                    statement.setLong(4, post_id);
                    statement.setLong(5, user_id);
                    statement.executeUpdate();
                }
            }

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

    public void setViewed(String sessionEmail, Long post_id) throws SQLException {

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

            //SET FEED
            statement = connection.prepareStatement("UPDATE users_posts SET viewed = TRUE WHERE user_id=? AND post_id=?");
            statement.setLong(1, user_id);
            statement.setLong(2, post_id);
            statement.executeUpdate();

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

    public void addFeed(String sessionEmail, Feed feed) throws SQLException {

        Connection connection = null;
        PreparedStatement statement;
        ResultSet result;
        String link = feed.getLink();
        String title = feed.getTitle();
        List<Post> posts = feed.getPosts();
        long feed_id;
        long user_id;
        List<Long> post_ids = new ArrayList<>();

        try {

            connection = DataSourceConfiguration.getConnection();
            connection.setTransactionIsolation(TRANSACTION_SERIALIZABLE);
            connection.setAutoCommit(false);

            // INSERT NEW FEED
            statement = connection.prepareStatement(
                    "INSERT INTO rss(link,title) SELECT ?,? WHERE NOT EXISTS " +
                            "(SELECT 1 FROM rss WHERE link=?)"
            );
            statement.setString(1, link);
            statement.setString(2, title);
            statement.setString(3, link);
            statement.executeUpdate();

            //EXTRACT FEED ID
            statement = connection.prepareStatement("SELECT id FROM rss WHERE link=?");
            statement.setString(1, link);
            result = statement.executeQuery();
            result.next();
            feed_id = result.getInt("id");

            //INSERT POSTS
            for (Post post : posts) {
                statement = connection.prepareStatement(
                        "INSERT INTO post(guid,feed_id,title,link,description,pubDate) SELECT ?,?,?,?,?,? WHERE NOT EXISTS " +
                                "(SELECT 1 FROM post WHERE guid=?)"
                );
                statement.setString(1, post.getGuid());
                statement.setLong(2, feed_id);
                statement.setString(3, post.getTitle());
                statement.setString(4, post.getLink());
                statement.setString(5, post.getDescription());
                statement.setTimestamp(6, DateConverter.toSqlTimestamp(post.getPubDate()));
                statement.setString(7, post.getGuid());
                statement.executeUpdate();
            }

            //EXTRACT POSTs IDs
            statement = connection.prepareStatement("SELECT id FROM post WHERE feed_id=?");
            statement.setLong(1, feed_id);
            result = statement.executeQuery();
            while (result.next()) {
                post_ids.add(result.getLong("id"));
            }

            //EXTRACT USER ID
            statement = connection.prepareStatement("SELECT id FROM users WHERE email=?");
            statement.setString(1, sessionEmail);
            result = statement.executeQuery();
            result.next();
            user_id = result.getInt("id");

            //ASSIGN FEED TO USER
            statement = connection.prepareStatement("INSERT INTO users_rss (user_id,rss_id) VALUES (?,?)");
            statement.setString(1, sessionEmail);
            statement.setLong(1, user_id);
            statement.setLong(2, feed_id);
            statement.executeUpdate();

            //ASSIGN POSTS TO USER
            for (Long post_id : post_ids) {
                statement = connection.prepareStatement("INSERT INTO users_posts(post_id,feed_id,user_id) VALUES (?,?,?)");
                statement.setLong(1, post_id);
                statement.setLong(2, feed_id);
                statement.setLong(3, user_id);
                statement.executeUpdate();
            }

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
                        result.getString("description"),
                        result.getString("link"),
                        DateConverter.toDate(result.getTimestamp("pubDate")),
                        result.getString("guid"),
                        result.getBoolean("viewed")));
            }

            connection.commit();
            feed.setPosts(list);
            return feed;
        } catch (SQLException ex) {
            ex.printStackTrace();
            throw new RuntimeException("Cannot unassign feed from user. SQL exception");
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
