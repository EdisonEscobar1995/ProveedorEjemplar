package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.AnswerDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AnswerDAO extends GenericDAO<AnswerDTO> {

    public AnswerDAO() {
        super(AnswerDTO.class);
    }

    public List<AnswerDTO> getAnswerBySurvey(String idSurvey, String idQuestion) throws HandlerGenericException {
        List<AnswerDTO> response = new ArrayList<AnswerDTO>();
        ArrayList<String> filterBySurveyAndQuestion;
        filterBySurveyAndQuestion = new ArrayList<String>();
        filterBySurveyAndQuestion.add(idSurvey);
        filterBySurveyAndQuestion.add(idQuestion);
        try {
            View currentView = getDatabase().getView("vwAnswerBySurveyAndQuestion");
            DocumentCollection documents = currentView.getAllDocumentsByKey(filterBySurveyAndQuestion, true);
            if (documents != null) {
                for (Document document : documents) {
                    response.add(castDocument(document));
                }
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    @Override
    public AnswerDTO save(AnswerDTO answer) throws HandlerGenericException {
        AnswerDTO response = null;
        if (answer.getId().isEmpty() || answer.getId() == null) {
            response = super.save(answer);
        } else {
            response = super.update(answer.getId(), answer);
        }

        return response;
    }

    public void deleteBySupplier(String idSupplierByCall) throws HandlerGenericException {
        try {
            View currentView = getDatabase().getView("vwAnswersBySupplierByCall");
            DocumentCollection documents = currentView.getAllDocumentsByKey(idSupplierByCall, true);
            if (documents != null) {
                documents.removeAll(true);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }

}
