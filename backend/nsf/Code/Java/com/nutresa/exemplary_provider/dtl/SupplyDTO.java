package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class SupplyDTO extends MasterDTO {
    @Expose
    private String idCountry;
    @Expose
    private List<String> negotiators;

    public List<String> getNegotiators() {
        return negotiators;
    }

    public void setNegotiators(List<String> negotiators) {
        this.negotiators = negotiators;
    }

    public String getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(String idCountry) {
        this.idCountry = idCountry;
    }
}
