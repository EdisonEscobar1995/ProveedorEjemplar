package com.nutresa.exemplary_provider.dtl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.google.gson.annotations.Expose;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

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
    private List<String> idsSurvey;
    @Expose
    private String dependOfOptionId;
    @Expose
    private String dependOfQuestion;
    @Expose
    private List<AnswerDTO> answer;

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

    public List<String> getIdsSurvey() {
        return idsSurvey;
    }

    public void setIdsSurvey(List<String> idsSurvey) {
        this.idsSurvey = idsSurvey;
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

    public enum Field {
        CRITERION, DIMENSION;

        public static Field getType(String fieldName) {
            return Field.valueOf(fieldName.toUpperCase());
        }

    }

    public Map<String, String> identifyFieldsToFTSearch(Map<String, String> parameters) throws HandlerGenericException {
        Map<String, String> fields = new HashMap<String, String>();
        Iterator<String> iterator = parameters.keySet().iterator();
        while (iterator.hasNext()) {
            String valueInField = "";
            String key = iterator.next();
            switch (Field.getType(key)) {
            case CRITERION:
                valueInField = parameters.get(key);
                Common.setFieldsToFilterFTSearch(valueInField, "idCriterion", fields);
                break;
            case DIMENSION:
                valueInField = parameters.get(key);
                Common.setFieldsToFilterFTSearch(valueInField, "idDimension", fields);
                break;
            default:
                break;
            }
        }

        return fields;
    }

}
