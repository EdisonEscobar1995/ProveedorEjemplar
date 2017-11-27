package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.AnswerDAO;
import com.nutresa.exemplary_provider.dtl.AnswerDTO;
import com.nutresa.exemplary_provider.dtl.OptionDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AnswerBLO extends GenericBLO<OptionDTO, AnswerDAO> {

    public AnswerBLO() {
        super(AnswerDAO.class);
    }

    public AnswerDTO deleteAnswers(AnswerDTO answer) throws HandlerGenericException {
        AnswerDAO answerDAO = new AnswerDAO();
        answerDAO.deleteBySupplier(answer.getIdSupplierByCall());
        return null;
    }

}
