package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.AnswerDTO;
import com.nutresa.exemplary_provider.dtl.AttachmentDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AnswerDAO extends GenericDAO<AnswerDTO> {

    public AnswerDAO() {
        super(AnswerDTO.class);
    }

    public List<AnswerDTO> getAnswerBySurvey(String idSupplierByCall, String idQuestion)
            throws HandlerGenericException {
        List<AnswerDTO> response = new ArrayList<AnswerDTO>();
        ArrayList<String> filterBySurveyAndQuestion;
        filterBySurveyAndQuestion = new ArrayList<String>();
        filterBySurveyAndQuestion.add(idSupplierByCall);
        filterBySurveyAndQuestion.add(idQuestion);
        try {
            View currentView = getDatabase().getView("vwAnswerBySurveyAndQuestion");
            DocumentCollection documents = currentView.getAllDocumentsByKey(filterBySurveyAndQuestion, true);
            if (documents != null) {
                for (Document document : documents) {
                    AnswerDTO answer = castDocument(document);
                    answer.setAttachment(getAttachmentByAnswer(answer));
                    response.add(answer);
                }
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    public List<AnswerDTO> getAsnwersByIdSupplierByCall(String idSupplierByCall) throws HandlerGenericException {
        List<AnswerDTO> response = new ArrayList<AnswerDTO>();
        try {
            View currentView = getDatabase().getView("vwAnswersBySupplierByCall");
            DocumentCollection documents = currentView.getAllDocumentsByKey(idSupplierByCall, true);
            if (documents != null) {
                for (Document document : documents) {
                    AnswerDTO answer = castDocument(document);
                    response.add(answer);
                }
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

    private List<AttachmentDTO> getAttachmentByAnswer(AnswerDTO answers) {
        List<AttachmentDTO> response = new ArrayList<AttachmentDTO>();
        AttachmentDAO attachmentDAO = new AttachmentDAO();
        for (String idDocument : answers.getIdAttachment()) {
            AttachmentDTO document = attachmentDAO.get(idDocument);
            if (null != document) {
                response.add(document);
            }
        }
        return response;
    }

    @Override
    public AnswerDTO save(AnswerDTO answer) throws HandlerGenericException {
        AnswerDTO response = null;
        answer.autoSetIdAttachment();
        response = super.save(answer);
        return response;
    }

    @Override
    public AnswerDTO update(String id, AnswerDTO dto) throws HandlerGenericException {
        dto.autoSetIdAttachment();
        return super.update(id, dto);
    }

    public void deleteBySupplier(String idSupplierByCall) throws HandlerGenericException {
        try {
            View currentView = getDatabase().getView("vwAnswersBySupplierByCall");
            DocumentCollection documents = currentView.getAllDocumentsByKey(idSupplierByCall, true);
            if (null != documents) {
                documents.removeAll(true);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }

    public void deleteMassive(List<String> paramToDelete, String idSupplierByCall) throws HandlerGenericException {
        try {
            View currentView = getDatabase().getView("vwAnswersByIdSupplierByCallToDeleteMasive");
            DocumentCollection documents = getDatabase().createDocumentCollection();
            ArrayList<String> filter;
            for (String idAnswer : paramToDelete) {
                filter = new ArrayList<String>(2);
                filter.add(idAnswer);
                filter.add(idSupplierByCall);
                Document answer = currentView.getFirstDocumentByKey(filter, true);
                if (null != answer) {
                    documents.add(answer);
                }
            }
            if (null != documents) {
                documents.removeAll(true);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }

    public AnswerDTO getByQuestionsAndSupplierByCall(String idSupplierByCall, String idQuestion)
            throws HandlerGenericException {
        AnswerDTO response = null;
        List<String> filter = new ArrayList<String>();
        filter.add(idQuestion);
        filter.add(idSupplierByCall);
        try {
            View view = getDatabase().getView("vwAnswersByQuestionAndIdSupplierByCall");
            Document document = view.getFirstDocumentByKey(filter, true);
            if (null != document) {
                response = castDocument(document);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

}
