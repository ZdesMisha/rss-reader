package com.dataart.server.resource;

import com.dataart.server.json.JsonUtils;
import com.dataart.server.service.PostService;
import com.sun.jersey.api.core.InjectParam;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by misha on 25.08.16.
 */
@Path("/secured/feed/post")
@Produces({MediaType.APPLICATION_JSON})
public class PostResource {

    @Inject
    private PostService postService;

    @PUT
    @Path("/{id}")
    public Response setViewed(@PathParam("id") Long id) {
        postService.setViewed(id);
        return JsonUtils.buildResponse("Feed set viewed.", 200);
    }

    @GET
    @Path("/{id}")
    public Response getPost(@PathParam("id") Long id) {
        return JsonUtils.buildResponse(postService.getPost(id), 200);
    }
}
