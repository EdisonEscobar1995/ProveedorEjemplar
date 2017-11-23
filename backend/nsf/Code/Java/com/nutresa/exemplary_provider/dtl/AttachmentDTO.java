package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class AttachmentDTO {

	@Expose
	private String id;

	public void setId(String id) {
		this.id = id;
	}

	public String getId() {
		return id;
	}
	
}
