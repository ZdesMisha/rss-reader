package com.dataart.server.resource;

import com.dataart.server.authentication.AuthProvider;
import com.dataart.server.exception.handler.ServiceExceptionHandler;
import com.dataart.server.utils.JsonBuilder;
import com.dataart.server.service.PostService;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by misha on 25.08.16.
 */
@Singleton
@Path("/secured/feeds/post")
@Produces({MediaType.APPLICATION_JSON})
public class PostResource {

    @Inject
    private PostService postService;

    @Inject
    private ServiceExceptionHandler exceptionHandler;

    @Inject
    private AuthProvider authProvider;

    @PUT
    @Path("/{id}")
    public Response setViewed(@HeaderParam("Authorization") String token,
                              @PathParam("id") Long id) {
        try {
            String email = authProvider.getEmailByToken(token);
            postService.setViewed(email,id);
            return JsonBuilder.buildEmptySuccessResponse(200);
        } catch (Exception ex) {
            return exceptionHandler.prepareResponse(ex);
        }
    }

    @GET
    @Path("/{id}")
    public Response getPost(@PathParam("id") Long id) {
        try {
            return JsonBuilder.buildResponse(postService.getPost(id), 200);
        } catch (Exception ex) {
            return exceptionHandler.prepareResponse(ex);
        }
    }
}
