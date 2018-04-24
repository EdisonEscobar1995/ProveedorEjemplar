package com.nutresa.exemplary_provider.dal;

import org.openntf.domino.Document;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.SystemDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SystemDAO extends GenericDAO<SystemDTO> {

    public SystemDAO() {
        super(SystemDTO.class);
        loadTranslator();
    }

    public SystemDTO getConfiguration() throws HandlerGenericException {
        SystemDTO system = null;
        View view = getDatabase().getView(this.entityView);
        Document document = view.getFirstDocumentByKey(this.entityForm, true);
        if (null != document) {
            system = castDocument(document);
        }

        return system;
    }
}
