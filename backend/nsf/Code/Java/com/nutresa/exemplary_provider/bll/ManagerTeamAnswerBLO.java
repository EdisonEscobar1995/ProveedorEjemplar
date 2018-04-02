package com.nutresa.exemplary_provider.bll;

import java.util.Date;

import com.nutresa.exemplary_provider.dal.ManagerTeamAnswerDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.ManagerTeamAnswerDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
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

    public ManagerTeamAnswerDTO getManagerTeamAnswer(String idSupplierByCall) throws HandlerGenericException {
        ManagerTeamAnswerDAO managerTeamAnswerDAO = new ManagerTeamAnswerDAO();
        UserBLO userBLO = new UserBLO();
        String nameUserInSession = userBLO.getNameUserInSession();
        return managerTeamAnswerDAO.getManagerTeamAnswer(idSupplierByCall, nameUserInSession);
    }

}