package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public abstract class OptionDTO {
    @Expose
    private String id;
    @Expose
    private String wording;
    @Expose
    private short score;
    @Expose
    private String idQuestion;

    public String getId() {
        return id;
    }

    public String getWording() {
        return wording;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public short getScore() {
        return score;
    }

    public void setScore(short score) {
        this.score = score;
    }

    public String getIdQuestion() {
        return idQuestion;
    }

    public void setIdQuestion(String idQuestion) {
        this.idQuestion = idQuestion;
    }

}
