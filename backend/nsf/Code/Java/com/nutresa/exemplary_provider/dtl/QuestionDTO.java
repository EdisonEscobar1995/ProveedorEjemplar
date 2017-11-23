package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class QuestionDTO {
    @Expose
    private String id;
    @Expose
    private String idDimension;
    @Expose
    private String idCriterion;
    @Expose
    private String wording;
    @Expose
    private String type;
    @Expose
    private boolean requireAttachment;
    @Expose
    private List<OptionDTO> options;
    @Expose
    private String helpText;
    @Expose
    private List<String> idsSurvey;
    @Expose
    private List<String> dependOfAnswerIds;
    @Expose
    private QuestionDTO dependOfQuestion;

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
        return requireAttachment;
    }

    public void setRequireAttached(boolean requireAttached) {
        this.requireAttachment = requireAttached;
    }

    public String getHelpText() {
        return helpText;
    }

    public void setHelpText(String helpText) {
        this.helpText = helpText;
    }

    public List<OptionDTO> getAnswer() {
        return options;
    }

    public void setAnswer(List<OptionDTO> answers) {
        this.options = answers;
    }

    public String getIdCriterion() {
        return idCriterion;
    }

    public void setIdCriterion(String idCriterion) {
        this.idCriterion = idCriterion;
    }

    public QuestionDTO getDependOfQuestion() {
        return dependOfQuestion;
    }

    public void setDependOfQuestion(QuestionDTO dependOfQuestion) {
        this.dependOfQuestion = dependOfQuestion;
    }

    public List<String> getDependOfAnswers() {
        return dependOfAnswerIds;
    }

    public void setDependOfAnswers(List<String> dependOfAnswerIds) {
        this.dependOfAnswerIds = dependOfAnswerIds;
    }

    public void setIdDimension(String idDimension) {
        this.idDimension = idDimension;
    }

    public String getIdDimension() {
        return idDimension;
    }

    public boolean isRequireAttachment() {
        return requireAttachment;
    }

    public void setRequireAttachment(boolean requireAttachment) {
        this.requireAttachment = requireAttachment;
    }

    public List<OptionDTO> getOptions() {
        return options;
    }

    public void setOptions(List<OptionDTO> options) {
        this.options = options;
    }

    public List<String> getDependOfAnswerIds() {
        return dependOfAnswerIds;
    }

    public void setDependOfAnswerIds(List<String> dependOfAnswerIds) {
        this.dependOfAnswerIds = dependOfAnswerIds;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getIdsSurvey() {
        return idsSurvey;
    }

    public void setIdsSurvey(List<String> idsSurvey) {
        this.idsSurvey = idsSurvey;
    }

}
