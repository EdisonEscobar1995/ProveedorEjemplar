package com.nutresa.exemplary_provider.api;

import java.util.Map;
import java.util.List;

import com.nutresa.exemplary_provider.bll.CallBLO;
import com.nutresa.exemplary_provider.dtl.CallDTO;
import com.nutresa.exemplary_provider.dtl.StagesCall;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.SuppliersInCallDTO;
import com.nutresa.exemplary_provider.dtl.queries.QuestionStatistic;
import com.nutresa.exemplary_provider.dtl.queries.InformationFromSupplier;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfCalificationsBySuppliers;
import com.nutresa.exemplary_provider.dtl.queries.SummaryToLoadSupplier;
import com.nutresa.exemplary_provider.dtl.queries.StatisticalProgress;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class CallAPI extends GenericAPI<CallDTO, CallBLO> {

    public CallAPI() {
        super(CallDTO.class, CallBLO.class);
    }

    public ServletResponseDTO<CallDTO> massiveShipmentCall(CallDTO call) {
        ServletResponseDTO<CallDTO> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<CallDTO>(callBLO.massiveShipmentCall(call.getId()));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<CallDTO>(exception);
        }

        return response;
    }

    public ServletResponseDTO<SuppliersInCallDTO> getSuppliersInCall(Map<String, String> parameters) {
        ServletResponseDTO<SuppliersInCallDTO> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<SuppliersInCallDTO>(callBLO.getSuppliersInCall(parameters.get("idCall")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<SuppliersInCallDTO>(exception);
        }

        return response;
    }

    public ServletResponseDTO<InformationFromSupplier> getParticipantsByYear(Map<String, String> parameters) {
        ServletResponseDTO<InformationFromSupplier> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<InformationFromSupplier>(callBLO.getParticipantsByYear(parameters
                    .get("year")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<InformationFromSupplier>(exception);
        }

        return response;
    }

    public ServletResponseDTO<List<ReportOfCalificationsBySuppliers>> getResults(Map<String, String> parameters) {
        ServletResponseDTO<List<ReportOfCalificationsBySuppliers>> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<List<ReportOfCalificationsBySuppliers>>(callBLO
                    .getReportOfAverageGradeBySupplier(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<ReportOfCalificationsBySuppliers>>(exception);
        }

        return response;
    }

    public ServletResponseDTO<List<QuestionStatistic>> getManagerReport(Map<String, String> parameters) {
        ServletResponseDTO<List<QuestionStatistic>> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<List<QuestionStatistic>>(callBLO
                    .getManagerReport(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<QuestionStatistic>>(exception);
        }

        return response;
    }
    
    public ServletResponseDTO<List<ReportOfCalificationsBySuppliers>> getSuppliersForSelection(
            Map<String, String> parameters) {
        ServletResponseDTO<List<ReportOfCalificationsBySuppliers>> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<List<ReportOfCalificationsBySuppliers>>(callBLO
                    .getThemWillPassToNextStage(parameters));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<ReportOfCalificationsBySuppliers>>(exception);
        }

        return response;
    }

    public ServletResponseDTO<InformationFromSupplier> getParticipantsToTechnicalTeam(Map<String, String> parameters) {
        ServletResponseDTO<InformationFromSupplier> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<InformationFromSupplier>(callBLO
                    .getParticipantsToTechnicalTeam(parameters.get("year")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<InformationFromSupplier>(exception);
        }

        return response;
    }

    public ServletResponseDTO<InformationFromSupplier> getParticipantsToManagerTeam(Map<String, String> parameters) {
        ServletResponseDTO<InformationFromSupplier> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<InformationFromSupplier>(callBLO.getParticipantsToManagerTeam(parameters
                    .get("year")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<InformationFromSupplier>(exception);
        }

        response.setRule(callBLO.getRule().getRules());

        return response;
    }

    public ServletResponseDTO<StagesCall> identifyCurrentStage() {
        ServletResponseDTO<StagesCall> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<StagesCall>(callBLO.identifyCurrentStage());
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<StagesCall>(exception);
        }

        return response;
    }

    public ServletResponseDTO<StatisticalProgress> getStatisticalProgress(Map<String, String> parameters) {
        ServletResponseDTO<StatisticalProgress> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<StatisticalProgress>(callBLO.getStatisticalProgress(parameters
                    .get("filterName")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<StatisticalProgress>(exception);
        }

        return response;
    }

    public ServletResponseDTO<List<SummaryToLoadSupplier>> loadSupplierToCall(CallDTO call) {
        ServletResponseDTO<List<SummaryToLoadSupplier>> response = null;
        CallBLO callBLO = new CallBLO();
        try {
            response = new ServletResponseDTO<List<SummaryToLoadSupplier>>(callBLO.loadSupplierToCall(call));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<SummaryToLoadSupplier>>(exception);
        }

        return response;
    }

}
