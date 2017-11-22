package com.nutresa.exemplary_provider.dtl;

import java.util.List;

import com.google.gson.annotations.Expose;

public class QuestionsBySurveyDTO {
    @Expose
    private List<CriterionDTO> criterion;
    @Expose
    private List<QuestionDTO> questions;

    public List<CriterionDTO> getCriterion() {
        return criterion;
    }

    public void setCriterion(List<CriterionDTO> criterion) {
        this.criterion = criterion;
    }

    public List<QuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDTO> questions) {
        this.questions = questions;
    }

}
