package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.CriterionPercentDAO;
import com.nutresa.exemplary_provider.dtl.CriterionPercentDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CriterionPercentBLO extends GenericBLO<CriterionPercentDTO, CriterionPercentDAO> {

    public CriterionPercentBLO() {
        super(CriterionPercentDAO.class);
    }

    @Override
    public CriterionPercentDTO save(CriterionPercentDTO criterionPercent) throws HandlerGenericException {
    	CriterionPercentDTO response = super.save(criterionPercent);
        return response;
    }
        
    public List<CriterionPercentDTO> getCriterionsPercentBySurvey(String idSurvey)
	    throws HandlerGenericException {
		CriterionPercentDAO CriterionPercentDAO = new CriterionPercentDAO();
		List<CriterionPercentDTO> criterionsPercent = null;
		try {
			criterionsPercent = CriterionPercentDAO.getCriterionsPercentBySurvey(idSurvey);
		} catch (HandlerGenericException exception) {
		    throw new HandlerGenericException(exception);
		}
		
		return criterionsPercent;
	}
    
    public CriterionPercentDTO getCriterionPercentById(String idSurvey, String id, String from)
	    throws HandlerGenericException {
		CriterionPercentDAO CriterionPercentDAO = new CriterionPercentDAO();
		CriterionPercentDTO criterionsPercent = null;
		try {
			String vista = "vwCriterionPercentByIdCriterion";
			if (from.equals("D")) {
				vista = "vwCriterionPercentByIdDimension";
			}
			criterionsPercent = CriterionPercentDAO.getCriterionPercentById(idSurvey, id, vista);
		} catch (HandlerGenericException exception) {
		    throw new HandlerGenericException(exception);
		}
		
		return criterionsPercent;
	}
    
    public boolean hasPercentSurvey(String idSurvey, List<CriterionPercentDTO> criterions)
    	throws HandlerGenericException {
    	boolean response = true;
    	CriterionPercentDAO criterionPercentDAO = new CriterionPercentDAO();
    	String vista = "";
    	String id = "";
    	int cont = 0;
    	for (CriterionPercentDTO percent : criterions) {
    		id = "";
    		vista = "";
			if (!percent.getIdCriterion().equals("")){
				vista = "vwCriterionPercentByIdCriterion";
				id = percent.getIdCriterion();
			} else if (!percent.getIdDimension().equals("")) {
				vista = "vwCriterionPercentByIdDimension";
				id = percent.getIdDimension();
			}
			if (id != "" && vista != "" && !criterionPercentDAO.hasPercentSurvey(idSurvey, id, vista)) {
				cont += 1;
			}
		}
    	
    	if (cont > 0) {
    		response = false;
    	}
    	
    	return response;
    }
    
    protected List<CriterionPercentDTO> associateToSurvey(List<CriterionPercentDTO> criterions, String idSurvey)
    	throws HandlerGenericException {
		List<CriterionPercentDTO> response = new ArrayList<CriterionPercentDTO>();
		CriterionPercentDAO criterionPercentDAO = new CriterionPercentDAO();
		CriterionPercentDTO criterionPercentDTO;
		
		criterionPercentDAO.removePercentsBySurvey(idSurvey);
		
		for (CriterionPercentDTO percent : criterions) {
			criterionPercentDTO = this.save(percent);
			if (null != criterionPercentDTO){
				response.add(criterionPercentDTO);
			}
		}
		return response;
	}

}