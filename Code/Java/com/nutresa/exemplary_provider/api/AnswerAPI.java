package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.AnswerBLO;
import com.nutresa.exemplary_provider.dtl.AnswerDTO;

public class AnswerAPI extends GenericAPI<AnswerDTO, AnswerBLO> {

    public AnswerAPI() {
        super(AnswerDTO.class, AnswerBLO.class);
    }

}
