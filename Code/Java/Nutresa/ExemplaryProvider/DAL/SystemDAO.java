package Nutresa.ExemplaryProvider.DAL;

import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemDAO{
	
	GenericFactory<SystemDTO> factory = new GenericFactory<SystemDTO>("frSystem","vwDevAll");
	
	public boolean isFound() {
		return factory.IsFound();
	}

	public SystemDAO() {
	}

	public SystemDTO loadSystem(SystemDTO systemDTO) {
		return factory.GetDocument(systemDTO);
	}

	public void createSystem(SystemDTO systemDTO) {
		factory.CreateDocument(systemDTO);
	}

	public void updateSystem(SystemDTO systemDTO) {
		factory.UpdateDocument(systemDTO);
	}
}
