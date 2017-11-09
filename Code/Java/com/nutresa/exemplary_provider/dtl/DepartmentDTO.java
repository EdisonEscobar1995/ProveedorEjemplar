package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class DepartmentDTO {
    @Expose
    private String idCountry;

    public String getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(String idCountry) {
        this.idCountry = idCountry;
    }

}
