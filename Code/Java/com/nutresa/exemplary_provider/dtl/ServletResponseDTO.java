package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

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

	public ServletResponseDTO(boolean status, Exception exception) {
		this.message = exception.getMessage();
		this.status = status;
	}

    public ServletResponseDTO(T data) {
        this.data = data;
        this.message = SUCCESS;
        this.status = true;
    }
}