package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.TechnicalTeamBLO;
import com.nutresa.exemplary_provider.dtl.TechnicalTeamDTO;

public class TechnicalTeamAPI extends GenericAPI<TechnicalTeamDTO, TechnicalTeamBLO> {
    public TechnicalTeamAPI() {
        super(TechnicalTeamDTO.class, TechnicalTeamBLO.class);
    }

}