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

    public Map<String, String> getInformationInOtherDataBase(SupplierDTO supplier) throws HandlerGenericException {
        Map<String, String> response = new HashMap<String, String>();
        try {
            View vwSystem = getDatabase().getView("vwSystems");
            Document docSystem = vwSystem.getFirstDocumentByKey("frSystem", true);
            Database namesDatabase = getSession().getDatabase(docSystem.getItemValueString("namesPathApplication"));
            View vwNames = namesDatabase.getView("PeopleXcedula");
            Document docNames = vwNames.getFirstDocumentByKey(supplier.getNit(), true);
            if (null == docNames) {
                vwNames = namesDatabase.getView("($Users)");
                docNames = vwNames.getFirstDocumentByKey(supplier.getNit(), true);
            }

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
