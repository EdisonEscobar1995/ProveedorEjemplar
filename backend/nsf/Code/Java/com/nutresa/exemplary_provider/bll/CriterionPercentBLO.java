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