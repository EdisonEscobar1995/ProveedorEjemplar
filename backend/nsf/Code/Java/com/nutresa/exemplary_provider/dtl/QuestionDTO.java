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
    private boolean required;
    @Expose
    private boolean requireAttachment;
    @Expose
    private List<OptionDTO> options;
    @Expose
    private String helpText;
    @Expose
    private String dependOfOptionId;
    @Expose
    private String dependOfQuestion;
    @Expose
    private List<AnswerDTO> answer;

    @Expose
    private String idCall;
    @Expose
    private List<String> idSurvey;

    public String getIdDimension() {
        return idDimension;
    }

    public void setIdDimension(String idDimension) {
        this.idDimension = idDimension;
    }

    public String getIdCriterion() {
        return idCriterion;
    }

    public void setIdCriterion(String idCriterion) {
        this.idCriterion = idCriterion;
    }

    public String getWording() {
        return wording;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public String getHelpText() {
        return helpText;
    }

    public void setHelpText(String helpText) {
        this.helpText = helpText;
    }

    public List<String> getIdSurvey() {
        return idSurvey;
    }

    public void setIdSurvey(List<String> idsSurvey) {
        this.idSurvey = idsSurvey;
    }

    public String getDependOfQuestion() {
        return dependOfQuestion;
    }

    public void setDependOfQuestion(String dependOfQuestion) {
        this.dependOfQuestion = dependOfQuestion;
    }

    public List<AnswerDTO> getAnswer() {
        return answer;
    }

    public void setAnswer(List<AnswerDTO> answer) {
        this.answer = answer;
    }

    public String getId() {
        return id;
    }

    public void setRequired(boolean required) {
        this.required = required;
    }

    public boolean isRequired() {
        return required;
    }

    public void setDependOfOptionId(String dependOfOptionId) {
        this.dependOfOptionId = dependOfOptionId;
    }

    public String getDependOfOptionId() {
        return dependOfOptionId;
    }

	public void setIdCall(String idCall) {
		this.idCall = idCall;
	}

	public String getIdCall() {
		return idCall;
	}

}
