package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierByCallDAO extends GenericDAO<SupplierByCallDTO> {
    public SupplierByCallDAO() {
        super(SupplierByCallDTO.class);
    }

    public List<SupplierByCallDTO> getBySupplier(String idSupplier) throws HandlerGenericException {
        List<SupplierByCallDTO> callsBySupplier = new ArrayList<SupplierByCallDTO>();
        try {
            View currentView = getDatabase().getView("vwSupplierByCallsSupplier");
            DocumentCollection documents = currentView.getAllDocumentsByKey(idSupplier, true);
            for (Document document : documents) {
                callsBySupplier.add(castDocument(document));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
        return callsBySupplier;
    }

}
