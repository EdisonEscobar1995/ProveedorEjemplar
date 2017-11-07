package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class SurveyDTO {
    private final String form = "frSurvey";
    @Expose
    private String id;
    @Expose
    private String idCategory;
    // Si la sub categoría ya tiene una categoría, para que necesita la categoría?
    @Expose
    private String idSubCategory;
    @Expose
    private String sizeCompany;
    @Expose
    private List<QuestionDTO> question;
    
    public String getIdCategory() {
        return idCategory;
    }
    
    public void setIdCategory(String idCategory) {
        this.idCategory = idCategory;
    }
    
    public String getIdSubCategory() {
        return idSubCategory;
    }
    
    public void setIdSubCategory(String idSubCategory) {
        this.idSubCategory = idSubCategory;
    }
    
    public String getSizeCompany() {
        return sizeCompany;
    }
    
    public void setSizeCompany(String sizeCompany) {
        this.sizeCompany = sizeCompany;
    }
    
    public List<QuestionDTO> getQuestion() {
        return question;
    }
    
    public void setQuestion(List<QuestionDTO> question) {
        this.question = question;
    }
    
    public String getForm() {
        return form;
    }
    
    public String getId() {
        return id;
    }
    
}
