package com.nutresa.exemplary_provider.dal;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.openntf.domino.Document;
import org.openntf.domino.DocumentCollection;
import org.openntf.domino.View;
import org.openntf.domino.ViewEntry;
import org.openntf.domino.ViewEntryCollection;
import org.openntf.domino.ViewNavigator;

import com.nutresa.exemplary_provider.dtl.QuestionDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
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
    
    public List<QuestionDTO> getQuestionsBySurvey(String idSurvey)
    throws HandlerGenericException {
		List<QuestionDTO> response = new ArrayList<QuestionDTO>();
		try {
		    View currentView = getDatabase().getView("vwQuestionsBySurvey");
		    DocumentCollection documents = currentView.getAllDocumentsByKey(idSurvey, true);
		    for (Document document : documents) {
		        QuestionDTO question = castDocument(document);
		        response.add(question);
		    }
		} catch (Exception exception) {
		    throw new HandlerGenericException(exception);
		}
		
		return response;
	}

    public List<QuestionDTO> getQuestionsBySurvey(String idDimension, String idSupplierByCall)
            throws HandlerGenericException {
        List<QuestionDTO> response = new ArrayList<QuestionDTO>();
        OptionDAO optionDAO = new OptionDAO();
        AnswerDAO answerDAO = new AnswerDAO();
        SupplierByCallDAO suppplierByCallDAO = new SupplierByCallDAO();
        SupplierByCallDTO supplierByCallDTO = suppplierByCallDAO.get(idSupplierByCall);
        try {
            View currentView = getDatabase().getView("vwQuestionsBySurvey");
            ArrayList<String> fiterBySurveyAndDimension = new ArrayList<String>();
            fiterBySurveyAndDimension.add(supplierByCallDTO.getIdSurvey());
            fiterBySurveyAndDimension.add(idDimension);
            DocumentCollection documents = currentView.getAllDocumentsByKey(fiterBySurveyAndDimension, true);
            for (Document document : documents) {
                QuestionDTO question = castDocument(document);
                question.setOptions(optionDAO.getOptionsByQuestion(question.getId()));
                question.setAnswer(answerDAO.getAnswerBySurvey(supplierByCallDTO, question.getId(), supplierByCallDTO.getIdCall()));
                response.add(question);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }
    
    public List<QuestionDTO> getByCallDimensionAndCriterion(String idCall, String idDimension, String idCriterion) throws HandlerGenericException {
        List<QuestionDTO> response = new ArrayList<QuestionDTO>();
        try {
        	View view;
        	ViewEntryCollection entries;
        	
            if (idDimension.equals("") && idCriterion.equals("")) {
            	view = getDatabase().getView("vwQuestionsByCall");
            	entries = view.getAllEntriesByKey(idCall, true);
            }else{
            	view = getDatabase().getView("vwQuestionsCallDimensionCriterion");
            	List<String> keys = new ArrayList<String>();
            	keys.add(idCall);
           		keys.add(idDimension);
           		if (!idCriterion.equals("")){
           			keys.add(idCriterion);
           		}
            	entries = view.getAllEntriesByKey(keys, true);
            }
            
            if (null != entries) {
                for (ViewEntry entry : entries) {
                    Document document = entry.getDocument();
                    response.add(castDocument(document));
                }
                view.clear();
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }
    
    /**
     * Filtra las preguntas según los campos especificados en
     * <code>fieldsToFilter</code>
     * 
     * @param fieldsToFilter
     *            Mapa clave valor de los campos por los cuales se filtrarán las
     *            preguntas
     * @return Colección de preguntas
     * @throws HandlerGenericException
     */
    public List<QuestionDTO> getThemWithFilter(Map<String, String> fieldsToFilter) throws HandlerGenericException {
        List<QuestionDTO> response = new ArrayList<QuestionDTO>();
        try {
            View view = getDatabase().getView("vwQuestionsByCall");
            view.FTSearch(buildCharFTSearch(fieldsToFilter, QuestionDTO.class), 0);

            ViewEntryCollection entries = view.getAllEntries();
            if (null != entries) {
                for (ViewEntry entry : entries) {
                    Document document = entry.getDocument();
                    response.add(castDocument(document));
                }
                view.clear();
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }
    
    @SuppressWarnings("unchecked")
	public QuestionDTO associateToCall(String idQuestion, String idCall, String idSurvey) throws HandlerGenericException {
    	
    	QuestionDTO response = null;
    	
    	ArrayList<String> key = new ArrayList<String>(2);
    	key.add(idCall);
        key.add(idQuestion);
        View view = getDatabase().getView("vwQuestionsByCall");
        Document document = view.getFirstDocumentByKey(key, true);
        if (null == document){
        	view = getDatabase().getView("vwQuestions");
    		Document question = view.getFirstDocumentByKey(idQuestion, true);
    		if (null != question) {
    			document = getDatabase().createDocument();
    			question.copyAllItems(document, true);
    			document.replaceItemValue("idCall", idCall);
    		}
        }
        if (null != document) {
        	List<String> idSurveysInQuestion;
            if (!document.hasItem("idSurvey")){
            	idSurveysInQuestion = new ArrayList<String>();
        	}else{
        		idSurveysInQuestion = document.getItemValue("idSurvey", Vector.class);
        	}
            if (!idSurveysInQuestion.contains(idSurvey)){
            	idSurveysInQuestion.add(idSurvey);
            	document.replaceItemValue("idSurvey", idSurveysInQuestion);
            	document.save(true, false);
            }
            response = super.castDocument(document);
        }

        return response;
    }
    
    @SuppressWarnings("unchecked")
	public void removeUnusedQuestions(String idSurvey, List<QuestionDTO> questions) throws HandlerGenericException {
    	View view = getDatabase().getView("vwQuestionsBySurvey");
    	DocumentCollection dc = view.getAllDocumentsByKey(idSurvey);
    	boolean found;
    	for (Document document: dc) {
    		found = false;
    		for (QuestionDTO question: questions) {
    			if (question.getId().equals(document.getItemValueString("id"))){
    				found = true;
    			}
    		}
    		if (!found) {
    			List<String> surveys = document.getItemValue("idSurvey", Vector.class);
    			surveys.remove(idSurvey);
    			document.replaceItemValue("idSurvey", surveys);
    			if (surveys.size() > 0){
    				document.save(true, false);
    			} else {
    				document.remove(true);
    			}
    		}
    	}
    }

    public boolean questionInCall (String id) throws HandlerGenericException{
    	View view = getDatabase().getView("vwQuestionsInCall");
    	Document document = view.getFirstDocumentByKey(id, true);
    	return document != null;
    }
}
