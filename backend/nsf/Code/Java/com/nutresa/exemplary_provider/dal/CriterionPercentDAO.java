package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.CriterionPercentDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CriterionPercentDAO extends GenericDAO<CriterionPercentDTO> {

    public CriterionPercentDAO() {
        super(CriterionPercentDTO.class);
        loadTranslator();
    }
    
    public List<CriterionPercentDTO> getCriterionsPercentBySurvey(String idSurvey)
    throws HandlerGenericException {
		List<CriterionPercentDTO> response = new ArrayList<CriterionPercentDTO>();
		try {
		    View currentView = getDatabase().getView("vwCriterionPercentBySurvey");
		    DocumentCollection documents = currentView.getAllDocumentsByKey(idSurvey, true);
		    for (Document document : documents) {
		        CriterionPercentDTO criterionPercent = castDocument(document);
		        response.add(criterionPercent);
		    }
		} catch (Exception exception) {
		    throw new HandlerGenericException(exception);
		}
		
		return response;
	}
    
    public CriterionPercentDTO getCriterionPercentById(String idSurvey, String id, String vista)
    	throws HandlerGenericException {
		CriterionPercentDTO response = new CriterionPercentDTO();
		try {
			ArrayList<String> filter = new ArrayList<String>(2);
	        filter.add(id);
	        filter.add(idSurvey);
	    	View view = getDatabase().getView(vista);
	    	Document document = view.getFirstDocumentByKey(filter, true);
	    	if (null != document) {
		        response = castDocument(document);
		    }
		} catch (Exception exception) {
		    throw new HandlerGenericException(exception);
		}
		
		return response;
	}
    
    public void removePercentsBySurvey(String idSurvey) throws HandlerGenericException {
    	View view = getDatabase().getView("vwCriterionPercentBySurvey");
    	DocumentCollection dc = view.getAllDocumentsByKey(idSurvey);
    	if (dc.getCount() > 0) {
    		dc.removeAll(true);
    	}
    }
    
    public boolean hasPercentSurvey(String idSurvey, String id, String vista)
    	throws HandlerGenericException {
    	boolean response = false;
    	ArrayList<String> filter = new ArrayList<String>(2);
        filter.add(id);
        filter.add(idSurvey);
    	View view = getDatabase().getView(vista);
    	DocumentCollection dc = view.getAllDocumentsByKey(filter, true);
    	if (dc.getCount() > 0) {
    		response = true;
    	}
    	
    	return response;
    }
    
}
