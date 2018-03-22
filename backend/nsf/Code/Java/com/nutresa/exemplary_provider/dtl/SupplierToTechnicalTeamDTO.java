package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class SupplierToTechnicalTeamDTO {
    @Expose
    private List<String> idSuppliersByCall;

    public void setIdSuppliersByCall(List<String> idSupplierByCall) {
        this.idSuppliersByCall = idSupplierByCall;
    }

    public List<String> getIdSuppliersByCall() {
        return idSuppliersByCall;
    }

}
