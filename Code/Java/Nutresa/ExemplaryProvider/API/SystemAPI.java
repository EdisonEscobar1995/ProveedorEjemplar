package Nutresa.ExemplaryProvider.API;

import Nutresa.ExemplaryProvider.BLL.SystemBLO;
import Nutresa.ExemplaryProvider.DTL.SystemDTO;

public class SystemAPI {

    private SystemDTO dto;

    public SystemAPI() {
	dto = new SystemDTO();
    }

    public SystemDTO getDto() {
	return dto;
    }

    public String getDtoJson() {
	// GsonBuilder builder = new GsonBuilder();
	// Gson gson = builder.create();
	// System.out.println("Antes");
	// String json = gson.toJson(this.dto);
	return this.dto.getJson();
	// String json = "";
	// try {
	// json = JsonGenerator.toJson(JsonJavaFactory.instance, this.dto);
	// } catch (JsonException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// } catch (IOException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// }
	// System.out.println(json);
	// return json;
    }

    public void setDto(SystemDTO dto) {
	this.dto = dto;
    }

    public void load() {
	SystemBLO systemBLO = new SystemBLO();
	dto = systemBLO.loadSystem();
    }

    public void save() {
	SystemBLO systemBLO = new SystemBLO();
	systemBLO.saveSystem(dto);
    }
}
