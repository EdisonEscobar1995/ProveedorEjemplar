package Nutresa.ExemplaryProvider.DTL;

import com.google.gson.annotations.Expose;

public class ServletResponseDTO<T> {
    @Expose
    T data;

    @Expose
    String message = "";
    
    @Expose
    boolean status = true;

    public ServletResponseDTO(boolean status, String message, T data) {
        this.data = data;
        this.message = message;
        this.status = status;
    }

    public ServletResponseDTO(boolean status, String message) {
        this.message = message;
        this.status = status;
    }
}
