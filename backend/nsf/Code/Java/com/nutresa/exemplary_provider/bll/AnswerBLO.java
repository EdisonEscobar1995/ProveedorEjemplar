package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.AnswerDAO;
import com.nutresa.exemplary_provider.dtl.OptionDTO;

public class AnswerBLO extends GenericBLO<OptionDTO, AnswerDAO> {

    public AnswerBLO() {
        super(AnswerDAO.class);
    }

}
