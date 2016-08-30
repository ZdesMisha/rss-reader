package com.dataart.server.json;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

/**
 * Created by misha on 09.08.16.
 */
public class JsonUtils {

    private static final String ERROR_TEMPLATE = "{\"error\":\"%s\"}";

    public static Response buildResponse(Object object, int status) {
        ResponseBuilder builder = Response.status(status).type(MediaType.APPLICATION_JSON).entity(object);
        return builder.build();
    }

    public static Response buildErrorResponse(String error, int status) {
        ResponseBuilder builder = Response.status(status).type(MediaType.APPLICATION_JSON).entity(String.format(ERROR_TEMPLATE, error));
        return builder.build();
    }
}
