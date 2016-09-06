package com.dataart.server.domain;

/**
 * Created by misha on 06.09.16.
 */
public class RegistrationUser extends User {

    private String confirmedPassword;

//    public RegistrationUser() {
//        super();
//    }
//
//    public RegistrationUser(String email, String password, String confirmedPassword) {
//        super(email, password);
//        this.confirmedPassword = confirmedPassword;
//    }

    public String getConfirmedPassword() {
        return confirmedPassword;
    }

    public void setConfirmedPassword(String confirmedPassword) {
        this.confirmedPassword = confirmedPassword;
    }

}
