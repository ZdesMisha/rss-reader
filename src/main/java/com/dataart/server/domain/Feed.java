package com.dataart.server.domain;


import java.util.List;

/**
 * Created by misha on 05.08.16.
 */
public class Feed {
    private Long id;
    private String title;
    private String link;
    private List<Post> posts;

    public Feed() {
    }

    public Feed(String link) {
        this.link = link;
    }

    public Feed(Long id, String title, String link) {
        this.id=id;
        this.title=title;
        this.link = link;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    @Override
    public String toString() {
        return "Feed{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", link='" + link + '\'' +
                ", posts=" + posts +
                '}';
    }
}
