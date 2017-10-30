package Nutresa.ExemplaryProvider.DTL;

import com.google.gson.annotations.Expose;

public class RequestReturnDTO {
    @Expose
    Object[] data;

    @Expose
    String message = "";
    
    @Expose
    boolean status = true;

    public RequestReturnDTO(Object[] data, String message, boolean status) {
        this.data = data;
        this.message = message;
        this.status = status;
    }

    public RequestReturnDTO(Object[] data, String message) {
        this.data = data;
        this.message = message;
    }

    public RequestReturnDTO(Object data, String message, boolean status) {
        this.data = new Object[] { data };
        this.message = message;
        this.status = status;
    }

    public RequestReturnDTO(Object data, String message) {
        this.data = new Object[] { data };
        this.message = message;
    }
    
    public RequestReturnDTO(String message) {
        this.message = message;
    }

    public RequestReturnDTO(String message, boolean status) {
        this.message = message;
        this.status = status;
    }
}
