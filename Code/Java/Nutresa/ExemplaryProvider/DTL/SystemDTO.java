package Nutresa.ExemplaryProvider.DTL;

import java.util.Date;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;

public class SystemDTO {

	@Expose
	private String id;
	private String host = "";
	private String sharedFolder = "5";
	private String form = "frSystem";
	private Date date;
	
	public String getJson() {
		 date = new Date();
		 Gson gson = new GsonBuilder()
	     .enableComplexMapKeySerialization()
	     .excludeFieldsWithoutExposeAnnotation()
	     .serializeNulls()
	     .setDateFormat("Y/m/d")
	     .setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE)
	     .setPrettyPrinting()
	     .setVersion(1.0)
	     .create();
		System.out.println("Antes");
		return gson.toJson(this);
	}

//	public String getForm() {
//		return form;
//	}
//	public String getId() {
//		return id;
//	}
//	public void setId(String id) {
//		this.id = id;
//	}
//	public String getHost() {
//		return host;
//	}
//	public void setHost(String host) {
//		this.host = host;
//	}
//	public String getSharedFolder() {
//		return sharedFolder;
//	}
//	public void setSharedFolder(String sharedFolder) {
//		this.sharedFolder = sharedFolder;
//	}
}
