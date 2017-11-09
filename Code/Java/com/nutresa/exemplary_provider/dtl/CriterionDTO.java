package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class CriterionDTO {
    private static final String FORM = "frCriterionQuestion";
    @Expose
    private String id;
    @Expose
    private DimensionDTO dimension;
    @Expose
    private String name;

    public String getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DimensionDTO getIdDimension() {
        return dimension;
    }

    public void setIdDimension(DimensionDTO idDimension) {
        this.dimension = idDimension;
    }

    public String getForm() {
        return FORM;
    }
    
}
