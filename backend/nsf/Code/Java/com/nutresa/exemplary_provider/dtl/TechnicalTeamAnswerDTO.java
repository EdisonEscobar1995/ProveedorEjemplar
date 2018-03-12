package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class TechnicalTeamAnswerDTO extends AnswerByTechnicalTeam {
    @Expose
    private String idItem;
    @Expose
    private String idEvaluationScale;

    public String getIdItem() {
        return idItem;
    }

    public void setIdItem(String idItem) {
        this.idItem = idItem;
    }

    public String getIdEvaluationScale() {
        return idEvaluationScale;
    }

    public void setIdEvaluationScale(String idEvaluationScale) {
        this.idEvaluationScale = idEvaluationScale;
    }

}
