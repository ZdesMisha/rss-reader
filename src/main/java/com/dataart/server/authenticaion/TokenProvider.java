package com.dataart.server.authenticaion;

import com.dataart.server.authenticaion.token.UserToken;

import java.util.Date;

/**
 * Created by misha on 30.08.16.
 */
public class TokenProvider {

    public UserToken generateToken(String email){ //TODO
        return new UserToken(email,new Date());
    }

}
