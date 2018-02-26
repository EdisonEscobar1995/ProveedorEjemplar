package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class ItemDTO extends MasterDTO {
    @Expose
    private String idService;

    public void setIdService(String idService) {
        this.idService = idService;
    }

    public String getIdService() {
        return idService;
    }

}
