package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class SubCategoryDTO extends ReferenceDTO{
    @Expose
    private String idCategory;
    
    public String getIdCategory() {
        return idCategory;
    }
    
    public void setIdCategory(String idCategory) {
        this.idCategory = idCategory;
    }
    
}
