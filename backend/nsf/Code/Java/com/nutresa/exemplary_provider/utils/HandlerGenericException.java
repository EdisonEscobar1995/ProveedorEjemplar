package com.nutresa.exemplary_provider.utils;

@SuppressWarnings("serial")
public class HandlerGenericException extends Exception {
    private final String message;

    public HandlerGenericException(Exception exception) {
        super("");
        String message = Common.getExceptionMessage(exception);
        this.message = message;
    }

    public HandlerGenericException(String string) {
        super(string);
        this.message = string;
    }

    @Override
    public String getMessage() {
        return message;
    }

}
