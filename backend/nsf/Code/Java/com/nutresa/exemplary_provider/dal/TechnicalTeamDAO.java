package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.TechnicalTeamDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TechnicalTeamDAO extends GenericDAO<TechnicalTeamDTO> {
    public TechnicalTeamDAO() {
        super(TechnicalTeamDTO.class);
    }

    public List<TechnicalTeamDTO> getMembersByEspecificFeactures(List<String> filterEspecificFeactures)
            throws HandlerGenericException {
        List<TechnicalTeamDTO> membersTechnicalTeam = new ArrayList<TechnicalTeamDTO>();
        View currentView = getDatabase().getView("vwTechnicalTeamByProperties");
        DocumentCollection documents = currentView.getAllDocumentsByKey(filterEspecificFeactures, true);
        if (null != documents) {
            for (Document document : documents) {
                membersTechnicalTeam.add(castDocument(document));
            }
        }

        return membersTechnicalTeam;
    }
}
