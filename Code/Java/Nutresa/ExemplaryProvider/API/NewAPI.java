package Nutresa.ExemplaryProvider.API;

import Nutresa.ExemplaryProvider.DTL.NewDTO;

public class NewAPI extends BaseAPI {
    private static final long serialVersionUID = 2L;
    
    public String get() {
        return "ok";
    }
    
    public String getCualquierCosa() {
        return "cualquier";
    }
    
    public String[] postCualquierCosa() {
        String[] g = new String[3];
        message = "Datos procesados correctmente";
        g[0] = "232323";
        g[1] = "sdffs";
        g[2] = "rtret";
        return g;
    }
    
    public NewDTO[] getCualquier(NewDTO n) {
        NewDTO[] g = new NewDTO[3];
        message = "Datos procesados correctmente del NewDTO";
        g[0] = new NewDTO("dfdfdf", 4, 343, "", "dfdrd");
        g[1] = new NewDTO("sdfdsasdfdfdf", 4, 343, "", "dfdr34534d");
        g[2] = new NewDTO("dfdfd45343525f", 4, 343, "", "dfd34534rd");
        return g;
    }
}

