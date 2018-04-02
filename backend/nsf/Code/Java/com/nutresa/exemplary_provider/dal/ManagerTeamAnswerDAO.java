package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.ManagerTeamAnswerDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ManagerTeamAnswerDAO extends GenericDAO<ManagerTeamAnswerDTO> {
    public ManagerTeamAnswerDAO() {
        super(ManagerTeamAnswerDTO.class);
    }

    public ManagerTeamAnswerDTO getManagerTeamAnswer(String idSupplierByCall, String nameManagerTeamMember)
            throws HandlerGenericException {
        List<String> filter = new ArrayList<String>();
        filter.add(idSupplierByCall);
        filter.add(nameManagerTeamMember);
        ManagerTeamAnswerDTO evaluationScale = new ManagerTeamAnswerDTO();
        View currentView = getDatabase().getView("vwManagerTeamAnswersByIdSupplierByCallAndIdUser");
        Document document = currentView.getFirstDocumentByKey(filter, true);

        if (null != document) {
            evaluationScale = castDocument(document);
        }

        return evaluationScale;
    }
}
