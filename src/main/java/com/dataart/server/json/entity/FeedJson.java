package com.dataart.server.json.entity;


/**
 * Created by misha on 15.08.16.
 */
public class FeedJson {

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    private String link;

    @Override
    public String
    toString() {
        return "FeedJson{" +
                "link='" + link + '\'' +
                '}';
    }
}
