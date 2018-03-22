package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.TechnicalTeamAnswerBLO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.TechnicalTeamAnswerDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TechnicalTeamAnswerAPI extends GenericAPI<TechnicalTeamAnswerDTO, TechnicalTeamAnswerBLO> {
    public TechnicalTeamAnswerAPI() {
        super(TechnicalTeamAnswerDTO.class, TechnicalTeamAnswerBLO.class);
    }

    @Override
    public ServletResponseDTO<TechnicalTeamAnswerDTO> save(TechnicalTeamAnswerDTO dto) {
        ServletResponseDTO<TechnicalTeamAnswerDTO> response = null;
        TechnicalTeamAnswerBLO technicalTeamAnswerBLO = new TechnicalTeamAnswerBLO();
        try {
            response = new ServletResponseDTO<TechnicalTeamAnswerDTO>(technicalTeamAnswerBLO.save(dto));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<TechnicalTeamAnswerDTO>(exception);
            response.setNotice(technicalTeamAnswerBLO.getNotice());
        }

        return response;
    }

}