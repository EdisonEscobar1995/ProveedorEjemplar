package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.AnswerDAO;
import com.nutresa.exemplary_provider.dtl.AnswerDTO;
import com.nutresa.exemplary_provider.dtl.CriterionDTO;
import com.nutresa.exemplary_provider.dtl.DimensionDTO;
import com.nutresa.exemplary_provider.dtl.OptionDTO;
import com.nutresa.exemplary_provider.dtl.QuestionDTO;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfAverageGradeBySuppliers;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfAverageGradeBySuppliers.SummarySurvey;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AnswerBLO extends GenericBLO<AnswerDTO, AnswerDAO> {

    public AnswerBLO() {
        super(AnswerDAO.class);
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
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        supplierByCallBLO.changeState("SUPPLIER", dto.getIdSupplierByCall());
        return super.save(dto);
    }

    public ReportOfAverageGradeBySuppliers buildReportOfAverageGradeBySupplier(String idSupplierByCall,
            ReportOfAverageGradeBySuppliers recordOfReport, Map<String, String> parameters)
            throws HandlerGenericException {
        double percentExpected = 100;
        List<AnswerDTO> answers = getAnswersForReportOfAverageGrade(idSupplierByCall, parameters);
        short sumExpectedScore = 0;
        short sumScoreAnswered = 0;
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

            short expectedScore = 0;
            if (null != option) {
                summarySurvey.setAnswer(option.getWording());
                summarySurvey.setScoreOfSupplier(option.getScore());

                expectedScore = optionBLO.getMaxScoreInQuestion(question.getId());
                sumExpectedScore = (short) (sumExpectedScore + expectedScore);

                if (option.getScore() >= 0) {
                    sumScoreAnswered = (short) (sumScoreAnswered + option.getScore());
                }
            } else {
                summarySurvey.setAnswer(answer.getResponseSupplier());
                expectedScore = -1;
            }

            summarySurvey.setQuestion(question.getWording());
            summarySurvey.setCommentSupplier(answer.getCommentSupplier());
            summarySurvey.setCriterion(criterion.getName());
            summarySurvey.setDimension(dimension.getName());
            summarySurvey.setExpectedScore(expectedScore);
            
            summariesSurvey.add(summarySurvey);
        }

        recordOfReport.setExpectedScore(percentExpected);
        recordOfReport.setTotalScoreOfSupplier(sumScoreAnswered, sumExpectedScore);
        recordOfReport.setTotalScore(sumScoreAnswered / percentExpected);
        recordOfReport.setSummarySurvey(summariesSurvey);

        return recordOfReport;
    }

    private List<AnswerDTO> getAnswersForReportOfAverageGrade(String idSupplierByCall, Map<String, String> parameters)
            throws HandlerGenericException {
        List<AnswerDTO> response = null;

        AnswerDAO answerDAO = new AnswerDAO();
        Map<String, String> fieldsToFilterQuestion = answerDAO.identifyFieldsToFTSearch(parameters);
        if (!fieldsToFilterQuestion.isEmpty()) {
            QuestionBLO questionBLO = new QuestionBLO();
            List<QuestionDTO> questions = questionBLO.getByFields(fieldsToFilterQuestion);
            response = getByQuestionsAndSupplierByCall(idSupplierByCall, questions);
        } else {
            response = answerDAO.getAsnwersByIdSupplierByCall(idSupplierByCall);
        }

        if (null == response) {
            throw new HandlerGenericException("INFORMATION_NOT_FOUND");
        }
        
        return response;
    }

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
