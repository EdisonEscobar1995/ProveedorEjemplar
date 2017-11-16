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
    private String idCompanySize;
    @Expose
    private CompanySizeDTO companySize;
    @Expose
    private List<QuestionDTO> question;

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
        return idCompanySize;
    }

    public void setIdSizeCompany(String idCompanySize) {
        this.idCompanySize = idCompanySize;
    }

    public void setCompanySize(CompanySizeDTO companySize) {
        this.companySize = companySize;
    }

    public CompanySizeDTO getCompanySize() {
        return companySize;
    }

    public String getIdCompanySize() {
        return idCompanySize;
    }

    public void setIdCompanySize(String idCompanySize) {
        this.idCompanySize = idCompanySize;
    }

}
