package com.dataart.server.authentication;

import com.dataart.server.domain.service.UserPrincipal;
import com.dataart.server.exception.ServiceException;
import com.dataart.server.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.inject.Inject;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by misha on 29.08.16.
 */
@Singleton
public class AuthProvider {

    @Inject
    private UserService userService;

    private final Map<String, String> tokens = new ConcurrentHashMap<>();
    private String SIGNATURE_KEY;
    private String CRYPTO_ALG;
    private String TOKEN_TYPE;

    @PostConstruct
    private void uploadSecretKey() {
        Properties props = new Properties();
        try (InputStream is = getClass().getClassLoader().getResourceAsStream("application.properties")) {
            props.load(is);
            SIGNATURE_KEY = props.getProperty("SIGNATURE_KEY");
            CRYPTO_ALG = props.getProperty("CRYPTO_ALG");
            TOKEN_TYPE = props.getProperty("TOKEN_TYPE");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public void validateToken(String token) throws Exception {
        Jwts.parser().setSigningKey(SIGNATURE_KEY).parseClaimsJws(token);
        if (!tokens.containsKey(token)){
            throw new ServiceException("NOT VALID TOKEN");
        }
    }

    public void removeToken(String token) throws Exception {
        tokens.remove(token);
    }

    public String prepareToken(String email) throws Exception {
        Map<String, Object> header = new HashMap<String, Object>() {{
            put("alg", CRYPTO_ALG);
            put("typ", TOKEN_TYPE);
        }};
        String newToken = Jwts.builder()
                .setHeader(header)
                .setSubject(email)
                .signWith(SignatureAlgorithm.HS256, SIGNATURE_KEY)
                .compact();
        tokens.put(newToken,email);
        return newToken;
    }

    public void attemptAuthentication(UserPrincipal userPrincipal) throws Exception {
        if (!userService.isValid(userPrincipal.getName(), userPrincipal.getPassword())) {
            throw new ServiceException("NO SUCH USER OR PASSWORD DOES NOT MATCH");
        }
    }

    public String getEmailByToken(String token) {
        return tokens.get(token);
    }

}
