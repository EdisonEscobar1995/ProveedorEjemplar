package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class SupplierByCallSpecialDTO extends SupplierByCallDTO {
    @Expose
    private String idSupplySpecial;
    @Expose
    private String supply;
    
	public SupplierByCallSpecialDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public String getIdSupplySpecial() {
		return idSupplySpecial;
	}
	public void setIdSupplySpecial(String idSupplySpecial) {
		this.idSupplySpecial = idSupplySpecial;
	}
	public String getSupply() {
		return supply;
	}
	public void setSupply(String supply) {
		this.supply = supply;
	}    
}
