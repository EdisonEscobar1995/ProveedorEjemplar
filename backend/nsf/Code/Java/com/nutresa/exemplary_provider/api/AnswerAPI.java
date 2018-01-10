package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.AnswerBLO;
import com.nutresa.exemplary_provider.dtl.AnswerDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AnswerAPI extends GenericAPI<AnswerDTO, AnswerBLO> {

    public AnswerAPI() {
        super(AnswerDTO.class, AnswerBLO.class);
    }

    public ServletResponseDTO<AnswerDTO> deleteMassive(AnswerDTO answer) {
        ServletResponseDTO<AnswerDTO> response = null;
        AnswerBLO answerBLO = new AnswerBLO();
        try {
            response = new ServletResponseDTO<AnswerDTO>(answerBLO.deleteMassive(answer));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<AnswerDTO>(exception);
        }

        return response;
    }

}
