package com.nutresa.exemplary_provider.dtl.queries;

import java.util.List;
import java.util.Map;

import com.google.gson.annotations.Expose;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.SupplierDTO;

public class InformationFromSupplier {
    @Expose
    private List<SupplierDTO> suppliers;
    @Expose
    private List<DTO> suppliersByCall;
    @Expose
    private List<Object> years;
    @Expose
    private Map<String, List<DTO>> masters;
    
    public List<SupplierDTO> getSuppliers() {
        return this.suppliers;
    }
    
    public void setSuppliers(List<SupplierDTO> suppliers) {
        this.suppliers = suppliers;
    }

    public Map<String, List<DTO>> getMasters() {
        return this.masters;
    }
  
    public void setMasters(Map<String, List<DTO>> masters) {
        this.masters = masters;
    }

    public void setSuppliersByCall(List<DTO> suppliersByCall) {
        this.suppliersByCall = suppliersByCall;
    }

    public List<DTO> getSuppliersByCall() {
        return suppliersByCall;
    }

    public void setYears(List<Object> listYears) {
        this.years = listYears;
    }

    public List<Object> getYears() {
        return years;
    }
}
