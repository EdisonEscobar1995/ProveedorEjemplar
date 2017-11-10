package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class QuestionDTO {
    private static final String FORM = "frQuestion";
    @Expose
    private String id;
    @Expose
    private String idCriterion;
    @Expose
    private String wording;
    @Expose
    private boolean requireAttached;
    @Expose
    private String dependOf;
    @Expose
    private String helpText;
    @Expose
    private List<AnswerDTO> answer;

    public String getId() {
        return id;
    }

    public String getWording() {
        return wording;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public boolean isRequireAttached() {
        return requireAttached;
    }

    public void setRequireAttached(boolean requireAttached) {
        this.requireAttached = requireAttached;
    }

    public String getDependOf() {
        return dependOf;
    }

    public void setDependOf(String dependOf) {
        this.dependOf = dependOf;
    }

    public String getHelpText() {
        return helpText;
    }

    public void setHelpText(String helpText) {
        this.helpText = helpText;
    }

    public List<AnswerDTO> getAnswer() {
        return answer;
    }

    public void setAnswer(List<AnswerDTO> answer) {
        this.answer = answer;
    }

    public String getIdCriterion() {
        return idCriterion;
    }

    public void setIdCriterion(String idCriterion) {
        this.idCriterion = idCriterion;
    }

    public String getForm() {
        return FORM;
    }

}
