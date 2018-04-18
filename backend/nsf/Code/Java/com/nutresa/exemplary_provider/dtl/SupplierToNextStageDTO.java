package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class SupplierToNextStageDTO {
    @Expose
    private List<String> idSuppliersByCall;
    @Expose
    private String stage;

    public void setIdSuppliersByCall(List<String> idSupplierByCall) {
        this.idSuppliersByCall = idSupplierByCall;
    }

    public List<String> getIdSuppliersByCall() {
        return idSuppliersByCall;
    }

    public void setStage(String nameStage) {
        this.stage = nameStage;
    }

    public String getStage() {
        return stage;
    }

}
