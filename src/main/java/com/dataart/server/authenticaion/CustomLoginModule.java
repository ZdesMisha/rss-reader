package com.dataart.server.authenticaion;

import javax.security.auth.Subject;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.login.LoginException;
import javax.security.auth.spi.LoginModule;
import java.util.Map;

/**
 * Created by misha on 10.08.16.
 */
public class CustomLoginModule  {
    public void initialize(Subject subject, CallbackHandler callbackHandler, Map<String, ?> sharedState, Map<String, ?> options) {

    }

    public boolean login() throws LoginException {
        return false;
    }

    public boolean commit() throws LoginException {
        return false;
    }

    public boolean abort() throws LoginException {
        return false;
    }

    public boolean logout() throws LoginException {
        return false;
    }
}
