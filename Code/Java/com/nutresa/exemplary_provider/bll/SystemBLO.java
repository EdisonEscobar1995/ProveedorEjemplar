package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SystemDAO;
import com.nutresa.exemplary_provider.dtl.SystemDTO;

public class SystemBLO extends GenericBLO<SystemDTO, SystemDAO> {
	
	public SystemBLO() {
		super(SystemDAO.class);
	}
	
	@Override
	public SystemDTO save(SystemDTO dto) throws Exception{
        SystemDAO dao = new SystemDAO();
        if ("".equals(dto.getId())) {
            dto = dao.saveProfile(dto.getForm(), dto);
        } else {
            dto = dao.update(dto.getId(), dto);
        }
            
        return dto;
    }

}