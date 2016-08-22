package com.dataart.server.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by misha on 19.08.16.
 */
public class DateConverter {

    private static final String DATE_FORMAT = "EEE, dd MMM yyyy HH:mm:ss";

    public static Date parseDate(String dateToParse) {
        SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT);
        try {
            return format.parse(dateToParse);
        } catch (ParseException ex) {
            System.out.println("Unable to parse string to date");
            throw new RuntimeException("Unable to parse string to date");
        }
    }

    public static Timestamp toSqlTimestamp (Date date){
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.MILLISECOND, 0);
        return new Timestamp(cal.getTimeInMillis());
    }

    public static Date toDate(java.sql.Timestamp timestamp) {
        return new Date(timestamp.getTime());
    }
}
