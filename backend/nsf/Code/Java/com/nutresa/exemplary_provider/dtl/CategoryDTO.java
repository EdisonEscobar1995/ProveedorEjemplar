package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class CategoryDTO extends MasterDTO {
    @Expose
    private String idSupply;
    @Expose
    private List<SubCategoryDTO> subCategories;

    public List<SubCategoryDTO> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<SubCategoryDTO> subCategories) {
        this.subCategories = subCategories;
    }

    public String getIdSupply() {
        return idSupply;
    }

    public void setIdSupply(String idSupply) {
        this.idSupply = idSupply;
    }

}
