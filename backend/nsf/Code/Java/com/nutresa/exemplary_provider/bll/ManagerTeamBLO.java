package com.nutresa.exemplary_provider.bll;

import java.util.List;
import java.util.ArrayList;

import com.nutresa.exemplary_provider.dal.ManagerTeamDAO;
import com.nutresa.exemplary_provider.dtl.ManagerTeamDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ManagerTeamBLO extends GenericBLO<ManagerTeamDTO, ManagerTeamDAO> {

    public ManagerTeamBLO() {
        super(ManagerTeamDAO.class);
    }

    protected List<String> getIdOfManagerTeamMembersInCall(String idCall) throws HandlerGenericException {
        List<String> idMembers = new ArrayList<String>();
        ManagerTeamDAO managerTeamByCallDAO = new ManagerTeamDAO();
        List<ManagerTeamDTO> membersInCall = managerTeamByCallDAO.getManagerTeamMembersInCall(idCall);
        for (ManagerTeamDTO managerTeamMember : membersInCall) {
            idMembers.add(managerTeamMember.getIdUser());
        }

        return idMembers;
    }

}
