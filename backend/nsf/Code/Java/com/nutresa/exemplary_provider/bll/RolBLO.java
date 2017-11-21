package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.RolDAO;
import com.nutresa.exemplary_provider.dtl.RolDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class RolBLO extends GenericBLO<RolDTO, RolDAO> {

    public RolBLO() {
        super(RolDAO.class);
    }

    public RolDTO getIdRolLiberator() throws HandlerGenericException {
        RolDAO dao = new RolDAO();
        RolDTO response = null;
        try {
            response = dao.getIdRolByShortName("LIBERATOR");
        } catch (HandlerGenericException exception) {
            throw new HandlerGenericException(exception);
        }

        return response;
    }

}
