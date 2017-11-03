package com.nutresa.app.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class SubCategoryDTO {
    @Expose
    private String id;
    @Expose
    private String idCategory;
    @Expose
    private String name;
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getIdCategory() {
        return idCategory;
    }
    
    public void setIdCategory(String idCategory) {
        this.idCategory = idCategory;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
}
