package Nutresa.ExemplaryProvider.DAL;

import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemDAO extends GenericFactory<SystemDTO>{
	
	//GenericFactory<SystemDTO> factory = new GenericFactory<SystemDTO>("frSystem","vwDevAll");
	

	public SystemDAO() {
	}
	
	public SystemDTO get(String id) {
		return get(id);
	}
	/*
	public void createSystem(SystemDTO systemDTO) {
		factory.CreateDocument(systemDTO);
	}

	public void updateSystem(SystemDTO systemDTO) {
		factory.UpdateDocument(systemDTO);
	}*/
}
