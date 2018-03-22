package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.TechnicalTeamCommentBLO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.dtl.TechnicalTeamCommentDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class TechnicalTeamCommentAPI extends GenericAPI<TechnicalTeamCommentDTO, TechnicalTeamCommentBLO> {
    public TechnicalTeamCommentAPI() {
        super(TechnicalTeamCommentDTO.class, TechnicalTeamCommentBLO.class);
    }

    @Override
    public ServletResponseDTO<TechnicalTeamCommentDTO> save(TechnicalTeamCommentDTO dto) {
        ServletResponseDTO<TechnicalTeamCommentDTO> response = null;
        TechnicalTeamCommentBLO technicalTeamCommentBLO = new TechnicalTeamCommentBLO();
        try {
            response = new ServletResponseDTO<TechnicalTeamCommentDTO>(technicalTeamCommentBLO.save(dto));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<TechnicalTeamCommentDTO>(exception);
            response.setNotice(technicalTeamCommentBLO.getNotice());
        }

        return response;
    }

}