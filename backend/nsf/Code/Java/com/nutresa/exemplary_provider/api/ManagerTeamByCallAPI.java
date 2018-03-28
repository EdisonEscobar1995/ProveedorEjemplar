package com.nutresa.exemplary_provider.api;

import com.nutresa.exemplary_provider.bll.ManagerTeamByCallBLO;
import com.nutresa.exemplary_provider.dtl.ManagerTeamByCallDTO;

public class ManagerTeamByCallAPI extends GenericAPI<ManagerTeamByCallDTO, ManagerTeamByCallBLO> {

    public ManagerTeamByCallAPI() {
        super(ManagerTeamByCallDTO.class, ManagerTeamByCallBLO.class);
    }

}
