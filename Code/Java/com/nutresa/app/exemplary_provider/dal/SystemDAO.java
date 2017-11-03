package com.nutresa.app.exemplary_provider.dal;

import com.nutresa.app.exemplary_provider.dtl.SystemDTO;

public class SystemDAO extends GenericDAO<SystemDTO> {
	public SystemDAO() {
		super(SystemDTO.class);
		this.viewName = "vwDevIds";
	}
}
