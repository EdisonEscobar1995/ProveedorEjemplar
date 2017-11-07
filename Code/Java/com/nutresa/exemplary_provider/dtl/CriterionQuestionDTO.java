package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class CriterionQuestionDTO {
    private final String form = "frCriterionQuestion";
    @Expose
    private String id;
    @Expose
    private String idDimension;
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

    public String getIdDimension() {
        return idDimension;
    }

    public void setIdDimension(String idDimension) {
        this.idDimension = idDimension;
    }

    public String getForm() {
        return form;
    }
    
}
