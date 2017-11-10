package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SystemDAO;
import com.nutresa.exemplary_provider.dtl.SystemDTO;
import com.nutresa.exemplary_provider.utils.HandlerGenericException;

public class SystemBLO extends GenericBLO<SystemDTO, SystemDAO> {

    public SystemBLO() {
        super(SystemDAO.class);
    }

    @Override
    public SystemDTO save(SystemDTO dto) throws HandlerGenericException{
        try {
            SystemDAO dao = new SystemDAO();
            if ("".equals(dto.getId())) {
                dto = dao.saveProfile(dto.getForm(), dto);
            } else {
                dto = dao.update(dto.getId(), dto);
            }
        } catch (Exception exception) {
            throw new HandlerGenericException(exception);
        }

        return dto;
    }

}