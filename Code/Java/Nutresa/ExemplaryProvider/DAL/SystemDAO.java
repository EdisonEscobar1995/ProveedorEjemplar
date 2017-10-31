package Nutresa.ExemplaryProvider.DAL;

import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemDAO extends GenericFactory<SystemDTO>{
	public SystemDAO() {
		super(SystemDTO.class);
		this.viewName = "vwDevIds";
	}
}
