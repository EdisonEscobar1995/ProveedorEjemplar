package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class QuestionDTO {
    private final String form = "frQuestion";
    @Expose
    private String id;
    @Expose
    private String idDimension;
    // Si la dimensión ya está relacionada con el critrio, por qué la pregunta debe tener ambos?
    @Expose
    private String idCriterion;
    @Expose
    private String wording;
    @Expose
    private boolean requireAttached;
    @Expose
    private String answer;
    @Expose
    private short score;
    @Expose
    private String dependOf;
    @Expose
    private String helpText;
    @Expose
    private String idSubCategory;
    
    public String getId() {
        return id;
    }
    
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
    
    public boolean isRequireAttached() {
        return requireAttached;
    }
    
    public void setRequireAttached(boolean requireAttached) {
        this.requireAttached = requireAttached;
    }
    
    public String getAnswer() {
        return answer;
    }
    
    public void setAnswer(String answer) {
        this.answer = answer;
    }
    
    public short getScore() {
        return score;
    }
    
    public void setScore(short score) {
        this.score = score;
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
    
    public String getIdSubCategory() {
        return idSubCategory;
    }
    
    public void setIdSubCategory(String idSubCategory) {
        this.idSubCategory = idSubCategory;
    }

    public String getForm() {
        return form;
    }
    
}
