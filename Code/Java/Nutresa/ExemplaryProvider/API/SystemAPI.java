package Nutresa.ExemplaryProvider.API;
import java.util.ArrayList;

import Nutresa.ExemplaryProvider.BLL.SystemBLO;
import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemAPI extends BaseAPI{
	
	public SystemAPI(){
	}
	
	public SystemDTO getSystem(){	
		SystemBLO systemBLO = new SystemBLO();
		return systemBLO.get();
	}
	
	public ArrayList<SystemDTO> getSystemAll(){	
		SystemBLO systemBLO = new SystemBLO();
		return systemBLO.getAll();
	}
	
	public boolean getSave(){
		SystemBLO systemBLO = new SystemBLO();
		systemBLO.save();
		return true;
	}
	
	public boolean getUpdate(){
		SystemBLO systemBLO = new SystemBLO();
		systemBLO.update();
		return true;
	}
	
	public boolean getDelete(){
		SystemBLO systemBLO = new SystemBLO();
		systemBLO.delete();
		return true;
	}	
}
