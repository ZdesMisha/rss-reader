package com.dataart.server.authenticaion;

import java.security.Principal;

/**
 * Created by misha on 10.08.16.
 */
public class RolePrincipal  {

    private String name;

    public RolePrincipal(String name) {
        super();
        this.name = name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}