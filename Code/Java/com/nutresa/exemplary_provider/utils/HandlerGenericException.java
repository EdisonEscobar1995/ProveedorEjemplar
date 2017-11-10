package com.nutresa.exemplary_provider.utils;

@SuppressWarnings("serial")
public class HandlerGenericException extends Exception {
    private String message = "";

    public HandlerGenericException(Exception exception) {
        handleException(exception);
    }
    
    private void handleException(Exception exception){
        message = exception.getMessage();
    }

    @Override
    public String getMessage() {
        return message;
    }
    
}
