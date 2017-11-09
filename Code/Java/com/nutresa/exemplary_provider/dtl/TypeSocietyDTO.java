package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class TypeSocietyDTO {
    private static final String FORM = "frTypeSociety";
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
