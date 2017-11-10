package com.nutresa.exemplary_provider.dtl;

import com.google.gson.annotations.Expose;

public class QuestionDTO {
    @Expose
    private String id;
    @Expose
    private DimensionDTO dimension;
    @Expose
    private CriterionDTO criterion;
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
    
    public String getId() {
        return id;
    }
    
    public DimensionDTO getIdDimension() {
        return dimension;
    }
    
    public void setIdDimension(DimensionDTO idDimension) {
        this.dimension = idDimension;
    }
    
    public CriterionDTO getIdCriterion() {
        return criterion;
    }
    
    public void setIdCriterion(CriterionDTO idCriterion) {
        this.criterion = idCriterion;
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
    
}
