package com.nutresa.app.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class CategoryDTO {
	private String form = "frCategory";
    @Expose
    private String id;
    @Expose
    private String name;
    @Expose
    private String country;
    @Expose
    private String negotiators;
    
	public String getForm() {
		return form;
	}
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getCountry() {
        return country;
    }
    
    public void setCountry(String country) {
        this.country = country;
    }
    
    public String getNegotiators() {
        return negotiators;
    }
    
    public void setNegotiators(String negotiators) {
        this.negotiators = negotiators;
    }
}
