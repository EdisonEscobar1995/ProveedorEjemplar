package com.nutresa.exemplary_provider.dal;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierDAO extends GenericDAO<SupplierDTO> {

    public SupplierDAO() {
        super(SupplierDTO.class);
    }

    public SupplierDTO getSupplierInDirectory() throws HandlerGenericException {
        SupplierDTO supplier = null;
        try {
            View view = getDatabase().getView("vwSuppliersByFullName");
            Document document = view.getFirstDocumentByKey(getNameUserInSession(), true);
            supplier = castDocument(document);
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return supplier;
    }

}
