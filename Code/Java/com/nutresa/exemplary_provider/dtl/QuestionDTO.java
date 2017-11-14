package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class QuestionDTO {
    @Expose
    private String id;
    @Expose
    private String idDimension;
    @Expose
    private DimensionDTO dimension;
    @Expose
    private String idCriterion;
    @Expose
    private CriterionDTO criterion;
    @Expose
    private String wording;
    @Expose
    private boolean requireAttached;
    @Expose
    private List<String> dependOfAnswerIds;
    @Expose
    private QuestionDTO dependOfQuestion;
    @Expose
    private String helpText;
    @Expose
    private List<OptionDTO> answers;

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

    public String getHelpText() {
        return helpText;
    }

    public void setHelpText(String helpText) {
        this.helpText = helpText;
    }

    public List<OptionDTO> getAnswer() {
        return answers;
    }

    public void setAnswer(List<OptionDTO> answers) {
        this.answers = answers;
    }

    public String getIdDimension() {
        return idDimension;
    }

    public void setIdDimension(String idDimension) {
        this.idDimension = idDimension;
    }

    public DimensionDTO getDimension() {
        return dimension;
    }

    public void setDimension(DimensionDTO dimension) {
        this.dimension = dimension;
    }

    public String getIdCriterion() {
        return idCriterion;
    }

    public void setIdCriterion(String idCriterion) {
        this.idCriterion = idCriterion;
    }

    public CriterionDTO getCriterion() {
        return criterion;
    }

    public void setCriterion(CriterionDTO criterion) {
        this.criterion = criterion;
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

}
