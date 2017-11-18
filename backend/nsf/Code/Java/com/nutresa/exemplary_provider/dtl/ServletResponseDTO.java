package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;
import com.nutresa.exemplary_provider.utils.Common;

public class ServletResponseDTO<T> {
    private static final String SUCCESS = "success";

    @Expose
    T data;

    @Expose
    String message = "";

    @Expose
    boolean status = true;

    public ServletResponseDTO(boolean status, String message) {
        this.message = message;
        this.status = status;
    }

    public ServletResponseDTO(Exception exception) {
        this.message = Common.getExceptionMessage(exception);
        this.status = false;
    }

    public ServletResponseDTO(T data) {
        this.data = data;
        this.message = SUCCESS;
        this.status = true;
    }
}