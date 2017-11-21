package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.QuestionBySurveyBLO;
import com.nutresa.exemplary_provider.dtl.QuestionBySurveyDTO;

public class QuestionBySurveyAPI extends GenericAPI<QuestionBySurveyDTO, QuestionBySurveyBLO> {
    public QuestionBySurveyAPI() {
        super(QuestionBySurveyDTO.class, QuestionBySurveyBLO.class);
    }
}
