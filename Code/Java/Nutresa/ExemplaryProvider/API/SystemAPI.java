package Nutresa.ExemplaryProvider.API;

import Nutresa.ExemplaryProvider.BLL.SystemBLO;
import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemAPI extends BaseAPI {
    private SystemDTO system;
    
    public SystemDTO getSystem(String idSystem){
        SystemBLO systemBLO = new SystemBLO();
        return systemBLO.getSystem(idSystem);
    }
    
}
