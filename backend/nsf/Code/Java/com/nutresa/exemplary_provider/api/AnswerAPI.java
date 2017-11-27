package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.AnswerBLO;
import com.nutresa.exemplary_provider.dtl.AnswerDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class AnswerAPI extends GenericAPI<AnswerDTO, AnswerBLO> {

    public AnswerAPI() {
        super(AnswerDTO.class, AnswerBLO.class);
    }

    public ServletResponseDTO<AnswerDTO> deleteAnswers(AnswerDTO answer) {
        AnswerBLO answerBLO = new AnswerBLO();
        ServletResponseDTO<AnswerDTO> response = null;
        try {
            response = new ServletResponseDTO<AnswerDTO>(answerBLO.deleteAnswers(answer));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<AnswerDTO>(exception);
        }

        return response;
    }

}
