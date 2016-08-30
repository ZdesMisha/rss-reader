package com.dataart.server.authenticaion.filter;

import com.dataart.server.authenticaion.AuthProvider;
import com.sun.jersey.api.core.InjectParam;

import javax.inject.Inject;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;
import java.io.IOException;

/**
 * Created by misha on 26.08.16.
 */
@WebFilter("/AuthFilter")
public class AuthFilter implements Filter {

    @Inject
    private AuthProvider authProvider;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println(" Auth Filter start");
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

        String auth = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);

        if (auth == null) {
            throw new RuntimeException("Authorization header must be provided");
        }

        String token = auth.trim();

        try {

            validateToken(token);

            filterChain.doFilter(servletRequest, servletResponse);
        } catch (Exception e) {
            e.printStackTrace();
            httpResponse.sendError(401);
        }
    }

    @Override
    public void destroy() {
    }

    private void validateToken(String token) throws Exception {
        if (!authProvider.isAuthenticated(token)) {
            throw new RuntimeException("token is invalid");
        }
    }
}



