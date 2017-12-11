package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class MenuDTO extends MasterDTO{
    @Expose
    private String label;
    @Expose
    private List<String> idsRol;
    
    public void setLabel(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public void setIdsRol(List<String> idsRol) {
        this.idsRol = idsRol;
    }

    public List<String> getIdsRol() {
        return idsRol;
    }
}
