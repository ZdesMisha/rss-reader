package com.dataart.server.json.entity;


/**
 * Created by misha on 15.08.16.
 */
public class RssLink {

    private String link;

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    @Override
    public String
    toString() {
        return "RssLink{" +
                "link='" + link + '\'' +
                '}';
    }
}
