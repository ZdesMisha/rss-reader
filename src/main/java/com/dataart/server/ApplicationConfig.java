package com.dataart.server;

import com.dataart.server.resource.FeedResource;
import com.dataart.server.resource.PostResource;
import com.dataart.server.resource.UserResource;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by misha on 01.09.16.
 */
@ApplicationPath("/rest/*")
public class ApplicationConfig extends Application {
    public Set<Class<?>> getClasses() {
        return new HashSet<>(Arrays.asList(FeedResource.class, PostResource.class, UserResource.class));
    }
}
