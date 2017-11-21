package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.QuestionBySurveyDAO;
import com.nutresa.exemplary_provider.dtl.QuestionBySurveyDTO;

public class QuestionBySurveyBLO extends GenericBLO<QuestionBySurveyDTO, QuestionBySurveyDAO> {
    public QuestionBySurveyBLO() {
        super(QuestionBySurveyDAO.class);
    }
}

