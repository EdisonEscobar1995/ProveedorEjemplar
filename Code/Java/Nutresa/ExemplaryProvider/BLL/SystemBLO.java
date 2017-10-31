package Nutresa.ExemplaryProvider.BLL;

import Nutresa.ExemplaryProvider.DAL.SystemDAO;
import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemBLO {
	public SystemBLO(){
	}

//	public SystemDTO loadSystem(){
//		SystemDTO systemDTO = new SystemDTO();
//		SystemDAO systemDAO = new SystemDAO();
//		if (systemDAO.isFound()){
//			systemDTO = systemDAO.loadSystem(systemDTO);
//		}
//		return systemDTO;
//	}
//
//	public void saveSystem(SystemDTO systemDTO){
//		SystemDAO systemDAO = new SystemDAO();
//		if (systemDAO.isFound()){
//			systemDAO.updateSystem(systemDTO);
//		}else{
//			systemDAO.createSystem(systemDTO);
//		}
//	}
	public SystemDTO getSystem(){
		SystemDAO systemDAO = new SystemDAO();
		return systemDAO.getSystem();	
	}
	
}
