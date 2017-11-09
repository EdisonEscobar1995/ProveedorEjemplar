package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class SurveyDTO {
    private static final String FORM = "frSurvey";
    @Expose
    private String id;
    @Expose
    private CategoryDTO category;
    @Expose
    private SizeCompanyDTO sizeCompany;
    @Expose
    private List<QuestionDTO> question;
    
    public SizeCompanyDTO getSizeCompany() {
        return sizeCompany;
    }
    
    public void setSizeCompany(SizeCompanyDTO sizeCompany) {
        this.sizeCompany = sizeCompany;
    }
    
    public List<QuestionDTO> getQuestion() {
        return question;
    }
    
    public void setQuestion(List<QuestionDTO> question) {
        this.question = question;
    }
    
    public String getForm() {
        return FORM;
    }
    
    public String getId() {
        return id;
    }
    
    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

}
