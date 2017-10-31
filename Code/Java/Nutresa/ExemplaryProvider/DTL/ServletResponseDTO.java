package Nutresa.ExemplaryProvider.DTL;

import com.google.gson.annotations.Expose;

public class ServletResponseDTO {
    @Expose
    Object[] data;

    @Expose
    String message = "";
    
    @Expose
    boolean status = true;

    public ServletResponseDTO(Object[] data, String message, boolean status) {
        this.data = data;
        this.message = message;
        this.status = status;
    }

    public ServletResponseDTO(Object[] data, String message) {
        this.data = data;
        this.message = message;
    }

    public ServletResponseDTO(String message) {
        this.message = message;
    }

    public ServletResponseDTO(String message, boolean status) {
        this.message = message;
        this.status = status;
    }
}
