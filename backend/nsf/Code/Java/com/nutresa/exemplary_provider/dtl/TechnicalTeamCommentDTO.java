package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class TechnicalTeamCommentDTO extends AnswerByTechnicalTeam {
    @Expose
    private String comment;

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

}
