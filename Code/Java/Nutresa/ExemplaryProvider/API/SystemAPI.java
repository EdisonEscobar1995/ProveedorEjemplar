package Nutresa.ExemplaryProvider.API;

import Nutresa.ExemplaryProvider.BLL.SystemBLO;
import Nutresa.ExemplaryProvider.DTL.RequestReturnDTO;
import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemAPI extends BaseAPI {
    private SystemDTO systemDTO;
    private SystemBLO systemBLO;
    
    public SystemAPI(SystemBLO systemBLO) {
        this.systemBLO = systemBLO;
    }

    public SystemDTO getSystem(String idSystem){
        return systemBLO.getSystem(idSystem);
    }
    
    public RequestReturnDTO postSaveSystem(SystemDTO systemDTO){
        return systemBLO.SaveSystem(systemDTO);; 
    }
    
}

