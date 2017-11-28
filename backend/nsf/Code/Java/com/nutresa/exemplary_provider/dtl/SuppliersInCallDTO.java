package com.nutresa.exemplary_provider.dtl;

import java.util.List;
import java.util.Map;

import com.google.gson.annotations.Expose;

public class SuppliersInCallDTO {

    @Expose
    List<DTO> suppliers;
    
    @Expose
    Map<String, List<DTO>> masters;

    public List<DTO> getSuppliers() {
        return suppliers;
    }

    public void setSuppliers(List<DTO> suppliers) {
        this.suppliers = suppliers;
    }

    public Map<String, List<DTO>> getMasters() {
        return masters;
    }

    public void setMasters(Map<String, List<DTO>> masters) {
        this.masters = masters;
    }
}
