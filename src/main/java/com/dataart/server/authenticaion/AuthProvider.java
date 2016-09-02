package com.dataart.server.authenticaion;

import com.dataart.server.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.ejb.Singleton;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by misha on 29.08.16.
 */
@Singleton
public class AuthProvider { //TODO

    @Inject
    private UserService userService;


    private final Map<String, String> tokens = new ConcurrentHashMap<>();
    private static final String SIGNATURE_KEY = "my signature key"; //TODO


    public void validateToken(String token) throws Exception {
        if (tokens.containsKey(token)) {
            Jwts.parser().setSigningKey(SIGNATURE_KEY).parseClaimsJws(token);
        } else {
            throw new Exception("token is invalid");
        }
    }

    public void removeToken(String token) throws Exception{
        tokens.remove(token);
    }

    public String prepareToken(UserPrincipal userPrincipal) throws Exception{
        String email = userPrincipal.getName();
        Map<String, Object> header = new HashMap<String, Object>() {{
            put("alg", "hs256");
            put("typ", "JWT");
        }};
        String token = Jwts.builder()
                .setHeader(header)
                .setSubject(email)
                .signWith(SignatureAlgorithm.HS256, SIGNATURE_KEY)
                .compact();
        tokens.put(token, email);
        return token;
    }

    public void attemptAuthentication(UserPrincipal userPrincipal) throws Exception {
        String email = userPrincipal.getName();
        String password = userPrincipal.getPassword();
        if (!userService.isExists(email, password)) {
            throw new Exception("No such user or wrong password");
        }
    }

    public String getEmail() {
        return tokens.get("token");
    }


}
