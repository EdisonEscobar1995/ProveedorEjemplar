package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class DimensionDTO extends MasterDTO{
    @Expose
    private List<CriterionDTO> criterions;

    public List<CriterionDTO> getCriterions() {
        return criterions;
    }

    public void setCriterions(List<CriterionDTO> criterions) {
        this.criterions = criterions;
    }
    
    
}
