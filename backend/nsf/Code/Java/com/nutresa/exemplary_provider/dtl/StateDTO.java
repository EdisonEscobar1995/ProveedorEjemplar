package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class StateDTO extends MasterDTO {
    @Expose
    private String shortName;

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getShortName() {
        return shortName;
    }

}
