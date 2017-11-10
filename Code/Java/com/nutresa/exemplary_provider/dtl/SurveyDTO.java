package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class SurveyDTO {
    @Expose
    private String id;
    @Expose
    private CategoryDTO category;
    @Expose
    private CompanySizeDTO sizeCompany;
    @Expose
    private List<QuestionDTO> question;
    
    public CompanySizeDTO getSizeCompany() {
        return sizeCompany;
    }
    
    public void setSizeCompany(CompanySizeDTO sizeCompany) {
        this.sizeCompany = sizeCompany;
    }
    
    public List<QuestionDTO> getQuestion() {
        return question;
    }
    
    public void setQuestion(List<QuestionDTO> question) {
        this.question = question;
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
