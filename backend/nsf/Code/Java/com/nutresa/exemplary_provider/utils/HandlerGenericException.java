package com.nutresa.exemplary_provider.utils;

@SuppressWarnings("serial")
public class HandlerGenericException extends Exception {
    private final String message;

    public HandlerGenericException(Exception exception) {
        super(exception);
        this.message = Common.getExceptionMessage(exception);
    }

    public HandlerGenericException(String string) {
        super(string);
        this.message = string;
    }

    public HandlerGenericException(Exception exception, String string) {
        super(exception);
        this.message = string + ", Exception: " + Common.getExceptionMessage(exception);
    }

    @Override
    public String getMessage() {
        return message;
    }

}
