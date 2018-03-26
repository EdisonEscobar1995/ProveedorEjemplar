package com.nutresa.exemplary_provider.bll;

import java.util.Date;

import com.nutresa.exemplary_provider.dal.TechnicalTeamCommentDAO;
import com.nutresa.exemplary_provider.dtl.HandlerGenericExceptionTypes;
import com.nutresa.exemplary_provider.dtl.Rol;
import com.nutresa.exemplary_provider.dtl.SupplierByCallDTO;
import com.nutresa.exemplary_provider.dtl.SurveyStates;
import com.nutresa.exemplary_provider.dtl.TechnicalTeamCommentDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TechnicalTeamCommentBLO extends GenericBLO<TechnicalTeamCommentDTO, TechnicalTeamCommentDAO> {
    private String notice;

    public TechnicalTeamCommentBLO() {
        super(TechnicalTeamCommentDAO.class);
    }

    public String getNotice() {
        return notice;
    }

    @Override
    public TechnicalTeamCommentDTO save(TechnicalTeamCommentDTO comment) throws HandlerGenericException {
        UserBLO userBLO = new UserBLO();
        SupplierByCallBLO supplierByCallBLO = new SupplierByCallBLO();

        if (userBLO.isRol(Rol.TECHNICAL_TEAM.toString())) {
            if (supplierByCallBLO.isFromTechnicalTeam(comment.getIdSupplierByCall())) {
                SupplierByCallDTO supplierByCall = supplierByCallBLO.get(comment.getIdSupplierByCall());
                notice = supplierByCall.getWhoEvaluateOfTechnicalTeam();
                throw new HandlerGenericException(HandlerGenericExceptionTypes.ALREADY_HAS_AN_TECHNICAL_TEAM_MEMBER
                        .toString());
            }

            supplierByCallBLO.changeState(SurveyStates.TECHNICAL_TEAM.toString(), comment.getIdSupplierByCall());
            supplierByCallBLO.setWhoTechnicalTeamMember(comment.getIdSupplierByCall(), userBLO.getNameUserInSession());
            comment.setDateResponse(new Date());
            return super.save(comment);
        } else {
            throw new HandlerGenericException(HandlerGenericExceptionTypes.ROL_INVALID.toString());
        }
    }

    public String getCommentBySupplierByCallAndIdService(String idSupplierByCall, String idService)
            throws HandlerGenericException {
        TechnicalTeamCommentDAO technicalTeamCommentDAO = new TechnicalTeamCommentDAO();
        return technicalTeamCommentDAO.getCommentBySupplierByCallAndIdService(idSupplierByCall, idService);
    }

}