package Nutresa.ExemplaryProvider.API;

import Nutresa.ExemplaryProvider.DTL.NewDTO;
import Nutresa.ExemplaryProvider.Types.Tools;

public class NewAPI extends BaseAPI {
    private static final long serialVersionUID = 2L;
    
    public String get() {
        return "ok";
    }
    
    public String get(String a, int b) {
        return "ok [" + a + "], [" + b + "]";
    }
    
    public String put() {
        return "ok";
    }
    
    public String getCualquierCosa(NewDTO a, NewDTO b, NewDTO c) {
        return "cualquier";
    }

    public String getCualquierCosa(NewDTO a, String e) {
        return "cualquier 2 parameters " + Tools.print_r(a);
    }
    
}

