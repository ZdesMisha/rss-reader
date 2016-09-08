package com.dataart.server.filter;

import com.dataart.server.authentication.AuthProvider;
import com.dataart.server.domain.service.UserPrincipal;
import org.codehaus.jackson.map.ObjectMapper;

import javax.inject.Inject;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

import static com.dataart.server.utils.JsonBuilder.ERROR_TEMPLATE;
import static com.dataart.server.utils.JsonBuilder.TOKEN_TEMPLATE;

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
            String token = authProvider.prepareToken(principal.getEmail());

            httpResponse.setStatus(200);
            httpResponse.getWriter().print(String.format(TOKEN_TEMPLATE, token));

        } catch (Exception e) {
            httpResponse.setStatus(401);
            httpResponse.getWriter().print(String.format(ERROR_TEMPLATE, "BAD CREDENTIALS"));
        }
    }

    @Override
    public void destroy() {
    }
}
