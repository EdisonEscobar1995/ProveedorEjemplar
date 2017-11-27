package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.AnswerDAO;
import com.nutresa.exemplary_provider.dtl.OptionDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AnswerBLO extends GenericBLO<OptionDTO, AnswerDAO> {

    public AnswerBLO() {
        super(AnswerDAO.class);
    }

    public void deleteAnswers(String idSupplierByCall) throws HandlerGenericException {
        AnswerDAO answerDAO = new AnswerDAO();
        answerDAO.deleteBySupplier(idSupplierByCall);
    }

}
