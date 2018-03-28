package com.nutresa.exemplary_provider.dal;

import java.util.List;
import java.util.ArrayList;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.ManagerTeamByCallDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ManagerTeamByCallDAO extends GenericDAO<ManagerTeamByCallDTO> {

    public ManagerTeamByCallDAO() {
        super(ManagerTeamByCallDTO.class);
    }

    public List<ManagerTeamByCallDTO> getManagerTeamMembersInCall(String idCall) throws HandlerGenericException {
        List<ManagerTeamByCallDTO> response = new ArrayList<ManagerTeamByCallDTO>();
        View currentView = getDatabase().getView("vwManagerTeamByIdCall");
        DocumentCollection documents = currentView.getAllDocumentsByKey(idCall, true);
        if (documents != null) {
            for (Document document : documents) {
                response.add(castDocument(document));
            }
        }

        return response;
    }

}
