package com.dataart.server.resource;

/**
 * Created by misha on 09.08.16.
 */
import com.dataart.server.dao.UserRepository;
import com.sun.jersey.api.core.InjectParam;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
/**
 * Created by misha on 08.08.16.
 */
@Path("bye")
@Produces(MediaType.TEXT_PLAIN)
public class UserResource {

    @InjectParam
    private UserRepository repository;

    @GET
    public String sayHello() {
        System.out.println("Byeeeee!");
        return "Bye Jersey";
    }
}
