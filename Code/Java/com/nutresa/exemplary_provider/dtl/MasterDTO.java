package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public abstract class MasterDTO {
    @Expose
    private String idCall;
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

    public String getIdCall() {
        return idCall;
    }

    public void setIdCall(String idCall) {
        this.idCall = idCall;
    }

}
