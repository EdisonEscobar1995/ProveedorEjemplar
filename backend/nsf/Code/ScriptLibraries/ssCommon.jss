var $ = function()	{
}

function urlDocument(){	
	return view.getPageName() + "?documentId=" + document1.getDocument().getUniversalID() + "&action=editDocument";
}

function postSaveDocumento(page){	
	var message = "Archivo cargado";	
	sessionScope.alertSuccess = message;
	if (page){
		context.redirectToPage(page)
	}
}

function validateAccess(document1){
	var webDbName = getWebDbName();

	if(session.getEffectiveUserName() == "Anonymous"){
		var externalCtx = facesContext.getExternalContext();
		externalCtx.redirect("/"+webDbName+"?login&redirectto=/"+webDbName+view.getPageName()); 
	}else{
		if(!isAdmin()){
			context.redirectToPage("xpError.xsp?Open&cod=1");
		}
	}
}

function isAdmin(){
	return database.queryAccessRoles(session.getEffectiveUserName()).contains("[Administrador]")
}

function getNotifications(){
	var notifications = {
		success: sessionScope.alertSuccess ? sessionScope.alertSuccess : "",
		info: sessionScope.alertInfo ? sessionScope.alertInfo : "",
		warning: sessionScope.alertWarning ? sessionScope.alertWarning : "",
		error: sessionScope.alertError ? sessionScope.alertError : ""
	}
	sessionScope.alertSuccess = null;
	sessionScope.alertInfo = null;
	sessionScope.alertWarning = null;
	sessionScope.alertError = null;
	
	return notifications;
}

$.each = function(obj, callback){ /*Método estático*/
	if (null === obj){
		return false;
	}
	for (var x in obj) {	    
		if (obj.hasOwnProperty(x)) {
			callback.call(obj, x, obj[x]);
		}
	}   
}
   
function headerResponse(contentType, oHeaders){
	// The external context gives access to the servlet environment
	var exCon = facesContext.getExternalContext(); 

	// The writer is the closest you get to a PRINT statement
	// If you need to output binary data, use the stream instead
	var writer = facesContext.getResponseWriter();

	// The servlet's response, check the J2EE documentation what you can do
	var response = exCon.getResponse();

	response.setContentType(contentType);
	$.each(oHeaders, function(key, value){
		response.setHeader(key, value);	 
	})	 
	return writer
}
	 
function footerResponse(writer){
	// We tell the writer we are through
	writer.endDocument();
	facesContext.responseComplete();
	
}

function getParams(){
	var exCon = facesContext.getExternalContext();
	var httpRequest:javax.faces.contex.ExternalContext = exCon.getRequest();
	var contentType = String(httpRequest.getContentType());
	
	if(contentType.toLowerCase().indexOf("json") > -1){
		var jb:java.lang.StringBuffer = new java.lang.StringBuffer();
	  	var line = null;
  		var reader:java.io.BufferedReader = httpRequest.getReader();
    	while ((line = reader.readLine()) != null){
      		jb.append(line);
    	}
    	
	  	var data = fromJson(jb.toString());
    	data.get = function(key){
    		return this[key]
    	}
	  	return data;
	}
	
	return param
}

function getWebDbName(){
	return database.getFilePath().replace("\\","/")
}