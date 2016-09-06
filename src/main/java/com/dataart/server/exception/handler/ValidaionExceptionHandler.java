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
public class ValidaionExceptionHandler implements ExceptionMapper<ConstraintViolationException> {

    @Override
    public Response toResponse(ConstraintViolationException ex) {
        System.out.println("VALIDATION ERROR");
        return JsonBuilder.buildServiceErrorResponse("DATA IS NOT VALID", 400);
    }
}
