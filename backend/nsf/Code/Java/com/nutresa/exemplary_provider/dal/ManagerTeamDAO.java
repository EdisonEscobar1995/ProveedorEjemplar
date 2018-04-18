package com.nutresa.exemplary_provider.dal;

import java.util.List;
import java.util.ArrayList;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.ManagerTeamDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ManagerTeamDAO extends GenericDAO<ManagerTeamDTO> {

    public ManagerTeamDAO() {
        super(ManagerTeamDTO.class);
        entityView = "vwManagerTeam";
    }

    public List<ManagerTeamDTO> getManagerTeamMembersInCall(String idCall) throws HandlerGenericException {
        List<ManagerTeamDTO> response = new ArrayList<ManagerTeamDTO>();
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
