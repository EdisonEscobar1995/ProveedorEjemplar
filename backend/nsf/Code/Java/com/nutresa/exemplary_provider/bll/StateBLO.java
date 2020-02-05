package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.StateDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.StateDTO;
import com.nutresa.exemplary_provider.dtl.StagesCall;
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

        if ("SUPPLIER_EVALUATOR".equals(typeReport)) {
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
        } else if ("TECHNICAL_MANAGER".equals(typeReport)) {
            statesByTypeReport.add(SurveyStates.NOT_STARTED_TECHNICAL_TEAM);
            statesByTypeReport.add(SurveyStates.TECHNICAL_TEAM);
            statesByTypeReport.add(SurveyStates.ENDED_TECHNICAL_TEAM);
            statesByTypeReport.add(SurveyStates.DONT_APPLY_MANAGER_TEAM);
            statesByTypeReport.add(SurveyStates.NOT_STARTED_MANAGER_TEAM);
            statesByTypeReport.add(SurveyStates.MANAGER_TEAM);
            statesByTypeReport.add(SurveyStates.ENDED_MANAGER_TEAM);
        } else if ("SUPPLIER_GRAPHIC".equals(typeReport)){
        	statesByTypeReport.add(SurveyStates.ENDED_EVALUATOR);
        	statesByTypeReport.add(SurveyStates.ENDED_TECHNICAL_TEAM);
        	statesByTypeReport.add(SurveyStates.ENDED_MANAGER_TEAM);
        	statesByTypeReport.add(SurveyStates.MANAGER_TEAM);
        	statesByTypeReport.add(SurveyStates.EVALUATOR);
        	statesByTypeReport.add(SurveyStates.TECHNICAL_TEAM);
        }

        return statesByTypeReport;
    }

    protected List<SurveyStates> getStatesByStageCall(StagesCall stage) throws HandlerGenericException {
        List<SurveyStates> statesByStage = new ArrayList<SurveyStates>();
        switch (stage) {
        case SUPPLIER:
            statesByStage.add(SurveyStates.NOT_STARTED);
            statesByStage.add(SurveyStates.SUPPLIER);
            statesByStage.add(SurveyStates.ENDED_SUPPLIER);
            break;
        case EVALUATOR:
            statesByStage.add(SurveyStates.NOT_STARTED_EVALUATOR);
            statesByStage.add(SurveyStates.EVALUATOR);
            statesByStage.add(SurveyStates.ENDED_EVALUATOR);
            break;
        case TECHNICAL_TEAM:
            statesByStage.add(SurveyStates.NOT_STARTED_TECHNICAL_TEAM);
            statesByStage.add(SurveyStates.TECHNICAL_TEAM);
            statesByStage.add(SurveyStates.ENDED_TECHNICAL_TEAM);
            break;
        case MANAGER_TEAM:
            statesByStage.add(SurveyStates.NOT_STARTED_MANAGER_TEAM);
            statesByStage.add(SurveyStates.MANAGER_TEAM);
            statesByStage.add(SurveyStates.ENDED_MANAGER_TEAM);
            break;
        default:
            throw new HandlerGenericException(HandlerGenericExceptionTypes.INVALID_VALUE.toString());
        }

        return statesByStage;
    }

    protected SurveyStates getFinalStateByStageCall(StagesCall stage) throws HandlerGenericException {
        SurveyStates finalStates = null;
        switch (stage) {
        case SUPPLIER:
            finalStates = SurveyStates.ENDED_SUPPLIER;
            break;
        case EVALUATOR:
            finalStates = SurveyStates.ENDED_EVALUATOR;
            break;
        case TECHNICAL_TEAM:
            finalStates = SurveyStates.ENDED_TECHNICAL_TEAM;
            break;
        case MANAGER_TEAM:
            finalStates = SurveyStates.ENDED_MANAGER_TEAM;
            break;
        default:
            throw new HandlerGenericException(HandlerGenericExceptionTypes.INVALID_VALUE.toString());
        }

        return finalStates;
    }

    protected static Map<String, List<String>> getEntityWithFieldsToTranslate() {
        Map<String, List<String>> entityWithFields = new HashMap<String, List<String>>();
        List<String> fields = new ArrayList<String>();
        fields.add("name");
        entityWithFields.put("State", fields);
        return entityWithFields;
    }

}
