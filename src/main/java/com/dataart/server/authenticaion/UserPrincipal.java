package com.dataart.server.authenticaion;

import java.security.Principal;

/**
 * Created by misha on 29.08.16.
 */
public class UserPrincipal implements Principal {

    private String email;
    private String password;

    public UserPrincipal(){
    }

    public UserPrincipal(String password, String email) {
        this.password = password;
        this.email = email;
    }

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


    @Override
    public String getName() {
        return email;
    }
}
