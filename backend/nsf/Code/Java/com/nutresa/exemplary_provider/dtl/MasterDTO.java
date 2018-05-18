package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public abstract class MasterDTO implements DTO {
    @Expose
    protected String id;
    @Expose
    protected String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
