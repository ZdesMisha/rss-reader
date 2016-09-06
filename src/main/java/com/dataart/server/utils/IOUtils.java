package com.dataart.server.utils;

import java.io.Closeable;
import java.io.IOException;

/**
 * Created by misha on 05.09.16.
 */
public class IOUtils {

    public static void closeQuietly(AutoCloseable closeable){
        try {
            closeable.close();
        }catch (Exception ex){
            throw new RuntimeException("Unable to close");
        }
    }
}
