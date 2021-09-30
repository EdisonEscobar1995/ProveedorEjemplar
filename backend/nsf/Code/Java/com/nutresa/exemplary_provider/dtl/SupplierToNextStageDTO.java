package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class SupplierToNextStageDTO {
    @Expose
    private List<String> idSuppliersByCall;
    @Expose
    private String stage;
    @Expose
    private String negociator;
    @Expose
    private List<String> suppliesSpecials;

    public void setIdSuppliersByCall(List<String> idSupplierByCall) {
        this.idSuppliersByCall = idSupplierByCall;
    }

    public String getNegociator() {
		return negociator;
	}

	public void setNegociator(String negociator) {
		this.negociator = negociator;
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

	public List<String> getSuppliesSpecials() {
		return suppliesSpecials;
	}

	public void setSuppliesSpecials(List<String> suppliesSpecials) {
		this.suppliesSpecials = suppliesSpecials;
	}
    
}
