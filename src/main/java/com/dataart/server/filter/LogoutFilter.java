package com.dataart.server.filter;

import com.dataart.server.authentication.AuthProvider;

import javax.inject.Inject;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;
import java.io.IOException;

import static com.dataart.server.utils.JsonBuilder.ERROR_TEMPLATE;

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
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

        String token = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);

        try {

            authProvider.removeToken(token);
            httpResponse.setStatus(200);
            httpResponse.getWriter().print("{}");

        } catch (Exception e) {
            httpResponse.setStatus(401);
            httpResponse.getWriter().print(String.format(ERROR_TEMPLATE, "LOGOUT ERROR"));
        }
    }

    @Override
    public void destroy() {
    }
}
