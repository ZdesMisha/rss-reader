package com.dataart.server.domain.service;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by misha on 15.08.16.
 */
public class RssLink {

    @NotNull
    @Size(max = 200)
    private String link;

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

}
