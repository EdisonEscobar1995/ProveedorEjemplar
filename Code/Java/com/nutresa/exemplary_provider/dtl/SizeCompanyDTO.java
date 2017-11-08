package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class SizeCompanyDTO {
    private static final String form = "frSizeCompany";
    @Expose
    private String id;
    @Expose
    private String name;
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getForm() {
        return form;
    }
    
    public String getId() {
        return id;
    }
    
}
