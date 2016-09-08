package com.dataart.server.domain;

import com.dataart.server.validation.annotation.Email;
import com.sun.istack.internal.NotNull;

import javax.validation.constraints.Size;

/**
 * Created by misha on 26.08.16.
 */
public class User {

    @Email
    private String email;

    @NotNull
    @Size(min = 7,max = 100)
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
