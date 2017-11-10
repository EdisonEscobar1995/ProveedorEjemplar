package com.nutresa.exemplary_provider.utils;

@SuppressWarnings("serial")
public class HandlerGenericException extends Exception {
    private final String message;

    public HandlerGenericException(Exception exception) {
        super(exception.getMessage());
        this.message = exception.getMessage();
    }
    
    @Override
    public String getMessage() {
        return message;
    }
    
}
