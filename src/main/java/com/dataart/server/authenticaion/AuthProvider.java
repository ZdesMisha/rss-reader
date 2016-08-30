package com.dataart.server.authenticaion;

import com.dataart.server.authenticaion.token.UserToken;
import com.dataart.server.service.UserService;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by misha on 29.08.16.
 */
@Stateless
public class AuthProvider { //TODO

    @Inject
    private UserService userService;


    private Map<String,UserToken> tokens = new ConcurrentHashMap<>();

    public String login(Credentials credentials) throws Exception{
        if (userService.isExists(credentials.getEmail(),credentials.getPassword())){
            String token = prepareToken(credentials);
            tokens.put(token,new Date());
            return token;
        } else {
            throw new RuntimeException("Unable to login");
        }
    }

    public boolean isAuthenticated(String token) {
        return tokens.containsValue()
    }

    public void logout(String token) throws Exception{
        tokens.remove(token);
    }

    private boolean isTokenExpired(UserToken token){
        return false;
    }

    private  UserToken prepareToken(Credentials credentials){
        return new UserToken(credentials.toString().trim().toUpperCase(),new Date());
    }


}
