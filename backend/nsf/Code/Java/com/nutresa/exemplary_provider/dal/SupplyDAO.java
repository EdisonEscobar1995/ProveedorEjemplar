package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.SupplyDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SupplyDAO extends GenericDAO<SupplyDTO> {
    public SupplyDAO() {
        super(SupplyDTO.class);
        this.entityView = "vwSupplies";
        loadTranslator();
    }

    public List<SupplyDTO> getByProperties(List<String> filter) throws HandlerGenericException {
        List<SupplyDTO> supplies = new ArrayList<SupplyDTO>();
        View currentView = getDatabase().getView("vwSuppliesByName");
        DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
        if (null != documents) {
            for (Document document : documents) {
                supplies.add(castDocument(document));
            }
        }

        return supplies;
    }

}
