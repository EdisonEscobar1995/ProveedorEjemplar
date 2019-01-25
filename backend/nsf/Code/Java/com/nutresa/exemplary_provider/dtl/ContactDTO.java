package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class ContactDTO extends MasterDTO {
    @Expose
    private String idSupplier;
    @Expose
    private String email;
    @Expose
    private String phone;

    public String getIdSupplier() {
        return idSupplier;
    }

    public void setIdSupplier(String idSupplier) {
        this.idSupplier = idSupplier;
    }

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPhone() {
		return phone;
	}
}
