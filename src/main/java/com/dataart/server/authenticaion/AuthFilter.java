package com.dataart.server.authenticaion;

import com.dataart.server.persistence.User;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerRequestFilter;

import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

/**
 * Created by misha on 26.08.16.
 */

public class AuthFilter implements ContainerRequestFilter {

    @Override
    public ContainerRequest filter(ContainerRequest containerRequest) throws WebApplicationException {

        System.out.println("AUTH FILTER");

        String authorizationHeader = containerRequest.getHeaderValue(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new NotAuthorizedException("Authorization header must be provided");
        }

        String token = authorizationHeader.substring("Bearer".length()).trim();

        try {
            validateToken(token);
        } catch (Exception e) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }

        return containerRequest;
    }

    private void validateToken(String token) {
        System.out.println("TOKEN " + token + " is VALID!!!!!!");
    }
}



