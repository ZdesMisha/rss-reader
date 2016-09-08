package com.dataart.server.domain.service;

import com.dataart.server.domain.User;

/**
 * Created by misha on 06.09.16.
 */
public class RegistrationUser extends User {

    private String confirmedPassword;

    public String getConfirmedPassword() {
        return confirmedPassword;
    }

    public void setConfirmedPassword(String confirmedPassword) {
        this.confirmedPassword = confirmedPassword;
    }

}
