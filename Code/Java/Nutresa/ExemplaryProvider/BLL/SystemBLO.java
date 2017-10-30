package Nutresa.ExemplaryProvider.BLL;

import Nutresa.ExemplaryProvider.DAL.SystemDAO;
import Nutresa.ExemplaryProvider.DTL.RequestReturnDTO;
import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemBLO {
	private SystemDAO systemDAO;
	public SystemBLO(){
		this.systemDAO = new SystemDAO();
	}

//	public SystemDTO loadSystem(){
//		SystemDTO systemDTO = new SystemDTO();
//		SystemDAO systemDAO = new SystemDAO();
//		if (systemDAO.isFound()){
//			systemDTO = systemDAO.loadSystem(systemDTO);
//		}
//		
//		return systemDTO;
//	}
	
	public SystemDTO getSystem(String idSystem){
		return systemDAO.get("vwDevIds",idSystem);
	}

	public RequestReturnDTO SaveSystem(SystemDTO systemDTO) {
		return null;
	}
	
//	public void saveSystem(SystemDTO systemDTO){
//		SystemDAO systemDAO = new SystemDAO();
//		if (systemDAO.isFound()){
//			systemDAO.updateSystem(systemDTO);
//		}else{
//			systemDAO.createSystem(systemDTO);
//		}
//	}
}
