package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class ServiceDTO extends MasterDTO {
    @Expose
    private String helpText;

    public void setHelpText(String helpText) {
        this.helpText = helpText;
    }

    public String getHelpText() {
        return helpText;
    }

}
