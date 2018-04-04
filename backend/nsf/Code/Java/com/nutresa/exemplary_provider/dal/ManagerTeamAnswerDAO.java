package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.ManagerTeamAnswerDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ManagerTeamAnswerDAO extends GenericDAO<ManagerTeamAnswerDTO> {
    public ManagerTeamAnswerDAO() {
        super(ManagerTeamAnswerDTO.class);
    }

    public List<ManagerTeamAnswerDTO> getAnswersOfSupplier(String idSupplierByCall) throws HandlerGenericException {
        List<ManagerTeamAnswerDTO> answersOfSupplier = new ArrayList<ManagerTeamAnswerDTO>();
        View view = getDatabase().getView("vwManagerTeamAnswersByIdSupplierByCallAndWhoEvaluate");
        DocumentCollection documents = view.getAllDocumentsByKey(idSupplierByCall, true);
        if (null != documents) {
            for (Document document : documents) {
                answersOfSupplier.add(castDocument(document));
            }
        }

        return answersOfSupplier;
    }

}
