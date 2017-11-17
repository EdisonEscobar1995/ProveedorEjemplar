package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class CompanyTypeDTO {
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

    public String getId() {
        return id;
    }
    
}
