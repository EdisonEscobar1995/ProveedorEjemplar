package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
        loadTranslator();
    }

    public List<String> getDimensionsBySurvey(String idSurvey) throws HandlerGenericException {
        List<String> response = new ArrayList<String>();
        try {
            View currentView = getDatabase().getView("vwDimensionsAndCriterionsBySurvey");
            ViewNavigator navigator = currentView.createViewNavFromCategory(idSurvey);
            ViewEntry entry = navigator.getFirst();
            while (null != entry) {
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
        boolean flag = false;
        try {
            View currentView = getDatabase().getView("vwDimensionsAndCriterionsBySurvey");
            ViewNavigator navigatorDimension = currentView.createViewNavFromCategory(idSurvey);
            if (null == navigatorDimension) {
                return response;
            }
            ViewEntry entryDimension = navigatorDimension.getFirst();
            ViewEntry entryCriterions;
            ViewNavigator navigatorCriterions;
            do {
                if (entryDimension.isCategory()
                        && idDimension.equals((String) entryDimension.getColumnValues().elementAt(1))) {
                    entryDimension = navigatorDimension.getNextCategory();
                    navigatorCriterions = currentView.createViewNavFrom(entryDimension);
                    entryCriterions = navigatorCriterions.getFirst();
                    response = getCriterionInDimension(entryCriterions, navigatorCriterions);
                    flag = true;
                }
                entryDimension = navigatorDimension.getNextSibling();
            } while (null != entryDimension && !flag);

        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    private List<String> getCriterionInDimension(ViewEntry entryCriterions, ViewNavigator navigatorCriterions) {
        List<String> response = new ArrayList<String>();
        while (null != entryCriterions) {
            response.add((String) entryCriterions.getColumnValues().elementAt(2));
            entryCriterions = navigatorCriterions.getNextSibling();
        }

        return response;
    }

    public List<QuestionDTO> getQuestionsBySurvey(String idSurvey, String idDimension, String idSupplierByCall)
            throws HandlerGenericException {
        List<QuestionDTO> response = new ArrayList<QuestionDTO>();
        OptionDAO optionDAO = new OptionDAO();
        AnswerDAO answerDAO = new AnswerDAO();
        try {
            View currentView = getDatabase().getView("vwQuestionsBySurvey");
            ArrayList<String> fiterBySurveyAndDimension = new ArrayList<String>();
            fiterBySurveyAndDimension.add(idSurvey);
            fiterBySurveyAndDimension.add(idDimension);
            DocumentCollection documents = currentView.getAllDocumentsByKey(fiterBySurveyAndDimension, true);
            for (Document document : documents) {
                QuestionDTO question = castDocument(document);
                question.setOptions(optionDAO.getOptionsByQuestion(question.getId()));
                question.setAnswer(answerDAO.getAnswerBySurvey(idSupplierByCall, question.getId()));
                response.add(question);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    public List<QuestionDTO> getThemFilters(Map<String, String> fieldsToFilter) throws HandlerGenericException {
        List<QuestionDTO> response = new ArrayList<QuestionDTO>();
        try {
            View view = getDatabase().getView("vwQuestions");
            view.FTSearch(buildCharFTSearch(fieldsToFilter, QuestionDTO.class));

            DocumentCollection documents = view.getAllDocuments();
            if (null != documents) {
                for (Document document : documents) {
                    response.add(castDocument(document));
                }
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

}
