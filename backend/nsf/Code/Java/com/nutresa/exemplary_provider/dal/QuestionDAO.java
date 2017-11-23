package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openntf.domino.View;
import org.openntf.domino.ViewEntry;
import org.openntf.domino.ViewNavigator;

import com.nutresa.exemplary_provider.dtl.QuestionDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class QuestionDAO extends GenericDAO<QuestionDTO> {

    public QuestionDAO() {
        super(QuestionDTO.class);
    }

    public List<String> getDimensionsBySurvey(String idSurvey) throws HandlerGenericException {
        List<String> response = new ArrayList<String>();
        try {
            View currentView = getDatabase().getView("vwDimensionsAndCriterionsBySurvey");
            ViewNavigator navigator = currentView.createViewNavFromCategory(idSurvey);
            ViewEntry entry = navigator.getFirst();
            while (entry != null) {
                if (entry.isCategory()) {
                    response.add((String) entry.getColumnValues().elementAt(1));
                }
                entry = navigator.getNextSibling();
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    public List<String> getCriterionsBySurvey(String idSurvey, String idDimension) throws HandlerGenericException {
        List<String> response = new ArrayList<String>();
        boolean flag = true;
        try {
            View currentView = getDatabase().getView("vwDimensionsAndCriterionsBySurvey");
            ViewNavigator navigatorDimension = currentView.createViewNavFromCategory(idSurvey);
            ViewEntry entryDimension = navigatorDimension.getFirst();
            ViewEntry entryCriterions;
            ViewNavigator navigatorCriterions;
            do {
                if (entryDimension.isCategory()
                        && idDimension.equals((String) entryDimension.getColumnValues().elementAt(1))) {
                    entryDimension = navigatorDimension.getNextCategory();
                    navigatorCriterions = currentView.createViewNavFrom(entryDimension);
                    entryCriterions = navigatorCriterions.getFirst();
                    while (entryCriterions != null) {
                        response.add((String) entryCriterions.getColumnValues().elementAt(2));
                        entryCriterions = navigatorCriterions.getNextSibling();
                    }
                    flag = false;
                }
                entryDimension = navigatorDimension.getNextSibling();
            } while (entryDimension != null && flag);

        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    public List<QuestionDTO> getQuestionsBySurvey(String idSurvey, String idDimension) throws HandlerGenericException {
        List<QuestionDTO> response = new ArrayList<QuestionDTO>();
        OptionDAO optionDAO = new OptionDAO();
        try {
            Map<String, String> filter = new HashMap<String, String>();
            filter.put("idSurvey", idSurvey);
            filter.put("idDimension", idDimension);
            response = getAllBy(filter);
            for (QuestionDTO question : response) {
                question.setOptions(optionDAO.getAllBy("idQuestion", question.getId()));
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

}
