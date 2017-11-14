package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class SurveyDTO {
    @Expose
    private String id;
    @Expose
    private String idCategory;
    @Expose
    private CategoryDTO category;
    @Expose
    private String idSizeCompany;
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

    public String getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(String idCategory) {
        this.idCategory = idCategory;
    }

    public String getIdSizeCompany() {
        return idSizeCompany;
    }

    public void setIdSizeCompany(String idSizeCompany) {
        this.idSizeCompany = idSizeCompany;
    }

}
