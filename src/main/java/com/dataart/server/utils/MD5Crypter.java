package com.dataart.server.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by misha on 06.09.16.
 */
public class MD5Crypter {

    public static String cryptWithMD5(String pass) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] passBytes = pass.getBytes();
            md.reset();
            byte[] digested = md.digest(passBytes);
            StringBuilder sb = new StringBuilder();
            for (byte aDigested : digested) {
                sb.append(Integer.toHexString(0xff & aDigested));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex.getMessage());
        }
    }
}
