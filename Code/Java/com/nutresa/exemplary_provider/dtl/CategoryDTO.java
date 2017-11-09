package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class CategoryDTO {
	private static final String form = "frCategory";
    @Expose
    private String id;
    @Expose
    private String name;
    @Expose
    private CountryDTO country;
    @Expose
    private String negotiators;
    @Expose
    private List<SubCategoryDTO> subCategories;
    
	public String getForm() {
		return form;
	}
    
    public String getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public CountryDTO getCountry() {
        return country;
    }
    
    public void setCountry(CountryDTO country) {
        this.country = country;
    }
    
    public String getNegotiators() {
        return negotiators;
    }
    
    public void setNegotiators(String negotiators) {
        this.negotiators = negotiators;
    }

    public List<SubCategoryDTO> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<SubCategoryDTO> subCategories) {
        this.subCategories = subCategories;
    }
    
    
}
