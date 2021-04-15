package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Date;
import java.util.Map;
import java.util.Map.Entry;

import com.nutresa.exemplary_provider.dal.AnswerDAO;
import com.nutresa.exemplary_provider.dtl.AnswerDTO;
import com.nutresa.exemplary_provider.dtl.CriterionDTO;
import com.nutresa.exemplary_provider.dtl.CriterionPercentDTO;
import com.nutresa.exemplary_provider.dtl.DimensionDTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.OptionDTO;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.SectionRule;
import com.nutresa.exemplary_provider.dtl.SurveySection;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.QuestionDTO;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfCalificationsBySuppliers;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfCalificationsBySuppliers.SummarySurvey;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AnswerBLO extends GenericBLO<AnswerDTO, AnswerDAO> {

    private SectionRule rules;
    private static final short SCORE_OF_NA = -1;
    private static final short MINIMUM_SCORE = 0;
    private String notice;

    public AnswerBLO() {
        super(AnswerDAO.class);
        rules = new SectionRule();
    }

    public SectionRule getRule() {
        return rules;
    }

    public String getNotice() {
        return notice;
    }

    public void deleteAnswers(String idSupplierByCall) throws HandlerGenericException {
        AnswerDAO answerDAO = new AnswerDAO();
        answerDAO.deleteBySupplier(idSupplierByCall);
    }

    public AnswerDTO deleteMassive(AnswerDTO answer) throws HandlerGenericException {
        List<String> answerIds = answer.getIdsToDelete();
        AnswerDAO answerDAO = new AnswerDAO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        String idSupplierByCall = supplierByCallBLO.getCallOfSupplier(null).getId();
        answerDAO.deleteMassive(answerIds, idSupplierByCall);
        return answer;
    }

    public AnswerDTO updateMassive(AnswerDTO answer) throws HandlerGenericException {
        List<String> answerIds = answer.getIdsToDelete();
        for (String idAnswer : answerIds) {
            AnswerDTO existingAnswer = get(idAnswer);
            if (null != existingAnswer) {
                existingAnswer.setIdOptionEvaluator(null);
                existingAnswer.setCommentEvaluator(null);
                existingAnswer.setDateResponseEvaluator(null);
                super.save(existingAnswer);
            } else {
                throw new HandlerGenericException("INFORMATION_NOT_FOUND");
            }
        }

        return answer;
    }

    @Override
    public AnswerDTO save(AnswerDTO dto) throws HandlerGenericException {
        UserBLO userBLO = new UserBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        rules.setRulesToSection(SurveySection.SUPPLIER.getNameSection(), rules.buildRules(true, false));

        if (userBLO.isRol(Rol.EVALUATOR.toString())) {
            rules.setRulesToSection(SurveySection.SUPPLIER.getNameSection(), rules.buildRules(true, true));
            rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(true, false));
            if (supplierByCallBLO.isFromEvaluator(dto.getIdSupplierByCall())) {
                rules.setRulesToSection(SurveySection.EVALUATOR.getNameSection(), rules.buildRules(true, true));
                SupplierByCallDTO supplierByCall = supplierByCallBLO.get(dto.getIdSupplierByCall());
                notice = supplierByCall.getWhoEvaluate();
                throw new HandlerGenericException(HandlerGenericExceptionTypes.ALREADY_HAS_AN_EVALUATOR.toString());
            }
            supplierByCallBLO.changeState(SurveyStates.EVALUATOR.toString(), dto.getIdSupplierByCall());
            supplierByCallBLO.setWhoEvaluate(dto.getIdSupplierByCall(), userBLO.getNameUserInSession());
            dto.setDateResponseEvaluator(new Date());
        } else {
            supplierByCallBLO.changeState(SurveyStates.SUPPLIER.toString(), dto.getIdSupplierByCall());
            AnswerDAO answerDAO = new AnswerDAO();
            AnswerDTO answerExisting = answerDAO.getByQuestionAndSupplierByCall(dto.getIdQuestion(), dto.getIdSupplierByCall());
            dto.setDateResponseSupplier(new Date());

            if (null != answerExisting) {
                dto.setId(answerExisting.getId());
            }

        }

        return super.save(dto);
    }

    /**
     * Construye reporte de nota promedio por proveedor, basado en las
     * respuestas suministradas por el proveedor.
     * 
     * @param idSupplierByCall
     *            Identificador de la convocaria definitiva y finalizada de un
     *            proveedor.
     * @param recordOfReport
     *            Registro del reporte
     * @param parameters
     *            Mapa clave valor de los filtros por los que se van a optener
     *            los resultados
     * @return Registro del reporte
     * @throws HandlerGenericException
     */
    
    // TODO: Se debe descomnetar esta funciÛn cuando se pase a producciÛn el desarrollo de porcentajes por criterio
    /* public ReportOfCalificationsBySuppliers buildReportOfAverageGradeBySupplier(String idSupplierByCall,
            ReportOfCalificationsBySuppliers recordOfReport, Map<String, String> parameters)
            throws HandlerGenericException {
        List<AnswerDTO> answers = getAnswersForReportOfAverageGrade(idSupplierByCall, parameters);
        short sumScoreAnsweredBySupplierNA = 0;
        short sumScoreAnsweredByEvaluatorNA = 0;
        short counterQuestions = (short) answers.size();
        short sumExpectedScoreSupplier = 0;
        short sumExpectedScoreEvaluator = 0;
        short sumScoreAnsweredBySupplier = 0;
        short sumScoreAnsweredByEvaluator = 0;
        List<SummarySurvey> summariesSurvey = new ArrayList<SummarySurvey>();
        CriterionPercentBLO criterionPercentBLO = new CriterionPercentBLO();
        CriterionPercentDTO criterionPercentDTO = new CriterionPercentDTO();
        CriterionPercentDTO dimensionPercentDTO = new CriterionPercentDTO();
        Map<String, Integer> percents = new HashMap<String, Integer>();
        Map<String, Integer> counterQuestionsByCriterion = new HashMap<String, Integer>();
        Map<String, List<String>> scoresOfEvaluators = new HashMap<String, List<String>>();
        Map<String, List<String>> scoresOfSupplier = new HashMap<String, List<String>>();
        for (AnswerDTO answer : answers) {
            QuestionBLO questionBLO = new QuestionBLO();
            QuestionDTO question = questionBLO.get(answer.getIdQuestion());
            OptionBLO optionBLO = new OptionBLO();
            OptionDTO option = optionBLO.get(answer.getIdOptionSupplier());
            CriterionBLO criterionBLO = new CriterionBLO();
            CriterionDTO criterion = criterionBLO.get(question.getIdCriterion());
            DimensionBLO dimensionBLO = new DimensionBLO();
            DimensionDTO dimension = dimensionBLO.get(question.getIdDimension());
            
            if (percents.get(question.getIdCriterion()) == null) {
            	criterionPercentDTO =  criterionPercentBLO.getCriterionPercentById(answer.getIdSurvey(), question.getIdCriterion(), "C");
            	percents.put(criterionPercentDTO.getIdCriterion(), criterionPercentDTO.getPercent());
            }
            
            if (percents.get(question.getIdDimension()) == null) {
            	dimensionPercentDTO =  criterionPercentBLO.getCriterionPercentById(answer.getIdSurvey(), question.getIdDimension(), "D");
                percents.put(dimensionPercentDTO.getIdDimension(), dimensionPercentDTO.getPercent());
            }
            
            if (counterQuestionsByCriterion.get(question.getIdCriterion()) == null) {
            	counterQuestionsByCriterion.put(question.getIdCriterion(), 1);
            } else {
            	Integer contC = counterQuestionsByCriterion.get(question.getIdCriterion());
            	counterQuestionsByCriterion.put(question.getIdCriterion(), contC + 1);
            }
            
            ReportOfCalificationsBySuppliers report = new ReportOfCalificationsBySuppliers();
            ReportOfCalificationsBySuppliers.SummarySurvey summarySurvey = report.new SummarySurvey();

            short expectedScoreSupplier = 0;
            short expectedScoreEvaluator = 0;
            if (null != option) {
                setSummarySurveyBySupplier(option, summarySurvey);
                if (summarySurvey.getScoreOfSupplier() >= MINIMUM_SCORE) {
                    sumScoreAnsweredBySupplier = (short) (sumScoreAnsweredBySupplier + summarySurvey
                            .getScoreOfSupplier());
                    
                    if (scoresOfSupplier.get(question.getIdCriterion()) == null) {
                    	List<String> scoreS = new ArrayList<String>();
                    	scoreS.add(String.valueOf(summarySurvey.getScoreOfSupplier()));
                    	scoresOfSupplier.put(question.getIdCriterion(), scoreS);
                    } else {
                    	List<String> scoreAuxS = scoresOfSupplier.get(question.getIdCriterion());
                    	scoreAuxS.add(String.valueOf(summarySurvey.getScoreOfSupplier()));
                    	scoresOfSupplier.put(question.getIdCriterion(), scoreAuxS);
                    }
                    expectedScoreSupplier = optionBLO.getMaxScoreInQuestion(question.getId(), option);
                    sumExpectedScoreSupplier = (short) (sumExpectedScoreSupplier + expectedScoreSupplier);
                } else {
                    summarySurvey.setExpectedScoreSupplier(SCORE_OF_NA);
                    expectedScoreSupplier = SCORE_OF_NA;
                    sumScoreAnsweredBySupplierNA = (short) (sumScoreAnsweredBySupplierNA + SCORE_OF_NA);
                }

                setSummarySurveyByEvaluator(answer, summarySurvey);
                if (summarySurvey.getScoreOfEvaluator() >= MINIMUM_SCORE) {
                    OptionDTO optionEvaluator = optionBLO.get(answer.getIdOptionEvaluator());
                    sumScoreAnsweredByEvaluator = (short) (sumScoreAnsweredByEvaluator + summarySurvey
                            .getScoreOfEvaluator());
                    
                    if (scoresOfEvaluators.get(question.getIdCriterion()) == null) {
                    	List<String> score = new ArrayList<String>();
                    	score.add(String.valueOf(summarySurvey.getScoreOfEvaluator()));
                    	scoresOfEvaluators.put(question.getIdCriterion(), score);
                    } else {
                    	List<String> scoreAux = scoresOfEvaluators.get(question.getIdCriterion());
                    	scoreAux.add(String.valueOf(summarySurvey.getScoreOfEvaluator()));
                    	scoresOfEvaluators.put(question.getIdCriterion(), scoreAux);
                    }
                    expectedScoreEvaluator = optionBLO.getMaxScoreInQuestion(question.getId(), optionEvaluator);
                    sumExpectedScoreEvaluator = (short) (sumExpectedScoreEvaluator + expectedScoreEvaluator);
                } else {
                    summarySurvey.setExpectedScoreEvaluator(SCORE_OF_NA);
                    expectedScoreEvaluator = SCORE_OF_NA;
                    sumScoreAnsweredByEvaluatorNA = (short) (sumScoreAnsweredByEvaluatorNA + SCORE_OF_NA);
                }

            } else {
                summarySurvey.setAnswerSupplier(answer.getResponseSupplier());

                if (!answer.getResponseEvaluator().isEmpty()) {
                    summarySurvey.setAnswerEvaluator(answer.getResponseEvaluator());
                    expectedScoreEvaluator = SCORE_OF_NA;
                }

                expectedScoreSupplier = SCORE_OF_NA;
            }

            summarySurvey.setExpectedScoreSupplier(expectedScoreSupplier);
            summarySurvey.setExpectedScoreEvaluator(expectedScoreEvaluator);
            summarySurvey.setQuestion(question.getWording());
            summarySurvey.setQuestionType(question.getType());
            summarySurvey.setCommentSupplier(answer.getCommentSupplier());
            summarySurvey.setCommentEvaluator(answer.getCommentEvaluator());
            summarySurvey.setCriterion(criterion.getName());
            summarySurvey.setDimension(dimension.getName());
            summarySurvey.setPercentCriterion(percents.get(criterion.getId()));
            summarySurvey.setPercentDimension(percents.get(dimension.getId()));
            summarySurvey.setAttachmentCount(answer.getIdAttachment().size());

            summariesSurvey.add(summarySurvey);
        }
        
        counterQuestions = (short) (counterQuestions * SCORE_OF_NA);
        
        double percentScoreOfEvaluator = 0;
        double percentScoreOfSupplier = 0;
        if (percents.size() >= counterQuestionsByCriterion.size()) {
        	List<String> scoresQEvaluators = new ArrayList<String>();
        	List<String> scoresQSuppliers = new ArrayList<String>();
        	for (Entry<String, Integer> counterQuestionCriterion : counterQuestionsByCriterion.entrySet()) {
                int counterQ = counterQuestionCriterion.getValue();
                String idCriterion = counterQuestionCriterion.getKey();
                double percentCri = ((double) percents.get(idCriterion) / 100) / counterQ;
                scoresQEvaluators = scoresOfEvaluators.get(idCriterion);
                if (null != scoresQEvaluators && scoresQEvaluators.size() > 0) {
                	for (int i = 0; i < scoresQEvaluators.size(); i++) {
                    	percentScoreOfEvaluator = percentScoreOfEvaluator + (Double.parseDouble(scoresQEvaluators.get(i)) * percentCri);
                    }
                	scoresQEvaluators.clear();
                }
                scoresQSuppliers = scoresOfSupplier.get(idCriterion);
                if (null != scoresQSuppliers && scoresQSuppliers.size() > 0) {
                	for (int i = 0; i < scoresQSuppliers.size(); i++) {
                		percentScoreOfSupplier = percentScoreOfSupplier + (Double.parseDouble(scoresQSuppliers.get(i)) * percentCri);
                    }
                	scoresQSuppliers.clear();
                }
                // percentScoreOfEvaluator = (short) (percentScoreOfEvaluator + (percentCri / counterQ));
            }
        }
        
        recordOfReport.setExpectedScoreSupplier(sumExpectedScoreSupplier);
        recordOfReport.setExpectedScoreEvaluator(sumExpectedScoreEvaluator);

        if (counterQuestions == sumScoreAnsweredBySupplierNA) {
            sumScoreAnsweredBySupplier = SCORE_OF_NA;
            recordOfReport.setExpectedScoreSupplier(SCORE_OF_NA);
        }
        recordOfReport.setTotalScoreOfSupplier(sumScoreAnsweredBySupplier, sumExpectedScoreSupplier);
        recordOfReport.setTotalPercentScoreOfSupplier(percentScoreOfSupplier);

        if (counterQuestions == sumScoreAnsweredByEvaluatorNA) {
            sumScoreAnsweredByEvaluator = SCORE_OF_NA;
            recordOfReport.setExpectedScoreEvaluator(SCORE_OF_NA);
        }
        recordOfReport.setTotalScoreOfEvaluator(sumScoreAnsweredByEvaluator, sumExpectedScoreEvaluator);
        recordOfReport.setTotalPercentScoreOfEvaluator(percentScoreOfEvaluator);
        
        recordOfReport.setScoreOfSupplier(sumScoreAnsweredBySupplier);
        recordOfReport.setScoreOfEvaluator(sumScoreAnsweredByEvaluator);
        recordOfReport.setSummarySurvey(summariesSurvey);

        return recordOfReport;
    } */
    
    public ReportOfCalificationsBySuppliers buildReportOfAverageGradeBySupplier(String idSupplierByCall,
            ReportOfCalificationsBySuppliers recordOfReport, Map<String, String> parameters)
            throws HandlerGenericException {
        List<AnswerDTO> answers = getAnswersForReportOfAverageGrade(idSupplierByCall, parameters);
        short sumScoreAnsweredBySupplierNA = 0;
        short sumScoreAnsweredByEvaluatorNA = 0;
        short counterQuestions = (short) answers.size();
        short sumExpectedScoreSupplier = 0;
        short sumExpectedScoreEvaluator = 0;
        short sumScoreAnsweredBySupplier = 0;
        short sumScoreAnsweredByEvaluator = 0;
        List<SummarySurvey> summariesSurvey = new ArrayList<SummarySurvey>();
        for (AnswerDTO answer : answers) {
            QuestionBLO questionBLO = new QuestionBLO();
            QuestionDTO question = questionBLO.get(answer.getIdQuestion());
            OptionBLO optionBLO = new OptionBLO();
            OptionDTO option = optionBLO.get(answer.getIdOptionSupplier());
            CriterionBLO criterionBLO = new CriterionBLO();
            CriterionDTO criterion = criterionBLO.get(question.getIdCriterion());
            DimensionBLO dimensionBLO = new DimensionBLO();
            DimensionDTO dimension = dimensionBLO.get(question.getIdDimension());
            ReportOfCalificationsBySuppliers report = new ReportOfCalificationsBySuppliers();
            ReportOfCalificationsBySuppliers.SummarySurvey summarySurvey = report.new SummarySurvey();

            short expectedScoreSupplier = 0;
            short expectedScoreEvaluator = 0;
            if (null != option) {
                setSummarySurveyBySupplier(option, summarySurvey);
                if (summarySurvey.getScoreOfSupplier() >= MINIMUM_SCORE) {
                    sumScoreAnsweredBySupplier = (short) (sumScoreAnsweredBySupplier + summarySurvey
                            .getScoreOfSupplier());
                    expectedScoreSupplier = optionBLO.getMaxScoreInQuestion(question.getId(), option);
                    sumExpectedScoreSupplier = (short) (sumExpectedScoreSupplier + expectedScoreSupplier);
                } else {
                    summarySurvey.setExpectedScoreSupplier(SCORE_OF_NA);
                    expectedScoreSupplier = SCORE_OF_NA;
                    sumScoreAnsweredBySupplierNA = (short) (sumScoreAnsweredBySupplierNA + SCORE_OF_NA);
                }

                setSummarySurveyByEvaluator(answer, summarySurvey);
                if (summarySurvey.getScoreOfEvaluator() >= MINIMUM_SCORE) {
                    OptionDTO optionEvaluator = optionBLO.get(answer.getIdOptionEvaluator());
                    sumScoreAnsweredByEvaluator = (short) (sumScoreAnsweredByEvaluator + summarySurvey
                            .getScoreOfEvaluator());
                    expectedScoreEvaluator = optionBLO.getMaxScoreInQuestion(question.getId(), optionEvaluator);
                    sumExpectedScoreEvaluator = (short) (sumExpectedScoreEvaluator + expectedScoreEvaluator);
                } else {
                    summarySurvey.setExpectedScoreEvaluator(SCORE_OF_NA);
                    expectedScoreEvaluator = SCORE_OF_NA;
                    sumScoreAnsweredByEvaluatorNA = (short) (sumScoreAnsweredByEvaluatorNA + SCORE_OF_NA);
                }

            } else {
                summarySurvey.setAnswerSupplier(answer.getResponseSupplier());

                if (!answer.getResponseEvaluator().isEmpty()) {
                    summarySurvey.setAnswerEvaluator(answer.getResponseEvaluator());
                    expectedScoreEvaluator = SCORE_OF_NA;
                }

                expectedScoreSupplier = SCORE_OF_NA;
            }

            summarySurvey.setExpectedScoreSupplier(expectedScoreSupplier);
            summarySurvey.setExpectedScoreEvaluator(expectedScoreEvaluator);
            summarySurvey.setQuestion(question.getWording());
            summarySurvey.setQuestionType(question.getType());
            summarySurvey.setCommentSupplier(answer.getCommentSupplier());
            summarySurvey.setCommentEvaluator(answer.getCommentEvaluator());
            summarySurvey.setCriterion(criterion.getName());
            summarySurvey.setDimension(dimension.getName());
            summarySurvey.setAttachmentCount(answer.getIdAttachment().size());

            summariesSurvey.add(summarySurvey);
        }

        counterQuestions = (short) (counterQuestions * SCORE_OF_NA);

        recordOfReport.setExpectedScoreSupplier(sumExpectedScoreSupplier);
        recordOfReport.setExpectedScoreEvaluator(sumExpectedScoreEvaluator);

        if (counterQuestions == sumScoreAnsweredBySupplierNA) {
            sumScoreAnsweredBySupplier = SCORE_OF_NA;
            recordOfReport.setExpectedScoreSupplier(SCORE_OF_NA);
        }
        recordOfReport.setTotalScoreOfSupplier(sumScoreAnsweredBySupplier, sumExpectedScoreSupplier);

        if (counterQuestions == sumScoreAnsweredByEvaluatorNA) {
            sumScoreAnsweredByEvaluator = SCORE_OF_NA;
            recordOfReport.setExpectedScoreEvaluator(SCORE_OF_NA);
        }
        recordOfReport.setTotalScoreOfEvaluator(sumScoreAnsweredByEvaluator, sumExpectedScoreEvaluator);

        recordOfReport.setScoreOfSupplier(sumScoreAnsweredBySupplier);
        recordOfReport.setScoreOfEvaluator(sumScoreAnsweredByEvaluator);
        recordOfReport.setSummarySurvey(summariesSurvey);

        return recordOfReport;
    }
    
    private void setSummarySurveyBySupplier(OptionDTO optionAnswer, SummarySurvey summary) {
        summary.setAnswerSupplier(optionAnswer.getWording());
        summary.setScoreOfSupplier(optionAnswer.getScore());
    }

    private void setSummarySurveyByEvaluator(AnswerDTO answer, SummarySurvey summary) throws HandlerGenericException {
        if (null != answer.getIdOptionEvaluator() && !answer.getIdOptionEvaluator().isEmpty()) {
            OptionBLO optionBLO = new OptionBLO();
            OptionDTO optionEvaluator = optionBLO.get(answer.getIdOptionEvaluator());
            summary.setAnswerEvaluator(optionEvaluator.getWording());
            summary.setScoreOfEvaluator(optionEvaluator.getScore());
        } else {
            summary.setScoreOfEvaluator((short) SCORE_OF_NA);
        }
    }
    
    /**
     * Obtiene las respuestas que se van a tener en cuenta para el reporte de
     * Nota promedio.
     * 
     * @param idSupplierByCall
     *            Identificador de la convocaria definitiva y finalizada de un
     *            proveedor.
     * @param parameters
     *            Mapa clave valor de los filtros por los que se van a optener
     *            los resultados
     * @return Collecci√≥n de respuestas
     * @throws HandlerGenericException
     */
    private List<AnswerDTO> getAnswersForReportOfAverageGrade(String idSupplierByCall, Map<String, String> parameters)
            throws HandlerGenericException {
        List<AnswerDTO> response;

        AnswerDAO answerDAO = new AnswerDAO();
        Map<String, String> fieldsToFilterQuestion = answerDAO.identifyFieldsToFTSearch(parameters);
        if (!fieldsToFilterQuestion.isEmpty()) {
            QuestionBLO questionBLO = new QuestionBLO();
            List<QuestionDTO> questions = questionBLO.getThemWithFilter(fieldsToFilterQuestion);
            response = getByQuestionAndSupplierByCall(questions, idSupplierByCall);
        } else {
            response = answerDAO.getAsnwersByIdSupplierByCall(idSupplierByCall);
        }

        return response;
    }

    /**
     * Obtiene las respuestas por pregunta y convocatoria definitiva de un
     * proveedor.
     * 
     * @param idSupplierByCall
     *            Identificador de la convocatoria definitiva de un proveedor.
     * @param questions
     *            Collecci√≥n de preguntas a las que se desea obtener la
     *            respuesta.
     * @return Colecci√≥n de respuestas
     * @throws HandlerGenericException
     */
    private List<AnswerDTO> getByQuestionAndSupplierByCall(List<QuestionDTO> questions, String idSupplierByCall)
            throws HandlerGenericException {
        List<AnswerDTO> response = new ArrayList<AnswerDTO>();

        for (QuestionDTO question : questions) {
            AnswerDAO answerDAO = new AnswerDAO();
            AnswerDTO answer = answerDAO.getByQuestionAndSupplierByCall(question.getId(), idSupplierByCall);
            if (null != answer) {
                response.add(answer);
            }
        }

        return response;
    }
    
    public AnswerDTO getByQuestionAndSupplierByCall(String idQuestion, String idSupplierByCall)
	throws HandlerGenericException {
	AnswerDAO answerDAO = new AnswerDAO();
	return answerDAO.getByQuestionAndSupplierByCall(idQuestion, idSupplierByCall);
}


}
