package Nutresa.ExemplaryProvider.API;

import com.google.gson.Gson;

import Nutresa.ExemplaryProvider.BLL.SystemBLO;
import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemAPI extends BaseAPI{
	
	public SystemAPI(){
	}
	
	public Object[] getLoad(){
		SystemBLO systemBLO = new SystemBLO();
		Object[] obj = {systemBLO.getSystem()};
		return obj;
	}
	
//	public Object[] save(String json){
//		Gson gson = new Gson();
//		SystemBLO systemBLO = new SystemBLO();
//		systemBLO.saveSystem(gson.fromJson(json, SystemDTO.class));
//		return null;
//	}
}
