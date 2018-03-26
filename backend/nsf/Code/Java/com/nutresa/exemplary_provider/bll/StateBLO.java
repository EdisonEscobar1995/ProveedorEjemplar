package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.List;

import com.nutresa.exemplary_provider.dal.StateDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.StateDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class StateBLO extends GenericBLO<StateDTO, StateDAO> {

    public StateBLO() {
        super(StateDAO.class);
    }

    protected StateDTO getStateByShortName(String shortName) throws HandlerGenericException {
        StateDAO stateDAO = new StateDAO();
        StateDTO response = null;
        response = stateDAO.getStateByShortName(shortName);

        if (null == response) {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.STATE_NOT_FOUND.toString());
        }

        return response;
    }

    protected List<SurveyStates> getStatesByTypeReport(String typeReport) {
        List<SurveyStates> statesByTypeReport = new ArrayList<SurveyStates>();

        if (typeReport.equals("SUPPLIER_EVALUATOR")) {
            statesByTypeReport.add(SurveyStates.ENDED_SUPPLIER);
            statesByTypeReport.add(SurveyStates.DONT_APPLY_EVALUATOR);
            statesByTypeReport.add(SurveyStates.NOT_STARTED_EVALUATOR);
            statesByTypeReport.add(SurveyStates.EVALUATOR);
            statesByTypeReport.add(SurveyStates.ENDED_EVALUATOR);
            statesByTypeReport.add(SurveyStates.DONT_APPLY_TECHNICAL_TEAM);
            statesByTypeReport.add(SurveyStates.NOT_STARTED_TECHNICAL_TEAM);
            statesByTypeReport.add(SurveyStates.TECHNICAL_TEAM);
            statesByTypeReport.add(SurveyStates.ENDED_TECHNICAL_TEAM);
            statesByTypeReport.add(SurveyStates.DONT_APPLY_MANAGER_TEAM);
            statesByTypeReport.add(SurveyStates.NOT_STARTED_MANAGER_TEAM);
            statesByTypeReport.add(SurveyStates.MANAGER_TEAM);
            statesByTypeReport.add(SurveyStates.ENDED_MANAGER_TEAM);
        } else {
            if (typeReport.equals("TECHNICAL_MANAGER")) {
                statesByTypeReport.add(SurveyStates.NOT_STARTED_TECHNICAL_TEAM);
                statesByTypeReport.add(SurveyStates.TECHNICAL_TEAM);
                statesByTypeReport.add(SurveyStates.ENDED_TECHNICAL_TEAM);
                statesByTypeReport.add(SurveyStates.DONT_APPLY_MANAGER_TEAM);
                statesByTypeReport.add(SurveyStates.NOT_STARTED_MANAGER_TEAM);
                statesByTypeReport.add(SurveyStates.MANAGER_TEAM);
                statesByTypeReport.add(SurveyStates.ENDED_MANAGER_TEAM);
            }
        }
        
        return statesByTypeReport;
    }

}
