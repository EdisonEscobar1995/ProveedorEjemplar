package com.nutresa.exemplary_provider.bll;

import java.util.List;

import com.nutresa.exemplary_provider.dal.AnswerDAO;
import com.nutresa.exemplary_provider.dtl.AnswerDTO;
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

    public AnswerDTO deleteMassive(AnswerDTO answer) throws HandlerGenericException {
        List<String> answerIds = answer.getIdsToDelete();
        AnswerDAO answerDAO = new AnswerDAO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        String idSupplierByCall = supplierByCallBLO.getCurrentCallBySupplier().getId();
        answerDAO.deleteMassive(answerIds, idSupplierByCall);
        return answer;
    }
}
