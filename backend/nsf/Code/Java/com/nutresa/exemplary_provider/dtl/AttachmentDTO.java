package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class AttachmentDTO {

    @Expose
    private String id;
    @Expose
    private String name;
    @Expose
    private String url;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
