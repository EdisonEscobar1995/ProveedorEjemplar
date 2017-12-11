package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class MenuDTO extends MasterDTO{
    @Expose
    private String title;
    @Expose
    private String path;
    @Expose
    private String component;
    @Expose
    private String type;
    @Expose
    private List<String> idsRol;
    
    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getPath() {
        return this.path;
    }
    
    public void setPath(String path) {
        this.path = path;
    }
    
    public String getComponent() {
        return this.component;
    }
    
    public void setComponent(String component) {
        this.component = component;
    }
    
    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public List<String> getIdsRol() {
        return this.idsRol;
    }
    
    public void setIdsRol(List<String> idsRol) {
        this.idsRol = idsRol;
    }
}
