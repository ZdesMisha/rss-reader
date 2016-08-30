package com.dataart.server.authenticaion.filter;

import com.dataart.server.authenticaion.AuthProvider;
import com.dataart.server.authenticaion.Credentials;
import com.sun.jersey.api.core.InjectParam;
import org.codehaus.jackson.map.ObjectMapper;

import javax.inject.Inject;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;
import java.io.BufferedReader;
import java.io.IOException;

/**
 * Created by misha on 29.08.16.
 */
@WebFilter("/LoginFilter")
public class LoginFilter implements Filter {

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
            Credentials credentials = mapper.readValue(sb.toString(), Credentials.class);

            String token = authProvider.login(credentials);
            httpResponse.setHeader(HttpHeaders.AUTHORIZATION, token);
            httpResponse.setStatus(200);
            httpResponse.getWriter().print("{\n" +
                    "\"messages\":\"Login success\",\n" +
                    "}");
        } catch (Exception e) {
            e.printStackTrace();
            httpResponse.sendError(401);

        }
    }

    @Override
    public void destroy() {
    }
}
