package com.nutresa.exemplary_provider.dal;

import com.nutresa.exemplary_provider.dtl.QuestionBySurveyDTO;

public class QuestionBySurveyDAO extends GenericDAO<QuestionBySurveyDTO> {
    public QuestionBySurveyDAO() {
        super(QuestionBySurveyDTO.class);
        this.entityView = "vwQuestionsBySurvey";
    }
}

