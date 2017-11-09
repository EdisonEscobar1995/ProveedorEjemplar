package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class CityDTO extends ReferenceDTO {
    @Expose
    private String idDepartment;

    public String getIdDepartment() {
        return idDepartment;
    }

    public void setIdDepartment(String idDepartment) {
        this.idDepartment = idDepartment;
    }

}
