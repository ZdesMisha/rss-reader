package com.dataart.server.filter;

import com.dataart.server.authenticaion.AuthProvider;
import com.dataart.server.domain.UserPrincipal;
import org.codehaus.jackson.map.ObjectMapper;

import javax.inject.Inject;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

/**
 * Created by misha on 29.08.16.
 */
@WebFilter("/LoggingFilter")
public class LoggingFilter implements Filter {

    @Inject
    private AuthProvider authProvider;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println(" Login Filter start");
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

        try {
            StringBuilder sb = new StringBuilder();
            String line;

            BufferedReader reader = httpRequest.getReader();
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            ObjectMapper mapper = new ObjectMapper();
            UserPrincipal principal = mapper.readValue(sb.toString(), UserPrincipal.class);

            authProvider.attemptAuthentication(principal);
            String token = authProvider.prepareToken(principal);

            httpResponse.setStatus(200);
            httpResponse.getWriter().print("{\"token\":\"" + token + "\"}");

        } catch (Exception e) {
            e.printStackTrace();
            httpResponse.setStatus(401);
            httpResponse.getWriter().print("{\"error\":\"Bad credentials\"}");
        }
    }

    @Override
    public void destroy() {
    }
}
