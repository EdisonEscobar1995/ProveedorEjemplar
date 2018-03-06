package com.nutresa.exemplary_provider.bll;

import java.util.Date;

import com.nutresa.exemplary_provider.dal.TechnicalTeamAnswerDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.TechnicalTeamAnswerDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TechnicalTeamAnswerBLO extends GenericBLO<TechnicalTeamAnswerDTO, TechnicalTeamAnswerDAO> {

    private String notice;

    public String getNotice() {
        return notice;
    }

    public TechnicalTeamAnswerBLO() {
        super(TechnicalTeamAnswerDAO.class);
    }

    @Override
    public TechnicalTeamAnswerDTO save(TechnicalTeamAnswerDTO dto) throws HandlerGenericException {
        UserBLO userBLO = new UserBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();

        if (userBLO.isRol(Rol.TECHNICAL_TEAM.toString())) {
            if (supplierByCallBLO.isFromTechnicalTeam(dto.getIdSupplierByCall())) {
                SupplierByCallDTO supplierByCall = supplierByCallBLO.get(dto.getIdSupplierByCall());
                notice = supplierByCall.getWhoEvaluateOfTechnicalTeam();
                throw new HandlerGenericException(HandlerGenericExceptionTypes.ALREADY_HAS_AN_TECHNICAL_TEAM_MEMBER
                        .toString());
            }

            supplierByCallBLO.changeState(SurveyStates.TECHNICAL_TEAM.toString(), dto.getIdSupplierByCall());
            supplierByCallBLO.setWhoTechnicalTeamMember(dto.getIdSupplierByCall(), userBLO.getCommonName(userBLO
                    .getUserInSession().getName()));
            dto.setDateResponseTechnicalTeamMember(new Date());
            return super.save(dto);
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.ROL_INVALID.toString());
        }

    }

}