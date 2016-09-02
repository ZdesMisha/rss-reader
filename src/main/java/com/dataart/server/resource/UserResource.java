package com.dataart.server.resource;

/**
 * Created by misha on 09.08.16.
 */

import com.dataart.server.json.JsonUtils;
import com.dataart.server.persistence.User;
import com.dataart.server.service.UserService;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by misha on 08.08.16.
 */
@Singleton
@Path("/register")
@Produces(MediaType.TEXT_PLAIN)
public class UserResource {

    @Inject
    private UserService userService;

    @POST
    @Consumes("application/json")
    public Response register(User user) {
        userService.create(user);
        return JsonUtils.buildEmptySuccessResponse(200);
    }



}
