package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public abstract class MasterDTO {
    @Expose
    public String id;
    @Expose
    public String name;

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
