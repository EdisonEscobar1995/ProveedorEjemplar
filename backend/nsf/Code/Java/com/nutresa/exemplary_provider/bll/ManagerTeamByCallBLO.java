package com.nutresa.exemplary_provider.bll;

import java.util.List;
import java.util.ArrayList;

import com.nutresa.exemplary_provider.dal.ManagerTeamByCallDAO;
import com.nutresa.exemplary_provider.dtl.ManagerTeamByCallDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ManagerTeamByCallBLO extends GenericBLO<ManagerTeamByCallDTO, ManagerTeamByCallDAO> {

    public ManagerTeamByCallBLO() {
        super(ManagerTeamByCallDAO.class);
    }

    protected List<String> getIdOfManagerTeamMembersInCall(String idCall) throws HandlerGenericException {
        List<String> idMembers = new ArrayList<String>();
        ManagerTeamByCallDAO managerTeamByCallDAO = new ManagerTeamByCallDAO();
        List<ManagerTeamByCallDTO> membersInCall = managerTeamByCallDAO.getManagerTeamMembersInCall(idCall);
        for (ManagerTeamByCallDTO managerTeamMember : membersInCall) {
            idMembers.add(managerTeamMember.getIdUser());
        }

        return idMembers;
    }

}
