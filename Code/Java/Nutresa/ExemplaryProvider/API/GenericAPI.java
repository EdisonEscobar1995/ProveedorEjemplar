package Nutresa.ExemplaryProvider.API;

import java.util.Map;
import java.io.BufferedReader;
import java.lang.reflect.Method;

import javax.faces.context.FacesContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ibm.xsp.extlib.component.picker.data.AbstractDominoViewPickerData.Result;
import com.ibm.xsp.extlib.util.ExtLibUtil;

import Nutresa.ExemplaryProvider.DTL.ServletResponseDTO;

public class GenericAPI extends AbstractXSPServlet {

	private Class<?> mClass;
	public GenericAPI(Class<?> mClass){
		this.mClass = mClass;
	}
	@SuppressWarnings("unchecked")
	@Override
	protected void doService(HttpServletRequest req, HttpServletResponse res,
			FacesContext facesContext, ServletOutputStream out)
	throws Exception {
		int status = 200;
		ServletResponseDTO response = null;
		Gson gson = new GsonBuilder().enableComplexMapKeySerialization().excludeFieldsWithoutExposeAnnotation().serializeNulls()
        .setDateFormat("Y/m/d").setPrettyPrinting().create();
		
		try{
			String reqMethod = req.getMethod();
			Map<String, String> param = (Map<String, String>)ExtLibUtil.resolveVariable(FacesContext.getCurrentInstance(), "param");
			String action = param.get("action");
			
			if( reqMethod.equals("GET") ) {
				Method m = this.getClass().getMethod(action,Map.class);
				response = (ServletResponseDTO) m.invoke(this,param);
				
			} else if(reqMethod.equals("POST")) {
				
				BufferedReader reader = req.getReader();
				String inputLine = null;
				StringBuffer stringBuffer = new StringBuffer();
				while ((inputLine = reader.readLine()) != null) {
					stringBuffer.append(inputLine);
				}
				reader.close();
				Method m = this.getClass().getMethod(action, this.mClass);
				
				response = (ServletResponseDTO) m.invoke(this, gson.fromJson(stringBuffer.toString(), this.mClass));
				
			} else if( reqMethod.equals("OPTIONS") ) {

				res.addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
				res.addHeader("Access-Control-Allow-Headers", "*");
				res.addHeader("Access-Control-Allow-Origin", "*");
				out.print(" ");

			} else {
				status = 405;
				response = new ServletResponseDTO(false, "what the devil are you trying to do, break the server?");
			}
		}catch (Exception e) {
			status = 500;
			response = new ServletResponseDTO(false, e.getMessage());
		}finally{
			res.setStatus(status);
			out.print(gson.toJson(response));
		}
		
	}
	
	private void doOption(){
		
	}
}
