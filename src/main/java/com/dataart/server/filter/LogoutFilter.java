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
 * Created by misha on 29.08.16.
 */
@WebFilter("/LogoutFilter")
public class LogoutFilter implements Filter {

    @Inject
    private AuthProvider authProvider;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("Logout Filter start");
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

        String token = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);

        try {

            authProvider.removeToken(token);
            httpResponse.setStatus(200);
            httpResponse.getWriter().print("{}");

        } catch (Exception e) {
            e.printStackTrace();
            httpResponse.sendError(401);
        }
    }

    @Override
    public void destroy() {
    }
}
