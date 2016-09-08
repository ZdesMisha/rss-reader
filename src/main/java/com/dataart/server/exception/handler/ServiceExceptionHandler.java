package com.dataart.server.exception.handler;

import com.dataart.server.exception.ServiceException;
import com.dataart.server.utils.JsonBuilder;

import javax.ejb.Singleton;
import javax.ws.rs.core.Response;

/**
 * Created by misha on 06.09.16.
 */
@Singleton
public class ServiceExceptionHandler {
    public Response prepareResponse(Exception ex){
        ex.printStackTrace();
        if(ex instanceof ServiceException){
            return JsonBuilder.buildServiceErrorResponse(ex.getMessage(),400);
        } else {
            return JsonBuilder.buildInternalServerErrorResponse();
        }
    }
}
