package Nutresa.ExemplaryProvider.DAL;

import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemDAO extends GenericDAO<SystemDTO>{
	public SystemDAO() {
		super(SystemDTO.class);
		this.viewName = "vwDevIds";
	}
}
