package com.dataart.server.utils;

/**
 * Created by misha on 19.08.16.
 */
public class PaginationUtils {

    public static final int PAGE_SIZE=20;

    public static int getStartRow(int page){
        return page==0 ? 0 : PAGE_SIZE*page;
    }
}
