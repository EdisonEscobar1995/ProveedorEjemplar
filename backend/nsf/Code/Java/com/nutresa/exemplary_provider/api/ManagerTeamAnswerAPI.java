package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.ManagerTeamAnswerBLO;
import com.nutresa.exemplary_provider.dtl.ManagerTeamAnswerDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class ManagerTeamAnswerAPI extends GenericAPI<ManagerTeamAnswerDTO, ManagerTeamAnswerBLO> {
    public ManagerTeamAnswerAPI() {
        super(ManagerTeamAnswerDTO.class, ManagerTeamAnswerBLO.class);
    }

    @Override
    public ServletResponseDTO<ManagerTeamAnswerDTO> save(ManagerTeamAnswerDTO dto) {
        ServletResponseDTO<ManagerTeamAnswerDTO> response = null;
        ManagerTeamAnswerBLO managerTeamAnswerBLO = new ManagerTeamAnswerBLO();
        try {
            response = new ServletResponseDTO<ManagerTeamAnswerDTO>(managerTeamAnswerBLO.save(dto));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<ManagerTeamAnswerDTO>(exception);
            response.setNotice(managerTeamAnswerBLO.getNotice());
        }

        return response;
    }

}