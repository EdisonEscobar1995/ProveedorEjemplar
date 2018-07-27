package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.List;

import com.nutresa.exemplary_provider.dal.TechnicalTeamAnswerDAO;
import com.nutresa.exemplary_provider.dtl.DTO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.ServiceDTO;
import com.nutresa.exemplary_provider.dtl.ItemDTO;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.TechnicalTeamAnswerDTO;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfCalificationsBySuppliers;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfCalificationsBySuppliers.Service;
import com.nutresa.exemplary_provider.dtl.queries.ReportOfCalificationsBySuppliers.Item;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TechnicalTeamAnswerBLO extends GenericBLO<TechnicalTeamAnswerDTO, TechnicalTeamAnswerDAO> {
    private static final short SCORE_OF_NA = -1;
    private String notice;

    public TechnicalTeamAnswerBLO() {
        super(TechnicalTeamAnswerDAO.class);
    }

    public String getNotice() {
        return notice;
    }

    @Override
    public TechnicalTeamAnswerDTO save(TechnicalTeamAnswerDTO answer) throws HandlerGenericException {
        UserBLO userBLO = new UserBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();
        CallBLO callBLO = new CallBLO();
        SupplierByCallDTO supplierByCall = supplierByCallBLO.get(answer.getIdSupplierByCall());

        if (userBLO.isRol(Rol.TECHNICAL_TEAM.toString())) {
            if (supplierByCallBLO.isFromTechnicalTeam(answer.getIdSupplierByCall())) {
                notice = supplierByCall.getWhoEvaluateOfTechnicalTeam();
                throw new HandlerGenericException(HandlerGenericExceptionTypes.ALREADY_HAS_AN_TECHNICAL_TEAM_MEMBER
                        .toString());
            }

            if (callBLO.get(supplierByCall.getIdCall()).isCaducedDeadLineToMakeSurveyTechnicalTeam()) {
                throw new HandlerGenericException(
                        HandlerGenericExceptionTypes.DATE_TO_MAKE_SURVEY_TECHNICAL_TEAM_EXCEEDED.toString());
            }

            supplierByCallBLO.changeState(SurveyStates.TECHNICAL_TEAM.toString(), answer.getIdSupplierByCall());
            supplierByCallBLO.setWhoTechnicalTeamMember(answer.getIdSupplierByCall(), userBLO.getNameUserInSession());
            answer.setDateResponse(new Date());
            return super.save(answer);
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.ROL_INVALID.toString());
        }
    }

    protected ReportOfCalificationsBySuppliers buildReportOfTechnicalTeam(String idSupplierByCall,
            ReportOfCalificationsBySuppliers recordOfReport, Map<String, String> parameters)
            throws HandlerGenericException {
        String idService = parameters.get("service");
        String idItem = parameters.get("item");
        ServiceBLO serviceBLO = new ServiceBLO();
        List<ServiceDTO> services = new ArrayList<ServiceDTO>();
        List<ItemDTO> items;
        if (null != idService && !idService.trim().isEmpty()) {
            services.add(serviceBLO.get(idService));
        } else {
            List<DTO> temporalServices = serviceBLO.getAll();
            for (DTO temporalService : temporalServices) {
                services.add((ServiceDTO) temporalService);
            }
        }

        List<Service> serviceToReport = new ArrayList<Service>();
        ReportOfCalificationsBySuppliers report = new ReportOfCalificationsBySuppliers();
        short counterAllItems = 0;
        short sumScoreAllItems = 0;
        short counterAllItemsWithoutAnswer = 0;
        for (ServiceDTO service : services) {
            short sumScoreByItemsInService = 0;
            ReportOfCalificationsBySuppliers.Service serviceRecord = report.new Service();
            serviceRecord.name = service.getName();
            ItemBLO itemBLO = new ItemBLO();
            items = itemBLO.getItemsByIdItemOrIdService(idItem, service.getId());
            TechnicalTeamCommentBLO technicalTeamCommentBLO = new TechnicalTeamCommentBLO();
            serviceRecord.comment = technicalTeamCommentBLO.getCommentBySupplierByCallAndIdService(idSupplierByCall,
                    service.getId());

            List<Item> itemToReport = new ArrayList<Item>();
            short counterItems = (short) items.size();
            short counterItemsWithoutAnswer = 0;
            counterAllItems = (short) (counterAllItems + (short) items.size());
            for (ItemDTO item : items) {
                ReportOfCalificationsBySuppliers.Item itemRecord = report.new Item();
                itemRecord.name = item.getName();

                TechnicalTeamAnswerBLO technicalTeamAnswerBLO = new TechnicalTeamAnswerBLO();
                TechnicalTeamAnswerDTO technicalTeamAnswer = technicalTeamAnswerBLO.getTechnicalteamAnswer(
                        idSupplierByCall, service.getId(), item.getId());

                short scoreEvaluation = 0;
                if (null != technicalTeamAnswer.getId()) {
                    EvaluationScaleBLO evaluationScaleBLO = new EvaluationScaleBLO();
                    scoreEvaluation = evaluationScaleBLO.get(technicalTeamAnswer.getIdEvaluationScale()).getScore();
                    sumScoreByItemsInService = (short) (sumScoreByItemsInService + scoreEvaluation);
                    sumScoreAllItems = (short) (sumScoreAllItems + scoreEvaluation);
                    itemRecord.answer = scoreEvaluation;
                } else {
                    itemRecord.answer = SCORE_OF_NA;
                    counterItemsWithoutAnswer = (short) (counterItemsWithoutAnswer + 1);
                    counterAllItemsWithoutAnswer = (short) (counterAllItemsWithoutAnswer + 1);
                }

                itemToReport.add(itemRecord);
            }

            serviceRecord.items = itemToReport;
            if (counterItems == counterItemsWithoutAnswer) {
                serviceRecord.total = SCORE_OF_NA;
            } else {
                serviceRecord.total = (double) sumScoreByItemsInService / (double) counterItems;
            }

            serviceToReport.add(serviceRecord);
        }

        if (counterAllItems == counterAllItemsWithoutAnswer) {
            recordOfReport.setTotalScoreInService(SCORE_OF_NA);
        } else {
            double totalScoreInService = (double) sumScoreAllItems / (double) counterAllItems;
            recordOfReport.setTotalScoreInService(totalScoreInService);
        }

        recordOfReport.setServices(serviceToReport);
        return recordOfReport;
    }

    public TechnicalTeamAnswerDTO getTechnicalteamAnswer(String idSupplierByCall, String idService, String idItem)
            throws HandlerGenericException {
        TechnicalTeamAnswerDAO technicalTeamAnswerDAO = new TechnicalTeamAnswerDAO();
        return technicalTeamAnswerDAO.getTechnicalteamAnswer(idSupplierByCall, idService, idItem);
    }

}