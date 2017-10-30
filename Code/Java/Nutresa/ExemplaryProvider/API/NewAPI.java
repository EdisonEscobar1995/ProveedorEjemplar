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
    
    public String[] postCualquier(NewDTO a, int b) {
        String[] g = new String[3];
        message = "Datos procesados correctmente";
        g[0] = Tools.print_r(a);
        g[1] = "" + b;
        return g;
    }
    
    public NewDTO[] getCualquier(String a, String b, String c) {
        NewDTO[] g = new NewDTO[3];
        message = "Parametros pasados [" + a + "], [" + b + "], [" + c + "]";
        /*
         * g[0] = new NewDTO("dfdfdf", 4, 343, "", "dfdrd"); g[1] = new
         * NewDTO("sdfdsasdfdfdf", 4, 343, "", "dfdr34534d"); g[2] = new
         * NewDTO("dfdfd45343525f", 4, 343, "", "dfd34534rd");
         */
        return g;
    }

    public NewDTO[] getCualquier() {
        NewDTO[] g = new NewDTO[3];
        message = "Parametros pasados";
        /*
         * g[0] = new NewDTO("dfdfdf", 4, 343, "", "dfdrd"); g[1] = new
         * NewDTO("sdfdsasdfdfdf", 4, 343, "", "dfdr34534d"); g[2] = new
         * NewDTO("dfdfd45343525f", 4, 343, "", "dfd34534rd");
         */
        return g;
    }
}

