package com.project.Util;

import lombok.experimental.UtilityClass;

import java.util.regex.Pattern;
@UtilityClass
public class SmsValidator {

  public boolean isValid(String msisdn) {
        Pattern msisdnWithoutEight = Pattern.compile(getPatternForMsisdn(8));
        Pattern msisdnWithoutNine = Pattern.compile(getPatternForMsisdn(9));
        return msisdnWithoutEight.matcher(msisdn).matches() || msisdnWithoutNine.matcher(msisdn).matches() && msisdn.startsWith("6");
    }

    private String getPatternForMsisdn(int lengthOfMsisdn) {
        return "^([0-9]{" + lengthOfMsisdn + "})$";
    }
}
