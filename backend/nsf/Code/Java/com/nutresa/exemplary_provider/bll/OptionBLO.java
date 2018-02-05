package com.nutresa.exemplary_provider.bll;

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

    protected short getMaxScoreInQuestion(String idQuestion) throws HandlerGenericException {
        short score = 0;
        OptionDTO option = getMaxOptionByQuestion(idQuestion);

        if (null != option) {
            score = option.getScore();
        }

        return score;
    }
}
