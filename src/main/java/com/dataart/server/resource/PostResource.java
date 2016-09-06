package com.dataart.server.resource;

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

    @PUT
    @Path("/{id}")
    public Response setViewed(@PathParam("id") Long id) {
        System.out.println("set viewed");
        postService.setViewed(id);
        return JsonBuilder.buildEmptySuccessResponse(200);
    }

    @GET
    @Path("/{id}")
    public Response getPost(@PathParam("id") Long id) {
        System.out.println("get post");
        return JsonBuilder.buildResponse(postService.getPost(id), 200);
    }
}
