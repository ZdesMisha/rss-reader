package com.dataart.server;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by misha on 19.08.16.
 */
public class test {

    public static void main(String[] args){
        SimpleDateFormat format = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss");
        String dateToParse = "Thu, 18 Aug 2016 15:28:04 GMT";
        try {
            Date date = format.parse(dateToParse);
            System.out.println("date parsed "+date);
            System.out.println("-------------------------");
            System.out.println("Timestamp to date  "+new Date(1471569687000L));


        }catch (Exception ex){
            System.out.println("Cannot parse date");
            ex.printStackTrace();
        }
    }
}
