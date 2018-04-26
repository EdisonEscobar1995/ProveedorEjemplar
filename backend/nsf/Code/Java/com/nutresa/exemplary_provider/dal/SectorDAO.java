package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.SectorDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SectorDAO extends GenericDAO<SectorDTO> {

    public SectorDAO() {
        super(SectorDTO.class);
        loadTranslator();
    }

    public List<SectorDTO> getByProperties(List<String> filter) throws HandlerGenericException {
        List<SectorDTO> sector = new ArrayList<SectorDTO>();
        View currentView = getDatabase().getView("vwSectorByName");
        DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
        if (null != documents) {
            for (Document document : documents) {
                sector.add(castDocument(document));
            }
        }

        return sector;
    }

}
