package com.dataart.server.authenticaion.token;

import java.util.Date;

/**
 * Created by misha on 30.08.16.
 */
public final class UserToken {


    private String token;
    private Date expirationDate;

    public UserToken(String token, Date expirationDate) {
        this.token = token;
        this.expirationDate = expirationDate;
    }

    public String getToken() {
        return token;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }


}
