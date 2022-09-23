package com.project.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class UtilDate {

   public static String today() {
        String patern = "dd-MM-YYYY";
        SimpleDateFormat simpleFormatter = new SimpleDateFormat(patern);
        return simpleFormatter.format(new Date());
    }
}
