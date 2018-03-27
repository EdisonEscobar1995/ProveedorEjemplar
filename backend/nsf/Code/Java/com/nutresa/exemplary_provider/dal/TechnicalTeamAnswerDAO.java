package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.TechnicalTeamAnswerDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TechnicalTeamAnswerDAO extends GenericDAO<TechnicalTeamAnswerDTO> {
    public TechnicalTeamAnswerDAO() {
        super(TechnicalTeamAnswerDTO.class);
    }

    public TechnicalTeamAnswerDTO getTechnicalteamAnswer(String idSupplierByCall, String idService, String idItem)
            throws HandlerGenericException {
        List<String> filter = new ArrayList<String>();
        filter.add(idSupplierByCall);
        filter.add(idService);
        filter.add(idItem);
        TechnicalTeamAnswerDTO evaluationScale = new TechnicalTeamAnswerDTO();
        View currentView = getDatabase().getView("vwTechnicalTeamAnswerByIdSupplierByCallAndServiceAndItem");
        Document document = currentView.getFirstDocumentByKey(filter, true);

        if (null != document) {
            evaluationScale = castDocument(document);
        }

        return evaluationScale;
    }
}
