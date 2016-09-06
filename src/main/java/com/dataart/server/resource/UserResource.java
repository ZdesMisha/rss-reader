package com.dataart.server.resource;

/**
 * Created by misha on 09.08.16.
 */

import com.dataart.server.domain.RegistrationUser;
import com.dataart.server.exception.handler.ServiceExceptionHandler;
import com.dataart.server.utils.JsonBuilder;
import com.dataart.server.service.UserService;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by misha on 08.08.16.
 */
@Singleton
@Path("/register")
@Produces({MediaType.APPLICATION_JSON})
public class UserResource {

    @Inject
    private UserService userService;

    @Inject
    private ServiceExceptionHandler exceptionHandler;

    @POST
    @Consumes("application/json")
    public Response register(@Valid RegistrationUser registrationUser){
        try {
            if (!registrationUser.getPassword().equals(registrationUser.getConfirmedPassword())) {
                return JsonBuilder.buildServiceErrorResponse("PASSWORDS ARE NOT EQUAL", 400);
            }
            userService.create(registrationUser);
            return JsonBuilder.buildEmptySuccessResponse(200);
        } catch (Exception ex) {
            return exceptionHandler.handle(ex);
        }
    }


}
