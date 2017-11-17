package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SectorDAO;
import com.nutresa.exemplary_provider.dtl.SectorDTO;

public class SectorBLO extends GenericBLO<SectorDTO, SectorDAO> {

    public SectorBLO() {
        super(SectorDAO.class);
    }

}
