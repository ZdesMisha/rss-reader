package com.dataart.server.utils;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by misha on 19.08.16.
 */
public class DateConverter {

    private static final String DATE_FORMAT = "EEE, dd MMM yyyy HH:mm:ss z";

    public static Date parseDate(String dateToParse) throws Exception {
        SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT);
        if (dateToParse.trim().length() == 0) {
            return new Date();
        } else {
            return format.parse(dateToParse);
        }
    }

    public static Timestamp toSqlTimestamp(Date date) {
        if (date == null) {
            return null;
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.MILLISECOND, 0);
        return new Timestamp(cal.getTimeInMillis());
    }

    public static Date toDate(java.sql.Timestamp timestamp) {
        return new Date(timestamp.getTime());
    }
}
