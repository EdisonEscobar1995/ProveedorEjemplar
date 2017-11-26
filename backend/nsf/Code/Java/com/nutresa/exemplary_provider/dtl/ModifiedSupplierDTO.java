package com.nutresa.exemplary_provider.dtl;

import java.util.List;
import java.util.Map;

import com.google.gson.annotations.Expose;

public class ModifiedSupplierDTO {
    @Expose
    private List<SupplierDTO> Suppliers;
    @Expose
    private List<DTO> SuppliersByCall;
    @Expose
    private List<Object> Years;
    @Expose
    private Map<String, List<DTO>> Masters;
    
    public List<SupplierDTO> getSuppliers() {
        return this.Suppliers;
    }
    
    public void setSuppliers(List<SupplierDTO> suppliers) {
        this.Suppliers = suppliers;
    }

    public Map<String, List<DTO>> getMasters() {
        return this.Masters;
    }
  
    public void setMasters(Map<String, List<DTO>> masters) {
        this.Masters = masters;
    }

    public void setSuppliersByCall(List<DTO> suppliersByCall) {
        this.SuppliersByCall = suppliersByCall;
    }

    public List<DTO> getSuppliersByCall() {
        return SuppliersByCall;
    }

    public void setYears(List<Object> listYears) {
        this.Years = listYears;
    }

    public List<Object> getYears() {
        return Years;
    }
}
