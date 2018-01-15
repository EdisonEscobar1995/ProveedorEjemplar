package com.nutresa.exemplary_provider.dal;

import java.util.HashMap;
import java.util.Map;

import org.openntf.domino.Database;
import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.SupplierDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplierDAO extends GenericDAO<SupplierDTO> {

    public SupplierDAO() {
        super(SupplierDTO.class);
    }

    public SupplierDTO getSupplierByFullName(String idSupplier) throws HandlerGenericException {
        SupplierDTO supplier = null;
        String fullName = "";
        try {
            if (null != idSupplier) {
                fullName = super.get(idSupplier).getFullName();
            } else {
                fullName = getNameUserInSession();
            }

            View view = getDatabase().getView("vwSuppliersByFullName");
            Document document = view.getFirstDocumentByKey(fullName, true);
            if (null != document) {
                supplier = castDocument(document);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return supplier;
    }

    public Map<String, String> getInformationInOtherDataBase(SupplierDTO supplier) throws HandlerGenericException {
        Map<String, String> response = new HashMap<String, String>();
        try {
            View vwSystem = getDatabase().getView("vwSystems");
            Document docSystem = vwSystem.getFirstDocumentByKey("frSystem", true);
            Database namesDatabase = getSession().getDatabase(docSystem.getItemValueString("namesPathApplication"));
            View vwNames = namesDatabase.getView("($Users)");
            Document docNames = vwNames.getFirstDocumentByKey(supplier.getFullName(), true);

            if (null != docNames) {
                response.put("password", docNames.getItemValueString("Comment"));
                response.put("userName", docNames.getItemValueString("shortName"));
            }

        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

}
