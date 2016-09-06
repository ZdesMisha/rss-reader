package com.dataart.server.validation.annotation;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Created by misha on 06.09.16.
 */
@NotNull
@Size(min = 7, max = 100)
@Pattern(regexp = "^[a-zA-Z0-9_\\-\\.]{1,20}@[a-zA-Z0-9]{1,10}\\.[a-zA-Z]{2,4}$",message = "Email is invalid")
@Constraint(validatedBy = {})
@Target({METHOD, FIELD, CONSTRUCTOR, PARAMETER})
@Retention(RUNTIME)
public @interface Email {
    String message() default "EMAIL IS NOT VALID";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
