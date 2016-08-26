package com.dataart.server.authenticaion;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Created by misha on 26.08.16.
 */
@Retention(RUNTIME)
@Target({TYPE, METHOD})
public @interface Secured { }
