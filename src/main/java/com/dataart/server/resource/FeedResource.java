package com.dataart.server.resource;

import com.dataart.server.json.JsonUtils;
import com.dataart.server.json.entity.RssLink;
import com.dataart.server.service.FeedService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by misha on 08.08.16.
 */
@Path("/secured/feeds")
@Produces({MediaType.APPLICATION_JSON})
public class FeedResource {

    @Inject
    private FeedService feedService;


    @GET
    @Path("/page/{page}")
    public Response getFeeds(@PathParam("page") int page) {
        return JsonUtils.buildResponse(feedService.getPage(page), 200);
    }

    @POST
    @Path("/add")
    @Consumes("application/json")
    public Response addFeed(RssLink feed) {
        feedService.addFeed(feed);
        return JsonUtils.buildResponse("Feed added.", 200);
    }

    @DELETE
    @Path("/delete/{id}")
    public Response deleteFeed(@PathParam("id") Long id) {
        feedService.removeFeed(id);
        return JsonUtils.buildResponse("Feed removed.", 200);
    }

    @GET
    @Path("/{id}/sortField/{sortField}/sortDir/{sortDir}/page/{page}")
    public Response getSingleFeed(@PathParam("id") Long feedId,
                            @PathParam("sortField") String sortField,
                            @PathParam("sortDir") String sortDir,
                            @PathParam("page") int page) {
        return JsonUtils.buildResponse(feedService.getSingle(feedId, sortField, sortDir, page), 200);
    }

    @GET
    @Path("/{id}/search/{pattern}/sortField/{sortField}/sortDir/{sortDir}/page/{page}")
    public Response searchByPattern(@PathParam("id") Long feedId,
                                    @PathParam("pattern") String pattern,
                                    @PathParam("sortField") String sortField,
                                    @PathParam("sortDir") String sortDir,
                                    @PathParam("page") int page) {
        return JsonUtils.buildResponse(feedService.searchByPattern(feedId, pattern, sortField, sortDir, page), 200);
    }

    @PUT
    @Path("/refresh")
    public Response refreshFeeds() {
        feedService.refreshFeeds();
        return JsonUtils.buildResponse("Refreshed.", 200);
    }

    @GET
    @Path("/pages/{pages}")
    public Response getAllFeeds(@PathParam("pages") int pages) {
        feedService.getAllPages(pages);
        return JsonUtils.buildResponse(feedService.getAllPages(pages), 200);
    }

}
