package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.CompanyTypeDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CompanyTypeDAO extends GenericDAO<CompanyTypeDTO> {

    public CompanyTypeDAO() {
        super(CompanyTypeDTO.class);
        loadTranslator();
    }

    public List<CompanyTypeDTO> getByProperties(List<String> filter) throws HandlerGenericException {
        List<CompanyTypeDTO> company = new ArrayList<CompanyTypeDTO>();
        View currentView = getDatabase().getView("vwCompanyTypeByName");
        DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
        if (null != documents) {
            for (Document document : documents) {
                company.add(castDocument(document));
            }
        }

        return company;
    }

}
