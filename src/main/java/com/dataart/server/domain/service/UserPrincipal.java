package com.dataart.server.domain.service;

import com.dataart.server.domain.User;

import java.security.Principal;

/**
 * Created by misha on 29.08.16.
 */
public class UserPrincipal extends User implements Principal {

    @Override
    public String getName() {
        return getEmail();
    }
}
