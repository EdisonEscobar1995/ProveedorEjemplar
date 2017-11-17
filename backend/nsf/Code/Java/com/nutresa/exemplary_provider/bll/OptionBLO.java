package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.OptionDAO;
import com.nutresa.exemplary_provider.dtl.OptionDTO;

public class OptionBLO extends GenericBLO<OptionDTO, OptionDAO> {
    public OptionBLO() {
        super(OptionDAO.class);
    }
}
