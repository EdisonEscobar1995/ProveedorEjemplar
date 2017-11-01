package Nutresa.ExemplaryProvider.API;
import java.util.ArrayList;
import java.util.Map;

import Nutresa.ExemplaryProvider.BLL.SystemBLO;
import Nutresa.ExemplaryProvider.DTL.ServletResponseDTO;
import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemAPI extends GenericAPI{
	
	public SystemAPI(){
		super(SystemDTO.class);
	}
	
	public ServletResponseDTO<SystemDTO> getSystem(Map<String, String> param){	
		SystemBLO systemBLO = new SystemBLO();
		return systemBLO.get(param);
	}
	
	public ServletResponseDTO<ArrayList<SystemDTO>> getSystemAll(){	
		SystemBLO systemBLO = new SystemBLO();
		return systemBLO.getAll();
	}
	
	public ServletResponseDTO<?> postSave(SystemDTO dto){		
		SystemBLO systemBLO = new SystemBLO();
		return systemBLO.save(dto);
	}
	
	public ServletResponseDTO<?> getUpdate(SystemDTO dto){
		SystemBLO systemBLO = new SystemBLO();
		return systemBLO.update(dto);
	}
	
	public boolean getDelete(){
		SystemBLO systemBLO = new SystemBLO();
		systemBLO.delete();
		return true;
	}	
}
