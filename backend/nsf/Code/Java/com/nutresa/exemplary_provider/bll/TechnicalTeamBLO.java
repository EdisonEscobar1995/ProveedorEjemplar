package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.SupplierByCallDAO;
import com.nutresa.exemplary_provider.dal.TechnicalTeamDAO;
import com.nutresa.exemplary_provider.dal.UserDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.TechnicalTeamDTO;
import com.nutresa.exemplary_provider.dtl.UserDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TechnicalTeamBLO extends GenericBLO<TechnicalTeamDTO, TechnicalTeamDAO> {
    public TechnicalTeamBLO() {
        super(TechnicalTeamDAO.class);
    }

    protected List<TechnicalTeamDTO> getMembersByEspecificFeactures(Map<String, String> especificFeacture)
            throws HandlerGenericException {
        List<String> filter = new ArrayList<String>();
        filter.add(especificFeacture.get("USER"));
        filter.add(especificFeacture.get("SUPPLY"));
        filter.add(especificFeacture.get("CATEGORY"));
        filter.add(especificFeacture.get("COUNTRY"));
        TechnicalTeamDAO technicalTeamDAO = new TechnicalTeamDAO();
        return technicalTeamDAO.getMembersByEspecificFeactures(filter);
    }

    @Override
    public TechnicalTeamDTO save(TechnicalTeamDTO technicalTeam) throws HandlerGenericException {
        TechnicalTeamDTO response = null;

        if (null != technicalTeam.getIdSupply() && null != technicalTeam.getIdCategory()
                && null != technicalTeam.getIdCountry() && null != technicalTeam.getIdUser()) {
            if (existTechnicalTeam(technicalTeam)) {
                throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_EXISTS.toString());
            } else if (existWhoEvaluateOfTechnical(technicalTeam.getId())) {
            	throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_MULTI_CONNECTED.toString());
            } else {
                response = super.save(technicalTeam);
            }
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.UNEXPECTED_VALUE.toString());
        }

        return response;
    }
    
    private boolean existTechnicalTeam(TechnicalTeamDTO technicalTeam) throws HandlerGenericException {
        boolean existItem = false;

        List<String> filter = new ArrayList<String>();
        filter.add(technicalTeam.getIdUser());
        filter.add(technicalTeam.getIdSupply());
        filter.add(technicalTeam.getIdCategory());
        filter.add(technicalTeam.getIdCountry());

        String idTechnicalTeam = technicalTeam.getId();
        String temporalIdRecord = technicalTeam.getIdUser().concat(
                technicalTeam.getIdSupply().concat(technicalTeam.getIdCategory().concat(technicalTeam.getIdCountry())));

        TechnicalTeamDAO technicalTeamDAO = new TechnicalTeamDAO();
        List<TechnicalTeamDTO> technicalTeamMember = technicalTeamDAO.getMembersByEspecificFeactures(filter);
        if (!technicalTeamMember.isEmpty()) {
            TechnicalTeamDTO memberExisting = technicalTeamMember.get(0);

            String idTechnicalTeamExisting = memberExisting.getId();
            String temporalIdRecordExisting = memberExisting.getIdUser().concat(
                    memberExisting.getIdSupply().concat(
                            memberExisting.getIdCategory().concat(memberExisting.getIdCountry())));

            if ((null == idTechnicalTeam || idTechnicalTeam.isEmpty())
                    && (null != temporalIdRecordExisting && temporalIdRecord.equals(temporalIdRecordExisting))) {
                existItem = true;
            } else {
                if (null != idTechnicalTeam && null != idTechnicalTeamExisting
                        && !idTechnicalTeam.equals(idTechnicalTeamExisting)
                        && temporalIdRecord.equals(temporalIdRecordExisting)) {
                    existItem = true;
                }
            }
        }

        return existItem;
    }

    protected List<TechnicalTeamDTO> getMemberInTeamByUserInSession() throws HandlerGenericException {
        TechnicalTeamDAO technicalTeamDAO = new TechnicalTeamDAO();
        return technicalTeamDAO.getMemberInTeamByUserInSession();
    }
    
    @Override
    public boolean delete(Map<String, String> parameters, Boolean checkRelationship) throws HandlerGenericException {
    	boolean response = true;
    	if (existWhoEvaluateOfTechnical(parameters.get("id"))) {
			response = false;
			throw new HandlerGenericException(HandlerGenericExceptionTypes.DOCUMENT_MULTI_CONNECTED.toString());
		}
    	
    	return response;
    }
    
    public boolean existWhoEvaluateOfTechnical(String id) throws HandlerGenericException {
        boolean existItem = false;
        
        UserDTO user = null;
    	TechnicalTeamDTO technicalTeam = null;
    	TechnicalTeamDAO technicalTeamDAO = new TechnicalTeamDAO();
    	
    	technicalTeam = technicalTeamDAO.getTechnicalTeamById(id);
    	
    	if (null != technicalTeam.getIdUser()) {    		
    		UserDAO userDAO = new UserDAO();
    		user = userDAO.getUsersById(technicalTeam.getIdUser());
    		
    		StateBLO stateBLO = new StateBLO();
            SupplierByCallDAO supplierByCall = new SupplierByCallDAO();
                    
            List<String> filter = new ArrayList<String>();
            filter.add(stateBLO.getStateByShortName(SurveyStates.TECHNICAL_TEAM.toString()).getId());
            filter.add(user.getName());

            List<SupplierByCallDTO> existingSuppliers = supplierByCall.getByProperties(filter);
            
            if (!existingSuppliers.isEmpty()) {
            	existItem = true;
            }
    	}
    	
        return existItem;
    }

}