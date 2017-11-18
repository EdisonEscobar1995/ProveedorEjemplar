package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SupplyDAO;
import com.nutresa.exemplary_provider.dtl.SupplyDTO;

public class SupplyBLO extends GenericBLO<SupplyDTO, SupplyDAO> {
    public SupplyBLO() {
        super(SupplyDAO.class);
    }
}
