package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class RolDTO extends MasterDTO {
    @Expose
    private String shortName;

    public String getShortName() {
        return shortName;
    }

}
