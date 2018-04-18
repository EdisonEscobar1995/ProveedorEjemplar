package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.nutresa.exemplary_provider.dal.ManagerTeamAnswerDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.ManagerTeamAnswerDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfCalificationsBySuppliers;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfCalificationsBySuppliers.SummaryManagerSurvey;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ManagerTeamAnswerBLO extends GenericBLO<ManagerTeamAnswerDTO, ManagerTeamAnswerDAO> {
    private String notice;

    public ManagerTeamAnswerBLO() {
        super(ManagerTeamAnswerDAO.class);
    }

    public String getNotice() {
        return notice;
    }

    @Override
    public ManagerTeamAnswerDTO save(ManagerTeamAnswerDTO answer) throws HandlerGenericException {
        UserBLO userBLO = new UserBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        CallBLO callBLO = new CallBLO();
        SupplierByCallDTO supplierByCall = supplierByCallBLO.get(answer.getIdSupplierByCall());

        if (callBLO.get(supplierByCall.getIdCall()).isCaducedDeadLineToMakeSurveyManagerTeam()) {
            throw new HandlerGenericException(
                    HandlerGenericExceptionTypes.DATE_TO_MAKE_SURVEY_MANAGER_TEAM_EXCEEDED.toString());
        }

        supplierByCallBLO.changeState(SurveyStates.MANAGER_TEAM.toString(), answer.getIdSupplierByCall());
        answer.setWhoEvaluate(userBLO.getNameUserInSession());
        answer.setDateResponse(new Date());
        return super.save(answer);
    }

    public List<ManagerTeamAnswerDTO> getAnswersOfSupplier(String idSupplierByCall) throws HandlerGenericException {
        ManagerTeamAnswerDAO managerTeamAnswerDAO = new ManagerTeamAnswerDAO();
        return managerTeamAnswerDAO.getAnswersOfSupplier(idSupplierByCall);
    }

    public ReportOfCalificationsBySuppliers buildReportOfManagerTeam(String idSupplierByCall,
            ReportOfCalificationsBySuppliers recordOfReport) throws HandlerGenericException {
        List<SummaryManagerSurvey> answerToReport = new ArrayList<SummaryManagerSurvey>();
        ReportOfCalificationsBySuppliers report = new ReportOfCalificationsBySuppliers();
        List<ManagerTeamAnswerDTO> managerAnswers = getAnswersOfSupplier(idSupplierByCall);
        for (ManagerTeamAnswerDTO answer : managerAnswers) {
            EvaluationScaleBLO evaluationScaleBLO = new EvaluationScaleBLO();
            ReportOfCalificationsBySuppliers.SummaryManagerSurvey answerRecord = report.new SummaryManagerSurvey();
            answerRecord.comment = answer.getComment();
            answerRecord.whoEvaluate = answer.getWhoEvaluate();
            answerRecord.score = evaluationScaleBLO.get(answer.getIdEvaluationScale()).getScore();
            answerToReport.add(answerRecord);
        }
        recordOfReport.setManagerAnswers(answerToReport);

        return recordOfReport;
    }

}