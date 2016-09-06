package com.dataart.server.filter;

import com.dataart.server.authenticaion.AuthProvider;

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
@WebFilter("/AuthenticationFilter")
public class AuthenticationFilter implements Filter {

    @Inject
    private AuthProvider authProvider;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        System.out.println(" Authentication Filter start");

        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
        String token = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);

        try {

            authProvider.validateToken(token);

            filterChain.doFilter(servletRequest, servletResponse);

        } catch (Exception e) {
            e.printStackTrace();
            httpResponse.setStatus(401);
            httpResponse.getWriter().print("{\"error\":\"Bad authorization token\"}");
        }
    }

    @Override
    public void destroy() {
    }
}



