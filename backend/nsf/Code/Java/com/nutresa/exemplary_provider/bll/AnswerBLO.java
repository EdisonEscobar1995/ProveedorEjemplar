package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.AnswerDAO;
import com.nutresa.exemplary_provider.dtl.AnswerDTO;
import com.nutresa.exemplary_provider.dtl.CriterionDTO;
import com.nutresa.exemplary_provider.dtl.DimensionDTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.OptionDTO;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.SectionRule;
import com.nutresa.exemplary_provider.dtl.SurveySection;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.QuestionDTO;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfAverageGradeBySuppliers;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfAverageGradeBySuppliers.SummarySurvey;
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
                notice = userBLO.getCommonName(supplierByCall.getWhoEvaluate());
                throw new HandlerGenericException("ALREADY_HAS_AN_EVALUATOR");
            }
            supplierByCallBLO.changeState(SurveyStates.EVALUATOR.toString(), dto.getIdSupplierByCall());
            supplierByCallBLO.setWhoEvaluate(dto.getIdSupplierByCall(), userBLO.getUserInSession().getName());
            dto.setDateResponseEvaluator(new Date());
        } else {
            supplierByCallBLO.changeState(SurveyStates.SUPPLIER.toString(), dto.getIdSupplierByCall());
            AnswerDAO answerDAO = new AnswerDAO();
            AnswerDTO answerExisting = answerDAO.getByQuestionsAndSupplierByCall(dto.getIdSupplierByCall(),
                    dto.getIdQuestion());
            dto.setDateResponseSupplier(new Date());

            if (null != answerExisting) {
                dto.setId(answerExisting.getId());
            }

        }

        return super.save(dto);
    }

    /**
     * Construye reporte de nota promedio por proveedor, basado en las respuestas suministradas por el proveedor.
     * 
     * @param idSupplierByCall Identificador de la convocaria definitiva y finalizada de un proveedor.
     * @param recordOfReport Registro del reporte
     * @param parameters Mapa clave valor de los filtros por los que se van a optener los resultados
     * @return Registro del reporte
     * @throws HandlerGenericException
     */
    public ReportOfAverageGradeBySuppliers buildReportOfAverageGradeBySupplier(String idSupplierByCall,
            ReportOfAverageGradeBySuppliers recordOfReport, Map<String, String> parameters)
            throws HandlerGenericException {
        List<AnswerDTO> answers = getAnswersForReportOfAverageGrade(idSupplierByCall, parameters);
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
            ReportOfAverageGradeBySuppliers report = new ReportOfAverageGradeBySuppliers();
            ReportOfAverageGradeBySuppliers.SummarySurvey summarySurvey = report.new SummarySurvey();

            short expectedScoreSupplier = 0;
            short expectedScoreEvaluator = 0;
            if (null != option) {
                setSummarySurveyBySupplier(option, summarySurvey);
                if (summarySurvey.getScoreOfSupplier() >= MINIMUM_SCORE) {
                    sumScoreAnsweredBySupplier = (short) (sumScoreAnsweredBySupplier
                            + summarySurvey.getScoreOfSupplier());
                    expectedScoreSupplier = optionBLO.getMaxScoreInQuestion(question.getId());
                    sumExpectedScoreSupplier = (short) (sumExpectedScoreSupplier + expectedScoreSupplier);
                } else {
                    summarySurvey.setExpectedScoreSupplier(SCORE_OF_NA);
                    expectedScoreSupplier = SCORE_OF_NA;
                }

                setSummarySurveyByEvaluator(answer, summarySurvey);
                if (summarySurvey.getScoreOfEvaluator() >= MINIMUM_SCORE) {
                    sumScoreAnsweredByEvaluator = (short) (sumScoreAnsweredByEvaluator
                            + summarySurvey.getScoreOfEvaluator());
                    expectedScoreEvaluator = optionBLO.getMaxScoreInQuestion(question.getId());
                    sumExpectedScoreEvaluator = (short) (sumExpectedScoreEvaluator + expectedScoreEvaluator);
                } else {
                    summarySurvey.setExpectedScoreEvaluator(SCORE_OF_NA);
                    expectedScoreEvaluator = SCORE_OF_NA;
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

            summariesSurvey.add(summarySurvey);
        }

        recordOfReport.setExpectedScoreSupplier(sumExpectedScoreSupplier);
        recordOfReport.setExpectedScoreEvaluator(sumExpectedScoreEvaluator);
        recordOfReport.setTotalScoreOfSupplier(sumScoreAnsweredBySupplier, sumExpectedScoreSupplier);
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
        if (!answer.getIdOptionEvaluator().isEmpty()) {
            OptionBLO optionBLO = new OptionBLO();
            OptionDTO optionEvaluator = optionBLO.get(answer.getIdOptionEvaluator());
            summary.setAnswerEvaluator(optionEvaluator.getWording());
            summary.setScoreOfEvaluator(optionEvaluator.getScore());
        } else {
            summary.setScoreOfEvaluator((short) SCORE_OF_NA);
        }
    }

    /**
     * Obtiene las respuestas que se van a tener en cuenta para el reporte de Nota promedio.
     * 
     * @param idSupplierByCall Identificador de la convocaria definitiva y finalizada de un proveedor.
     * @param parameters Mapa clave valor de los filtros por los que se van a optener los resultados
     * @return Collección de respuestas
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
            response = getByQuestionsAndSupplierByCall(idSupplierByCall, questions);
        } else {
            response = answerDAO.getAsnwersByIdSupplierByCall(idSupplierByCall);
        }

        if (response.isEmpty()) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.INFORMATION_NOT_FOUND.toString());
        }

        return response;
    }

    /**
     * Obtiene las respuestas por pregunta y convocatoria definitiva de un proveedor.
     * 
     * @param idSupplierByCall Identificador de la convocatoria definitiva de un proveedor.
     * @param questions Collección de preguntas a las que se desea obtener la respuesta.
     * @return Colección de respuestas
     * @throws HandlerGenericException
     */
    private List<AnswerDTO> getByQuestionsAndSupplierByCall(String idSupplierByCall, List<QuestionDTO> questions)
            throws HandlerGenericException {
        List<AnswerDTO> response = new ArrayList<AnswerDTO>();

        for (QuestionDTO question : questions) {
            AnswerDAO answerDAO = new AnswerDAO();
            AnswerDTO answer = answerDAO.getByQuestionsAndSupplierByCall(idSupplierByCall, question.getId());
            if (null != answer) {
                response.add(answer);
            }
        }

        return response;
    }

}
