package com.dataart.server.resource;

import com.dataart.server.json.JsonUtils;
import com.dataart.server.json.entity.FeedJson;
import com.dataart.server.service.FeedService;
import com.dataart.server.xml.RssReader;
import com.sun.jersey.api.core.InjectParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by misha on 08.08.16.
 */
@Path("feed")
@Produces({ MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
public class FeedResource {

    @InjectParam
    private FeedService feedService;


    @GET
    @Path("/list/{page}")
    public Response getFeedList(@PathParam("page") int page) {
        System.out.println("Page "+page);
        System.out.println("get Feed list!" +feedService.getAll(page) );
        return JsonUtils.buildResponse(feedService.getAll(page), 200);
    }

    @POST
    @Path("/post")
    @Consumes("application/json")
    public Response addFeed(FeedJson feed) {
        System.out.println("add Feed!");
        feedService.addFeed(feed);
        return JsonUtils.buildResponse("Feed added", 200);
    }

    @DELETE
    @Path("/{id}")
    public Response deleteFeed(@PathParam("id") Long id){
        System.out.println("delete Feed");
        feedService.removeFeed(id);
        return JsonUtils.buildResponse("Feed removed", 200);
    }

    @GET
    @Path("/{id}/{page}")
    public Response getFeed(@PathParam("id") Long id,@PathParam("page") int page){
        System.out.println("single Feed "+feedService.getFeed(id,page));
        return JsonUtils.buildResponse(feedService.getFeed(id,page), 200);
    }

    @GET
    @Path("/all/{page}")
    public Response getAllFeeds(@PathParam("page") int page){
        System.out.println("get Feeds!");
        return JsonUtils.buildResponse(feedService.getAllDetailed(page), 200);
    }

    @PUT
    @Path("/item/{id}")
    public Response setViewed(@PathParam("id") Long id){
        System.out.println("set Viewed!");
        feedService.setViewed(id);
        return JsonUtils.buildResponse("Feed viewed", 200);
    }

    @GET
    @Path("/item/{id}")
    public Response getPost(@PathParam("id") Long id){
        System.out.println("get Feed Item!");
        return JsonUtils.buildResponse(feedService.getPost(id), 200);
    }

    @PUT
    @Path("/refresh")
    public Response refresh(){
        System.out.println("Refresh!");
        feedService.refreshUserFeeds();
        return JsonUtils.buildResponse("refresh", 200);
    }

    @GET
    @Path("/refreshList/{pages}")
    public Response refreshAll(@PathParam("pages")int pages){
        System.out.println("Refresh all!");
        feedService.refreshUserFeedList(pages);
        return JsonUtils.buildResponse(feedService.refreshUserFeedList(pages), 200);
    }

    @GET
    @Path("/search/{id}/{pattern}/{page}")
    public Response searchPssts(@PathParam("id")Long feedId,@PathParam("pattern") String pattern,@PathParam("page") int page){
        System.out.println("find posts");
        return JsonUtils.buildResponse(feedService.searchByPattern(feedId,pattern,page),200);
    }

}
