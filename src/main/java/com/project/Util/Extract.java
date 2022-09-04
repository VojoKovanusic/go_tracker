package com.project.Util;


import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.math.NumberUtils;

@Slf4j
public class Extract {

    private static final String START_ATTRIBUTE = "=";
    private static final String BETWEEN_ATTRIBUTE = "*";

    public static String msisdn(String qrData) {
        String msisdn = qrData.substring(0,qrData.indexOf(BETWEEN_ATTRIBUTE));
        //  log.info("Extract msisdn: {} From qr rider data.", msisdn);
        return msisdn;
    }

    public static String childName(String qrData) {
        String childName = qrData.substring(qrData.lastIndexOf(BETWEEN_ATTRIBUTE) + 1);
        //   log.info("Extract child name {} From qr rider data.", childName);
        return childName;
    }

    public static boolean isValid(String qrData) {
        final String childName = childName(qrData);
        final String msisdn = msisdn(qrData);
        try {
            if (!childName.matches("[a-zA-Z]+")) {
                log.info("Client name {} not valid, must contains just leters", childName);
                return false;
            }
            if (!NumberUtils.isCreatable(msisdn)) {
                log.info("Msisdn {} not valid, must contains just number", msisdn);
                return false;
            }
        } catch (NullPointerException e) {
            log.error("QR data not valid! {}", e.toString());
            return false;
        }
        log.info("Extract msisdn  {}, and child name {} from qr code. Content is valid", msisdn, childName);
        return true;
    }

}
