package com.project.error_advice;

public class MsisdnNotValidEception extends RuntimeException {
    public MsisdnNotValidEception(String msg) {
        super(msg);
    }
}
