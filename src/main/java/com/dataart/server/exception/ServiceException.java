package com.dataart.server.exception;

/**
 * Created by misha on 30.08.16.
 */
public class ServiceException extends RuntimeException {
    public ServiceException(String message) {
        super(message);
    }
}
