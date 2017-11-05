package com.nutresa.app.exemplary_provider.dal;

import com.nutresa.app.exemplary_provider.dtl.SystemDTO;

public class SystemDAO extends GenericDAO<SystemDTO> {
	@SuppressWarnings("static-access")
	public SystemDAO() {
		super(SystemDTO.class);
		this.viewAll = "vwSystem";
	}
}
