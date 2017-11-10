package com.nutresa.exemplary_provider.utils;

@SuppressWarnings("serial")
public class HandlerGenericException extends Exception {
    private String message;

    public HandlerGenericException(Exception exception) {
        handleException(exception);
    }
    
    
    private void handleException(Exception exception){
//        return new SomeException(exception.getMessage());
    }

    public String getMessage() {
        return message;
    }
    
}
