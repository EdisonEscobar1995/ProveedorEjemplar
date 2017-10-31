package Nutresa.ExemplaryProvider.DAL;

import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemDAO extends GenericFactory<SystemDTO>{
	//GenericFactory<SystemDTO> factory = new GenericFactory<SystemDTO>("frSystem","vwDevAll");
	
//	public boolean isFound() {
//		return IsFound();
//	}

	public SystemDAO() {
		
	}
	public SystemDTO getSystem() {
		return get("vwDevIds", "frSystem");
	}
//	public SystemDTO loadSystem(SystemDTO systemDTO) {
//		return GetDocument(systemDTO);
//	}
//
//	public void createSystem(SystemDTO systemDTO) {
//		CreateDocument(systemDTO);
//	}
//
//	public void updateSystem(SystemDTO systemDTO) {
//		factory.UpdateDocument(systemDTO);
//	}
}
