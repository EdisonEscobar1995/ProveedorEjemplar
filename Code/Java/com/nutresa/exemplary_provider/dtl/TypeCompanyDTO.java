package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class TypeCompanyDTO {
    private static final String FORM = "frTypeCompany";
    @Expose
    private String id;
    @Expose
    private String name;

    public String getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getForm() {
        return FORM;
    }
    
}
