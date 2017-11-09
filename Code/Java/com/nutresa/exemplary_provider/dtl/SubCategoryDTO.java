package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class SubCategoryDTO {
    private static final String FORM = "frSubCategory";
	@Expose
    private String id;
    @Expose
    private String idCategory;
    @Expose
    private String name;
    
    public String getForm() {
		return FORM;
	}
    
    public String getId() {
        return id;
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
