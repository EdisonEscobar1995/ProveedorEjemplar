package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
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
                    getCriterionInDimension(entryCriterions, navigatorCriterions);
                    flag = false;
                }
                entryDimension = navigatorDimension.getNextSibling();
            } while (entryDimension != null && flag);

        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    private List<String> getCriterionInDimension(ViewEntry entryCriterions, ViewNavigator navigatorCriterions) {
        List<String> response = new ArrayList<String>();
        while (entryCriterions != null) {
            response.add((String) entryCriterions.getColumnValues().elementAt(2));
            entryCriterions = navigatorCriterions.getNextSibling();
        }
        return response;
    }

    public List<QuestionDTO> getQuestionsBySurvey(String idSurvey, String idDimension) throws HandlerGenericException {
        List<QuestionDTO> response = new ArrayList<QuestionDTO>();
        OptionDAO optionDAO = new OptionDAO();
        try {
            View currentView = getDatabase().getView("vwQuestionsBySurvey");
            ArrayList<String> filter = new ArrayList<String>();
            filter.add(idSurvey);
            filter.add(idDimension);
            DocumentCollection documents = currentView.getAllDocumentsByKey(filter, true);
            for (Document document : documents) {
                QuestionDTO question = castDocument(document);
                question.setOptions(optionDAO.getOptionsByQuestion(question.getId()));
                response.add(question);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

}
