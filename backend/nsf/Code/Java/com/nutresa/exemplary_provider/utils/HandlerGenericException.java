package com.nutresa.exemplary_provider.utils;

@SuppressWarnings("serial")
public class HandlerGenericException extends Exception {
    private final String message;

    public HandlerGenericException(Exception exception) {
        super("");
        this.message = Common.getExceptionMessage(exception);
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
