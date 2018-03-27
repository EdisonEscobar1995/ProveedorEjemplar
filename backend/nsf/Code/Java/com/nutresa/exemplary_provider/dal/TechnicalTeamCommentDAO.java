package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.TechnicalTeamCommentDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TechnicalTeamCommentDAO extends GenericDAO<TechnicalTeamCommentDTO> {
    public TechnicalTeamCommentDAO() {
        super(TechnicalTeamCommentDTO.class);
    }

    public String getCommentBySupplierByCallAndIdService(String idSupplierByCall, String idService)
            throws HandlerGenericException {
        List<String> filter = new ArrayList<String>();
        TechnicalTeamCommentDTO technicalTeamComment = new TechnicalTeamCommentDTO();
        filter.add(idSupplierByCall);
        filter.add(idService);
        View view = getDatabase().getView("vwTechnicalTeamCommentByIdSupplierByCallAndIdService");
        Document document = view.getFirstDocumentByKey(filter, true);

        if (null != document) {
            technicalTeamComment = castDocument(document); 
        }

        return technicalTeamComment.getComment();
    }
}
