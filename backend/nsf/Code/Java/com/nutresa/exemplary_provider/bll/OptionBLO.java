package com.nutresa.exemplary_provider.bll;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nutresa.exemplary_provider.dal.OptionDAO;
import com.nutresa.exemplary_provider.dtl.OptionDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class OptionBLO extends GenericBLO<OptionDTO, OptionDAO> {
    public OptionBLO() {
        super(OptionDAO.class);
    }

    public OptionDTO getMaxOptionByQuestion(String idQuestion) throws HandlerGenericException {
        OptionDAO optionDAO = new OptionDAO();
        return optionDAO.getOptionWithMaxScoreByQuestion(idQuestion);
    }

    protected short getMaxScoreInQuestion(String idQuestion, OptionDTO option) throws HandlerGenericException {
        short score = 0;
        OptionDAO optionDAO = new OptionDAO();
        OptionDTO optionWithMaxValue = getMaxOptionByQuestion(idQuestion);

        if (optionDAO.generateDependenceInQuestion(option)) {
            score = option.getScore();
        } else {
            if (null != optionWithMaxValue) {
                score = optionWithMaxValue.getScore();
            }
        }

        return score;
    }

    protected static Map<String, List<String>> getEntityWithFieldsToTranslate() {
        Map<String, List<String>> entityWithFields = new HashMap<String, List<String>>();
        List<String> fields = new ArrayList<String>();
        fields.add("wording");
        entityWithFields.put("Option", fields);
        return entityWithFields;
    }

    public List<OptionDTO> getOptionsByQuestion(String idQuestion) throws HandlerGenericException {
        OptionDAO optionDAO = new OptionDAO();
        return optionDAO.getOptionsByQuestion(idQuestion);
    }
}
