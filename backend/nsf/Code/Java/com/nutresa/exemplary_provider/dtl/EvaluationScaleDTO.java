package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class EvaluationScaleDTO extends MasterDTO {
    @Expose
    private String applyTo;
    @Expose
    private short score;
    @Expose
    private String helpText;

    public void setApplyTo(String applyTo) {
        this.applyTo = applyTo;
    }

    public String getApplyTo() {
        return applyTo;
    }

    public void setScore(short score) {
        this.score = score;
    }

    public short getScore() {
        return score;
    }

    public void setHelpText(String helpText) {
        this.helpText = helpText;
    }

    public String getHelpText() {
        return helpText;
    }
}