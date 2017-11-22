package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

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
            View currentView = getDatabase().getView("vwQuestionsBySurvey");
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
        try {
            View currentView = getDatabase().getView("vwQuestionsBySurvey");
            ViewNavigator navigatorDimension = currentView.createViewNavFromCategory(idSurvey);
            ViewEntry entryDimension = navigatorDimension.getFirst();
            ViewEntry entryCriterions;
            ViewNavigator navigatorCriterions;
            do {
                if (entryDimension.isCategory()) {
                    if (idDimension.equals((String) entryDimension.getColumnValues().elementAt(1))) {
                        entryDimension = navigatorDimension.getNextCategory();
                        navigatorCriterions = currentView.createViewNavFrom(entryDimension);
                        entryCriterions = navigatorCriterions.getFirst();
                        while (entryCriterions != null) {
                            response.add((String) entryCriterions.getColumnValues().elementAt(2));
                            entryCriterions = navigatorCriterions.getNextSibling();
                        }
                        entryDimension = null;
                    }
                }
                entryDimension = navigatorDimension.getNextSibling();
            } while (entryDimension != null);

        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

}
