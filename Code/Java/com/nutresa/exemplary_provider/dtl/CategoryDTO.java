package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class CategoryDTO {
    @Expose
    private String id;
    @Expose
    private String name;
    @Expose
    private String idCountry;
    @Expose
    private List<String> negotiators;
    @Expose
    private List<SubCategoryDTO> subCategories;

    public List<String> getNegotiators() {
        return negotiators;
    }

    public void setNegotiators(List<String> negotiators) {
        this.negotiators = negotiators;
    }

    public List<SubCategoryDTO> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<SubCategoryDTO> subCategories) {
        this.subCategories = subCategories;
    }

    public String getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(String idCountry) {
        this.idCountry = idCountry;
    }
    
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
