package com.dataart.server.resource;

import com.dataart.server.authentication.AuthProvider;
import com.dataart.server.exception.handler.ServiceExceptionHandler;
import com.dataart.server.utils.JsonBuilder;
import com.dataart.server.domain.service.RssLink;
import com.dataart.server.domain.Feed;
import com.dataart.server.service.FeedService;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * Created by misha on 08.08.16.
 */
@Singleton
@Path("/secured/feeds")
@Produces({MediaType.APPLICATION_JSON})
public class FeedResource {

    @Inject
    private FeedService feedService;

    @Inject
    private ServiceExceptionHandler exceptionHandler;

    @Inject
    private AuthProvider authProvider;

    @GET
    @Path("/page/{page}")
    public Response getFeeds(@HeaderParam("Authorization") String token,
                             @PathParam("page") int page) {
        try {
            String email = authProvider.getEmailByToken(token);
            return JsonBuilder.buildResponse(feedService.getPage(email, page), 200);
        } catch (Exception ex) {
            return exceptionHandler.prepareResponse(ex);
        }
    }

    @POST
    @Path("/add")
    @Consumes("application/json")
    public Response addFeed(@HeaderParam("Authorization") String token,
                            @NotNull RssLink link) {
        try {
            String email = authProvider.getEmailByToken(token);
            feedService.addFeed(email, link);
            return JsonBuilder.buildEmptySuccessResponse(200);
        } catch (Exception ex) {
            return exceptionHandler.prepareResponse(ex);
        }
    }

    @DELETE
    @Path("/delete/{id}")
    public Response deleteFeed(@HeaderParam("Authorization") String token,
                               @PathParam("id") Long id) {
        try {
            String email = authProvider.getEmailByToken(token);
            feedService.removeFeed(email, id);
            return JsonBuilder.buildEmptySuccessResponse(200);
        } catch (Exception ex) {
            return exceptionHandler.prepareResponse(ex);
        }
    }

    @GET
    @Path("/{id}/sortField/{sortField}/sortDir/{sortDir}/page/{page}")
    public Response getFeedPosts(@HeaderParam("Authorization") String token,
                                  @PathParam("id") Long feedId,
                                  @PathParam("sortField") String sortField,
                                  @PathParam("sortDir") String sortDir,
                                  @PathParam("page") int page) {
        try {
            String email = authProvider.getEmailByToken(token);
            System.out.println("SIZE "+feedService.getFeedPosts(email, feedId, sortField, sortDir, page).getPosts().size());
            System.out.println("EMAIL "+email+" feed id "+feedId);
            return JsonBuilder.buildResponse(feedService.getFeedPosts(email, feedId, sortField, sortDir, page), 200);
        } catch (Exception ex) {
            return exceptionHandler.prepareResponse(ex);
        }
    }

    @GET
    @Path("/{id}/search/{pattern}/sortField/{sortField}/sortDir/{sortDir}/page/{page}")
    public Response searchByPattern(@HeaderParam("Authorization") String token,
                                    @PathParam("id") Long feedId,
                                    @PathParam("pattern") String pattern,
                                    @PathParam("sortField") String sortField,
                                    @PathParam("sortDir") String sortDir,
                                    @PathParam("page") int page) {
        try {
            String email = authProvider.getEmailByToken(token);
            return JsonBuilder.buildResponse(feedService.searchByPattern(email, feedId, pattern, sortField, sortDir, page), 200);
        } catch (Exception ex) {
            return exceptionHandler.prepareResponse(ex);
        }
    }

    @PUT
    @Path("/refresh")
    public Response refreshFeeds(@HeaderParam("Authorization") String token) {
        try {
            String email = authProvider.getEmailByToken(token);
            feedService.refreshFeeds(email);
            return JsonBuilder.buildEmptySuccessResponse(200);
        } catch (Exception ex) {
            return exceptionHandler.prepareResponse(ex);
        }
    }

    @GET
    @Path("/pages/{pages}")
    public Response getAllFeeds(@HeaderParam("Authorization") String token,
                                @PathParam("pages") int pages) {
        try {
            System.out.println("REFRESH FEED LIST   ");
            String email = authProvider.getEmailByToken(token);
            List<Feed> list = feedService.getAllPages(email, pages);
            return JsonBuilder.buildResponse(list, 200);
        } catch (Exception ex) {
            return exceptionHandler.prepareResponse(ex);
        }
    }

}
