package com.nutresa.exemplary_provider.dal;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CallDAO extends GenericDAO<CallDTO> {

    public CallDAO() {
        super(CallDTO.class);
    }

    public CallDTO getByYear(String year) throws HandlerGenericException {
        CallDTO call = new CallDTO();
        View currentView = getDatabase().getView("vwCallsByYear");
        Document document = currentView.getFirstDocumentByKey(year, true);
        if (null != document) {
            call = castDocument(document);
        }

        return call;
    }

}
