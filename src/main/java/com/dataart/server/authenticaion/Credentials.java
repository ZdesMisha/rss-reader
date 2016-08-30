package com.dataart.server.authenticaion;

/**
 * Created by misha on 29.08.16.
 */
public class Credentials {

    private String email;
    private String password;

    public Credentials(){

    }

    public Credentials(String password, String email) {
        this.password = password;
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
