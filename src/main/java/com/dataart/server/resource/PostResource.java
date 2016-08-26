package com.dataart.server.resource;

import com.dataart.server.json.JsonUtils;
import com.dataart.server.service.PostService;
import com.sun.jersey.api.core.InjectParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by misha on 25.08.16.
 */
@Path("/feed/post")
@Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
public class PostResource {

    @InjectParam
    PostService postService;

    @PUT
    @Path("/{id}")
    public Response setViewed(@PathParam("id") Long id) {
        System.out.println("set Viewed!");
        postService.setViewed(id);
        return JsonUtils.buildResponse("Feed viewed", 200);
    }

    @GET
    @Path("/{id}")
    public Response getPost(@PathParam("id") Long id) {
        System.out.println("get Feed Item!");
        return JsonUtils.buildResponse(postService.getPost(id), 200);
    }
}
