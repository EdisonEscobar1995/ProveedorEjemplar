package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class CriterionDTO extends MasterDTO{
    
    @Expose
    private String idDimension;
    @Expose
    private DimensionDTO dimension;
    
    public void setIdDimension(String idDimension) {
        this.idDimension = idDimension;
    }

    public String getIdDimension() {
        return idDimension;
    }

    public void setDimension(DimensionDTO dimension) {
        this.dimension = dimension;
    }

    public DimensionDTO getDimension() {
        return dimension;
    }
        
}
