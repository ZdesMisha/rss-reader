package com.dataart.server.resource;

/**
 * Created by misha on 09.08.16.
 */

import com.dataart.server.json.JsonUtils;
import com.dataart.server.persistence.User;
import com.dataart.server.service.UserService;
import com.sun.jersey.api.core.InjectParam;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by misha on 08.08.16.
 */
@Path("/register")
@Produces(MediaType.TEXT_PLAIN)
public class UserResource {

    @Inject
    private UserService userService;

    @POST
    @Consumes("application/json")
    public Response register(User user) {
        userService.create(user);
        return JsonUtils.buildResponse("User registered.", 200);
    }
}
