package com.project.exeption;

public class OverflowDailyHours extends Exception {
    public OverflowDailyHours() {
        super("Max hour per day is 15!");
    }
}
