package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.ManagerTeamBLO;
import com.nutresa.exemplary_provider.dtl.ManagerTeamDTO;

public class ManagerTeamAPI extends GenericAPI<ManagerTeamDTO, ManagerTeamBLO> {

    public ManagerTeamAPI() {
        super(ManagerTeamDTO.class, ManagerTeamBLO.class);
    }

}
