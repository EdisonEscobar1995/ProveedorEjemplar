package com.nutresa.exemplary_provider.bll;

import com.nutresa.exemplary_provider.dal.SystemDAO;
import com.nutresa.exemplary_provider.dtl.SystemDTO;

public class SystemBLO extends GenericBLO<SystemDTO, SystemDAO> {
	
	public SystemBLO() {
		super(SystemDAO.class);
	}

}