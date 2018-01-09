package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class AccessDTO {
    @Expose
    private String id;
    @Expose
    private String api;
    @Expose
    private String action;

    public String getApi() {
        return api;
    }

    public void setApi(String api) {
        this.api = api;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getId() {
        return id;
    }

}
