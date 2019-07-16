package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.TechnicalTeamDTO;
import com.nutresa.exemplary_provider.dal.UserDAO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TechnicalTeamDAO extends GenericDAO<TechnicalTeamDTO> {
    public TechnicalTeamDAO() {
        super(TechnicalTeamDTO.class);
        entityView = "vwTechnicalTeams";
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

    public List<TechnicalTeamDTO> getMemberInTeamByUserInSession() throws HandlerGenericException {
        List<TechnicalTeamDTO> membersInTeam = new ArrayList<TechnicalTeamDTO>();
        UserDAO userDAO = new UserDAO();
        View currentView = getDatabase().getView("vwTechnicalTeamByIdUser");
        DocumentCollection documents = currentView.getAllDocumentsByKey(userDAO.getUserInSession().getId(), true);
        if (null != documents) {
            for (Document document : documents) {
                membersInTeam.add(castDocument(document));
            }
        }

        return membersInTeam;
    }
    
    /**
     * Busca un registro del comite tecnico por el id
     * 
     * @param id
     *            Id a buscar
     * @return Registro encontrado
     * @throws HandlerGenericException
     */
    public TechnicalTeamDTO getTechnicalTeamById(String id) throws HandlerGenericException {
    	TechnicalTeamDTO technicalTeam = new TechnicalTeamDTO();
        View currentView = getDatabase().getView("vwTechnicalTeams");
        Document document = currentView.getFirstDocumentByKey(id, true);
        if (null != document) {
        	technicalTeam = castDocument(document);
        }

        return technicalTeam;
    }
    
}
