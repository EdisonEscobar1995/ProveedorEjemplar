package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.AnswerDAO;
import com.nutresa.exemplary_provider.dtl.AnswerDTO;

class AnswerBLO extends GenericBLO<AnswerDTO, AnswerDAO> {

    public AnswerBLO() {
        super(AnswerDAO.class);
    }

}
