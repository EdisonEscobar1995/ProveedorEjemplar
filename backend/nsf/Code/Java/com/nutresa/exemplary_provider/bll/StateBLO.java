package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.StateDAO;
import com.nutresa.exemplary_provider.dtl.StateDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class StateBLO extends GenericBLO<StateDTO, StateDAO> {

    public StateBLO() {
        super(StateDAO.class);
    }

    protected StateDTO getStateByShortName(String shortName) throws HandlerGenericException {
        StateDAO stateDAO = new StateDAO();
        StateDTO response = null;
        response = stateDAO.getStateByShortName(shortName);

        if (null == response) {
            throw new HandlerGenericException("STATE_NOT_FOUND");
        }

        return response;
    }

}
