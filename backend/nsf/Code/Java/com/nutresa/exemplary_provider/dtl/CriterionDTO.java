package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class CriterionDTO extends MasterDTO{
    
    @Expose
    private String idDimension;
    
    public void setIdDimension(String idDimension) {
        this.idDimension = idDimension;
    }

    public String getIdDimension() {
        return idDimension;
    }
        
}
