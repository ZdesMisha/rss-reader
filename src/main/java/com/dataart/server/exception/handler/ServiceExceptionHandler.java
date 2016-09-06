package com.dataart.server.exception.handler;

import com.dataart.server.exception.ServiceException;
import com.dataart.server.utils.JsonBuilder;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * Created by misha on 06.09.16.
 */
@Provider
public class ServiceExceptionHandler implements ExceptionMapper<RuntimeException> {

    @Override
    public Response toResponse(RuntimeException ex) {
        if (ex instanceof ConstraintViolationException) {
            System.out.println("VALIDATION ERROR");
            return JsonBuilder.buildServiceErrorResponse("DATA IS NOT VALID", 400);
        } else if (ex instanceof ServiceException) {
            System.out.println("SERVICE ERROR");
            return JsonBuilder.buildServiceErrorResponse(ex.getMessage(), 400);
        } else {
            System.out.println("INTERNAL ERROR");
            return JsonBuilder.buildInternalServerErrorResponse();
        }
    }
}
