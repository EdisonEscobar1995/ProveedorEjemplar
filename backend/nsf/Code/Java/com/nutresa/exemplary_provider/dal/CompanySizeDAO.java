package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.CompanySizeDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CompanySizeDAO extends GenericDAO<CompanySizeDTO> {

    public CompanySizeDAO() {
        super(CompanySizeDTO.class);
        loadTranslator();
    }
    
    public List<CompanySizeDTO> getByProperties(List<String> filter) throws HandlerGenericException {
        List<CompanySizeDTO> company = new ArrayList<CompanySizeDTO>();
        View currentView = getDatabase().getView("vwCompanySizeByName");
        DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
        if (null != documents) {
            for (Document document : documents) {
                company.add(castDocument(document));
            }
        }

        return company;
    }

}
