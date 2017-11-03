package com.nutresa.app.exemplary_provider.dtl;

import org.openntf.domino.utils.DominoUtils;

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
	
	public ServletResponseDTO(boolean status, Exception exception) {
		DominoUtils.handleException(new Throwable(exception));
		this.message = exception.getMessage();
		this.status = status;
	}
	
	public ServletResponseDTO(boolean status, Exception exception, T data) {
		DominoUtils.handleException(new Throwable(exception));
		this.data = data;
		this.message = exception.getMessage();
		this.status = status;
	}
}