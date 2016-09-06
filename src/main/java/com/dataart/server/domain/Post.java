package com.dataart.server.domain;


import com.dataart.server.utils.DateTimeSerializer;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import java.util.Date;

/**
 * Created by misha on 05.08.16.
 */
public class Post {


    private Long id;
    private String title;
    private String description;
    private String link;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date pubDate;
    private String guid;
    private boolean isViewed;

    public Post(){
    }


    public Post(Long id, String title, Date pubDate,boolean isViewed) {
        this.id = id;
        this.title = title;
        this.pubDate = pubDate;
        this.isViewed = isViewed;
    }

    public Post(Long id, String title, String description, String link, Date pubDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.link = link;
        this.pubDate = pubDate;
    }


    public boolean isViewed() {
        return isViewed;
    }

    public void setViewed(boolean viewed) {
        isViewed = viewed;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Date getPubDate() {
        return pubDate;
    }

    public void setPubDate(Date pubDate) {
        this.pubDate = pubDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id" + id +'\'' +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", link='" + link + '\'' +
                ", pubDate='" + pubDate + '\'' +
                ", guid='" + guid + '\'' +
                '}';
    }
}
