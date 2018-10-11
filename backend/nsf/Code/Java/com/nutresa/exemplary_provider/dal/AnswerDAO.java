package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;

import com.nutresa.exemplary_provider.dtl.AnswerDTO;
import com.nutresa.exemplary_provider.dtl.AttachmentDTO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.FieldsQuestion;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.utils.Common;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AnswerDAO extends GenericDAO<AnswerDTO> {
	
    public AnswerDAO() {
        super(AnswerDTO.class);
    }

    public List<AnswerDTO> getAnswerBySurvey(SupplierByCallDTO supplierByCallDTO, String idQuestion, String idCall) throws HandlerGenericException {
        List<AnswerDTO> response = new ArrayList<AnswerDTO>();
        ArrayList<String> filterBySurveyAndQuestion;
        filterBySurveyAndQuestion = new ArrayList<String>();
        filterBySurveyAndQuestion.add(supplierByCallDTO.getId());
        filterBySurveyAndQuestion.add(idQuestion);
        try {
            View currentView = getDatabase().getView("vwAnswerBySurveyAndQuestion");
            DocumentCollection documents = currentView.getAllDocumentsByKey(filterBySurveyAndQuestion, true);
            if (documents.getCount() == 0){
            	CallDAO callDAO = new CallDAO();
            	CallDTO callDTO = callDAO.getPrevious(idCall);
            	if (null != callDTO){
            		String previousIdCall = callDTO.getId();
            		copyPreviousAnswer(supplierByCallDTO, idQuestion, previousIdCall);
            		response = getAnswerBySurvey(supplierByCallDTO, idQuestion, previousIdCall);
            	}
            } else {
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
    
    private void copyPreviousAnswer(SupplierByCallDTO supplierByCallDTO, String idQuestion, String idCall) throws HandlerGenericException {
    	SupplierByCallDAO previousSupplierByCallDAO = new SupplierByCallDAO();
    	SupplierByCallDTO previousSupplierByCallDTO = previousSupplierByCallDAO.getBySupplierAndCall(supplierByCallDTO.getIdSupplier(), idCall);
    	
    	ArrayList<String> filterBySurveyAndQuestion;
        filterBySurveyAndQuestion = new ArrayList<String>();
        filterBySurveyAndQuestion.add(previousSupplierByCallDTO.getId());
        filterBySurveyAndQuestion.add(idQuestion);
        try {
            View currentView = getDatabase().getView("vwAnswerBySurveyAndQuestion");
            DocumentCollection documents = currentView.getAllDocumentsByKey(filterBySurveyAndQuestion, true);
            AnswerDAO answerDAO = new AnswerDAO();
            AnswerDTO answerDTO;
            
            if (documents.getCount() > 0){
                for (Document document : documents) {
                	answerDTO = castDocument(document);
                	answerDTO.setAttachment(copyPreviousAttachment(answerDTO));
                    
                    answerDTO.setId("");
                    answerDTO.setDateResponseSupplier(new Date());
                    answerDTO.setIdSupplierByCall(supplierByCallDTO.getId());
                    answerDTO.setIdSurvey(supplierByCallDTO.getIdSurvey());
                    answerDTO.autoSetIdAttachment();
                	answerDAO.save(answerDTO);
                }
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }
    }
    
    private List<AttachmentDTO> copyPreviousAttachment (AnswerDTO answers)throws HandlerGenericException {
    	List<AttachmentDTO> response = new ArrayList<AttachmentDTO>();
        AttachmentDAO attachmentDAO = new AttachmentDAO();
        for (String idAttachment : answers.getIdAttachment()) {
            AttachmentDTO attachmentDTO = attachmentDAO.copyAttachment(idAttachment);
            if (null != attachmentDTO) {
                response.add(attachmentDTO);
            }
        }
        return response;
    }

    /**
     * Obtiene las respuesta en base a una convocatoria definitiva de un
     * proveedor.
     * 
     * @param idSupplierByCall
     *            Identificador de la convocatoria definitiva de un proveedor.
     * @return Colección de respuestas
     * @throws HandlerGenericException
     */
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

    /**
     * Dada la información en <code>parameters</code> identifica por cuales
     * campos se deben filtrar las preguntas.
     * 
     * @param parameters
     *            Mapa clave valor de los filtros por los que se van a optener
     *            los resultados
     * @return Mapa clave valor con los campos que se debe filtrar.
     * @throws HandlerGenericException
     */
    public Map<String, String> identifyFieldsToFTSearch(Map<String, String> parameters) throws HandlerGenericException {
        Map<String, String> fields = new HashMap<String, String>();
        for (FieldsQuestion field : FieldsQuestion.values()) {
            if (parameters.containsKey(field.getFieldName())) {
                String valueInField = parameters.get(field.getFieldName());
                if (null != valueInField && !valueInField.trim().isEmpty()) {
                    Common.setFieldsToFilterFTSearch(valueInField, field.getFieldName(), fields);
                }
            }
        }

        return fields;
    }
    
    public AnswerDTO getByQuestionAndSupplierByCall(String idQuestion, String idSupplierByCall) throws HandlerGenericException {
    	ArrayList<String> key = new ArrayList<String>(2);
        key.add(idQuestion);
        key.add(idSupplierByCall);
        this.entityView = "vwAnswersByQuestionAndIdSupplierByCall";
        return super.getBy(key);
    }

}
