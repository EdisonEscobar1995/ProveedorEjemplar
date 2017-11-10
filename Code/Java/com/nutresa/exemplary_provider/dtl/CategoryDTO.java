package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class CategoryDTO {
    private static final String FORM = "frCategory";
    @Expose
    private String id;
    @Expose
    private String name;
    @Expose
    private String idCountry;
    @Expose
    private CountryDTO country;
    @Expose
    private List<String> negotiators;
    @Expose
    private List<SubCategoryDTO> subCategories;

    public String getForm() {
        return FORM;
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

}
