package com.dataart.server.json;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by misha on 09.08.16.
 */
public class JsonUtils {

    public static Response buildResponse(Object object,int status){
        Response.ResponseBuilder builder = Response.status(status).type(MediaType.APPLICATION_JSON).entity(object);
        return builder.build();
    }
}
