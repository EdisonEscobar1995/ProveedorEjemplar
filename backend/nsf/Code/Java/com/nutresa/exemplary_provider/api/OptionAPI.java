package com.nutresa.exemplary_provider.api;

import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.bll.OptionBLO;
import com.nutresa.exemplary_provider.dtl.OptionDTO;
import com.nutresa.exemplary_provider.dtl.ServletResponseDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class OptionAPI extends GenericAPI<OptionDTO, OptionBLO> {

    public OptionAPI() {
        super(OptionDTO.class, OptionBLO.class);
    }

    public ServletResponseDTO<List<OptionDTO>> getOptionsByQuestion(Map<String, String> parameters) {
        ServletResponseDTO<List<OptionDTO>> response = null;
        OptionBLO optionBLO = new OptionBLO();
        try {
            response = new ServletResponseDTO<List<OptionDTO>>(optionBLO.getOptionsByQuestion(parameters
                    .get("idQuestion")));
        } catch (HandlerGenericException exception) {
            response = new ServletResponseDTO<List<OptionDTO>>(exception);
        }

        return response;
    }

}