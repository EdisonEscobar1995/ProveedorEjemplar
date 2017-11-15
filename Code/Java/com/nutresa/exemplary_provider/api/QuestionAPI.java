package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.QuestionBLO;
import com.nutresa.exemplary_provider.dtl.QuestionDTO;

public class QuestionAPI extends GenericAPI<QuestionDTO, QuestionBLO> {

    public QuestionAPI() {
        super(QuestionDTO.class, QuestionBLO.class);
    }

}