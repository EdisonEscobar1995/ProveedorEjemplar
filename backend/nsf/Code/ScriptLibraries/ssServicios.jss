import ssCommon;

function getAllPendings(){
	var error = "";
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
		var vwBenefitsPendings:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwBenefitsPendings");
		var ndBenefit:NotesDocument;
		var name:NotesName = session.createName(session.getEffectiveUserName());
		var usuario = name.getCanonical();
		if (usuario.indexOf("CN=") < 0) {
			usuario = "CN=" + usuario;
		}
		var vec:NotesViewEntryCollection = vwBenefitsPendings.getAllEntriesByKey(usuario);
		var ve:NotesViewEntry = vec.getFirstEntry();
		var veAux:NotesViewEntry;
		var data = [];
		
		while(ve != null){
			ndBenefit = ve.getDocument();
			
			// println("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
			
			data.push(getFieldsBenefit(ndBenefit));
		
			veAux = vec.getNextEntry(ve); 
			ve.recycle();
			ve = veAux;
		}
	}catch(e){
		error = e.message;
		println("Error en getAllPendings: " + e.message);
	}finally {
		if (error != ""){
			error = "Error al obtener los pendientes: " + error
		}
		var respuesta = {
			data: error ? null : data,
			rules: {},
			message: error ? error : "success",
			status: error ? false : true
		};
		writer.write(toJson(respuesta));
		footerResponse(writer)
	}
}

function getBenefitHistoryByApprover(){
	var error = "";
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
		var vwHistoryByApprover:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwHistoryByApprover");
		var vwBenefits:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwBenefits");
		var ndHistoryApprover:NotesDocument;
		var ndBenefit:NotesDocument;
		var usuario = session.getEffectiveUserName();
		var vec:NotesViewEntryCollection = vwHistoryByApprover.getAllEntriesByKey(usuario);
		var ve:NotesViewEntry = vec.getFirstEntry();
		var veAux:NotesViewEntry;
		var data = [];
		var idBenefit = "";
		
		while(ve != null){
			ndHistoryApprover = ve.getDocument();
			idBenefit = ndHistoryApprover.getItemValueString("idBenefit");
			if (idBenefit && idBenefit != "") {
				ndBenefit = vwBenefits.getDocumentByKey(idBenefit, true);
				if (ndBenefit && ndBenefit != null) {
					data.push(getFieldsBenefit(ndBenefit));
					ndBenefit.recycle();
				}
			}
			
			
			veAux = vec.getNextEntry(ve); 
			ve.recycle();
			ve = veAux;
		}
	}catch(e){
		error = e.message;
		println("Error en getAllPendings: " + e.message);
	}finally {
		if (error != ""){
			error = "Error al obtener los pendientes: " + error
		}
		var respuesta = {
			data: error ? null : data,
			rules: {},
			message: error ? error : "success",
			status: error ? false : true
		};
		writer.write(toJson(respuesta));
		footerResponse(writer)
	}
}

function getAllBenefitsByRolOld() {
	var error = "";
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
		var vwBenefitsByIdCompany:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwBenefitsByIdCompany");
		var vwUserByName:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwUsersByName");
		var vwRols:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwRols");
		var vwCompanies:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwCompanies");
		var ndBenefit:NotesDocument;
		var ndUserCfg:NotesDocument;
		var ndRol:NotesDocument;
		var ndCompany:NotesDocument;
		var ndAux:NotesDocument;
		var vec:NotesViewEntryCollection;
		var ve:NotesViewEntry;
		var veAux:NotesViewEntry;
		var objCompanies = {};
		var data = {
			benefits: [],
			companies: []
		};
		
		var name:NotesName = session.createName(session.getEffectiveUserName());
		var usuario = name.getCanonical();
		if (usuario.indexOf("CN=") < 0) {
			usuario = "CN=" + usuario;
		}
		
		ndUserCfg = vwUserByName.getDocumentByKey(usuario, true);
		
		if (ndUserCfg) {
			ndRol = vwRols.getDocumentByKey(ndUserCfg.getItemValueString("idRols"), true)
			if (ndRol) {
				var rol = ndRol.getItemValueString("shortName");
				if(rol == "BUSINESS_ADMINISTRATOR") {
					var companies = vectorToArray(ndUserCfg.getItemValue("idCompanies"))
					if (companies.length > 0) {
						for (var i=0; i<companies.length; i++) {
							vec = vwBenefitsByIdCompany.getAllEntriesByKey(companies[i], true);
							if (vec.getCount() > 0) {
								ndCompany = vwCompanies.getDocumentByKey(companies[i], true);
								data.companies.push({
									id: companies[i],
									name: ndCompany ? ndCompany.getItemValueString("name") : "" 
								});
								ve = vec.getFirstEntry();
								while(ve != null){
									ndBenefit = ve.getDocument();
									
									data.benefits.push(getFieldsBenefit(ndBenefit));
								
									veAux = vec.getNextEntry(ve); 
									ve.recycle();
									ve = veAux;
								}
							}
						}
					}
				} else if (rol == "ADMINISTRATOR") {
					vec = vwBenefitsByIdCompany.getAllEntries();
					if (vec.getCount() > 0) {
						ve = vec.getFirstEntry();
						while(ve != null){
							ndBenefit = ve.getDocument();
							
							data.benefits.push(getFieldsBenefit(ndBenefit));
							
							if (!objCompanies.hasOwnProperty(ndBenefit.getItemValueString("idCompany"))) {
								ndCompany = vwCompanies.getDocumentByKey(ndBenefit.getItemValueString("idCompany"), true);
								objCompanies[ndBenefit.getItemValueString("idCompany")] = ndCompany.getItemValueString("name"); 
							}
						
							veAux = vec.getNextEntry(ve); 
							ve.recycle();
							ve = veAux;
						}
					}
					
					for (var key in objCompanies) {
						data.companies.push({
  							id: key,
  							name: objCompanies[key] 
  						});
					}
				}
			}
		}
		
	}catch(e){
		error = e.message;
		println("Error en getAllBenefitsByRol: " + e.message);
	}finally {
		if (error != ""){
			error = "Error al obtener los beneficios por rol: " + error
		}
		var respuesta = {
			data: error ? null : data,
			objCompanies: objCompanies,
			rules: {},
			message: error ? error : "success",
			status: error ? false : true
		};
		writer.write(toJson(respuesta));
		footerResponse(writer)
	}
}

function getNameUserInSession() {
    return session.getEffectiveUserName();
}

function getUserInSession() {
	var vwUserByName:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwUsersByName");
	var name:NotesName = session.createName(session.getEffectiveUserName());
	var usuario = name.getCanonical();
	
	return usuario;
}

function getIsRol(shortNameRol) {
	var isRol = false;
	var ndUserCfg:NotesDocument;
	var vwUserByName:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwUsersByName");
	var vwRols:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwRols");
	var usuario = getUserInSession();
	
	ndUserCfg = vwUserByName.getDocumentByKey(usuario, true);
	
	if (ndUserCfg) {
		ndRol = vwRols.getDocumentByKey(ndUserCfg.getItemValueString("idRols"), true)
		if (ndRol && shortNameRol == ndRol.getItemValueString("shortName")) {
			isRol = true;
		}
	}
	
	return isRol;
}

function getIdCallByYear(year) {
	var idCall = "";
    var vwCallsByYear:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwCallsByYear");
	var ndCall:NotesDocument = vwCallsByYear.getDocumentByKey(year);
	if (ndCall != null) {
		idCall = ndCall.getItemValueString("id"); 
	}
    return idCall;
}

function getCurrentCall() {
	try{
	    var listYears = vectorToArray(getFieldAll(0, "vwCallsByYear"));
	    var year = listYears[0];
	}catch(e){
		println("Error en getCurrentCall: " + e.message);
	}
    return get(getIdCallByYear(year), "CallDTO");
}

function identifyCurrentStage() {
    var stageCaduced = {};
    var currentStage = null;
    var call = getCurrentCall();
    var callMethods = call["methods"];
    var callFields = call["fields"];
    var stageCall = ["SUPPLIER", "EVALUATOR", "TECHNICAL_TEAM", "MANAGER_TEAM"];
    var stageCaduced = {
    	"SUPPLIER": callMethods.isCaducedDeadLineToMakeSurvey,
    	"EVALUATOR": callMethods.isCaducedDeadLineToMakeSurveyEvaluator,
    	"TECHNICAL_TEAM": callMethods.isCaducedDeadLineToMakeSurveyTechnicalTeam,
    	"MANAGER_TEAM": false
    };
    // Si las anteriores no estan vencidas, es porque la fase final esta¡
    // activa
    
    for (var i=0; i<stageCall.length; i++) {
    	if (!stageCaduced[stageCall[i]]) {
    		currentStage = stageCall[i];
    		i = stageCall.length;
    	}
    }
    
    return currentStage;
}

function currentStageByRol() {
	var currentStage = null;
	if (getIsRol("LIBERATOR") || getIsRol("ADMINISTRATOR")) {
		currentStage = identifyCurrentStage();
	} else if (getIsRol("EVALUATOR")) {
		currentStage = "EVALUATOR";
	} else if (getIsRol("TECHNICAL_TEAM")) {
		currentStage = "TECHNICAL_TEAM";
	} else if (getIsRol("MANAGER_TEAM")) {
		currentStage = "MANAGER_TEAM";
	}

    return currentStage;
}

function getStatisticalProgress() {
	var error = "";
	var errorSend = "";
	var filterName = param.get("filterName") ? param.get("filterName") : "";
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
		var vwUserByName:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwUsersByName");
		var ndUserCfg:NotesDocument;
		var ndRol:NotesDocument;
		var ndAux:NotesDocument;
		var vec:NotesViewEntryCollection;
		var ve:NotesViewEntry;
		var veAux:NotesViewEntry;
		var objCompanies = {};
		var data = [];
		
		/* $.each(stageCaduced, function(key, value){
		
		}) */
		var summaryProgress = {
			totalSupplier: 0,
			axesStatisticData: {}
		};
		
		filterName = filterName.trim();
		
		var currentStage = currentStageByRol();
		if (currentStage !== null) {
			
			var statesOfStage = getStatesByStageCall(currentStage);
			if (statesOfStage == null) {
				errorSend = "INVALID_VALUE";
				return;
			}
			var call = getCurrentCall();
		    var callFields = call["fields"];
			var suppliersByCall = getAllByStates(callFields.id, statesOfStage);
			var finalStateOfStage = getFinalStateByStageCall(currentStage);
			if (finalStateOfStage == null) {
				errorSend = "INVALID_VALUE";
				return;
			}
			var idStateOfEndedStage = getStateByShortName(finalStateOfStage).id;
			summaryProgress.totalSupplier = suppliersByCall.length;
			for (var i in suppliersByCall) {
				// println("suppliersByCall[i].idState === ", suppliersByCall[i].idState)
	       		if (idStateOfEndedStage == suppliersByCall[i].idState) {
	                var anyName = "";
	                var supplier = get(suppliersByCall[i].idSupplier, "SupplierDTO");
	                if ("COMPANY_SIZE_FILTER" == filterName) {
	                    var idCompanySize = supplier.idCompanySize;
	                    var companyDTO = get(idCompanySize);
	                    anyName = companyDTO.name;
	                }

	                if ("SUPPLY_FILTER" == filterName) {
	                    var idSupply = supplier.idSupply;
	                    var supplyDTO = get(idSupply, "SupplyDTO");
	                    anyName = supplyDTO.name;
	                }

	                if ("COUNTRY_FILTER" == filterName) {
	                    var idCountry = supplier.idCountry;
	                    var countryDTO = get(idCountry);
	                    anyName = countryDTO.name;
	                }
					
	                summaryProgress = createAxisOrCounter(anyName, summaryProgress);
	            }
	        }
			
			summaryProgress = calculatePercentageInAxes(summaryProgress);
			
		} else {
			errorSend = "ROL_INVALID";
		}
		
	}catch(e){
		error = e.message;
		println("Error en getStatisticalProgress: " + e.message);
	}finally {
		if (errorSend != "") {
			error = errorSend;
		}
		if (error != ""){
			error = "Error al obtener progreso estadistico: " + error
		}
		var respuesta = {
			data: error ? null : summaryProgress,
			rules: {},
			message: error ? error : "success",
			status: error ? false : true
		};
		writer.write(toJson(respuesta));
		footerResponse(writer)
	}
}

function getSuppliersInCall() {
	var error = "";
	var errorSend = "";
	var idCall = param.get("idCall") ? param.get("idCall") : "";
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
		var vwUserByName:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwUsersByName");
		var ndUserCfg:NotesDocument;
		var ndRol:NotesDocument;
		var ndAux:NotesDocument;
		var vec:NotesViewEntryCollection;
		var ve:NotesViewEntry;
		var veAux:NotesViewEntry;
		var objCompanies = {};
		var data = {};
		
		/* $.each(stageCaduced, function(key, value){
		
		}) */
		
		if (idCall != "") {
			var response = getAllSuppliersInCall(idCall, "vwSuppliersByCallIdCall", "SupplierByCallDTO");
			
			data["suppliersByCall"] = response.suppliersByCall;
			data["suppliers"] = response.suppliers;
			data["masters"] = response.masters;
		} else {
			errorSend = "NO_VALID_PARAMETER";
		}
		
		
	}catch(e){
		error = e.message;
		println("Error en getSuppliersInCall: " + e.message);
	}finally {
		if (errorSend != "") {
			error = errorSend;
		}
		if (error != ""){
			error = "Error al obtener suppliers by call: " + error
		}
		var respuesta = {
			data: error ? null : data,
			rules: {},
			message: error ? error : "success",
			status: error ? false : true
		};
		writer.write(toJson(respuesta));
		footerResponse(writer)
	}
}

function getParticipantsByYear() {
	var error = "";
	var errorSend = "";
	var year = param.get("year") ? param.get("year") : "";
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
		var vwUserByName:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwUsersByName");
		var ndUserCfg:NotesDocument;
		var ndRol:NotesDocument;
		var ndAux:NotesDocument;
		var vec:NotesViewEntryCollection;
		var ve:NotesViewEntry;
		var veAux:NotesViewEntry;
		var objCompanies = {};
		var data = {};
		
		var listYears = vectorToArray(getFieldAll(0, "vwCallsByYear"));
        if (year == "") {
            year = listYears[0];
        }
        
		var resSupplier = getSupplierInSession(null);
		if (resSupplier.errorSend != "") {
			errorSend = resSupplier.errorSend;
			return;
		}
		var supplier = resSupplier.supplier;
		// println("supplier = ", supplier)
        if (null == supplier) {
        	if (getIsRol("LIBERATOR") || getIsRol("ADMINISTRATOR") || getIsRol("EVALUATOR")) {
        		data = getSummaryWithSurvey(year);
            } else {
            	errorSend = "ROL_INVALID";
            }
        } else {
            var filter:java.util.Vector = new java.util.Vector(2);
            filter.add(0, supplier.id);
            filter.add(1, getIdCallByYear(year));
            var callsBySupplier = getAllBy(filter, "vwSuppliersByCallInIdSupplierAndIdCall", "SupplierByCallDTO");
            data = getInformationFromSuppliers(listYears, callsBySupplier);
        }
        		
	}catch(e){
		error = e.message;
		println("Error en getParticipantsByYear: " + e.message);
	}finally {
		if (errorSend != "") {
			error = errorSend;
		}
		if (error != ""){
			error = "Error al obtener suppliers by year: " + error
		}
		var respuesta = {
			data: error ? null : data,
			rules: {},
			message: error ? error : "success",
			status: error ? false : true
		};
		writer.write(toJson(respuesta));
		footerResponse(writer)
	}
}

function getFormula(filtros) {
	var campo, operador, operadorAux, valor, fechaInicio, fechaFin, valorAux;
	var formula = "";
	var separador = "";		
	var queryItem = "";
	var separadorQueryItem = "";
	var filtroItem
	for(var filtro in filtros){
		filtroItem = filtros[filtro].key;
		campo = "";
		operador = "";
		valor = "";
		queryItem = "";
		separadorQueryItem = "";					
		
		switch (filtroItem){
			
			case "userCreationDate":
				if(filtros[filtro].value != ""){
					campo = "userCreationDate";
					operador = ">=";
					operadorAux = "<=";
					ndt = session.createDateTime(filtros[filtro].value);
					fechaInicio = ndt.getDateOnly();
					ndt = session.createDateTime(filtros[filtro].value);
					fechaFin = ndt.getDateOnly();
					queryItem += (separadorQueryItem + "[" + campo + "] " + operador + " " + fechaInicio + " AND [" + campo + "] "+ operadorAux +" "+ fechaFin);	
				}
				break;								
			case "userCreatorCannonical":
				if(filtros[filtro].value != ""){
					var nombre:NotesName = session.createName(filtros[filtro].value);
					campo = "userCreatorCannonical";
					operador = "CONTAINS";
					// valor = filtros[filtro].value;
					valor = nombre.getCommon()
				}
				break;
			case "idCompany":
				if(filtros[filtro].value != ""){
					campo = "idCompany";
					operador = "=";
					valor = filtros[filtro].value;
				}
				break;
			case "companies":
				var vlr = filtros[filtro].value;
				
				campo = "idCompany";
				operador = " CONTAINS ";
				
				if(typeof vlr == "string"){
					vlr = [vlr];
				}else{
					vlr = vectorToArray(vlr);
				}
				
				if(vlr.length > 0){
					for(var item in vlr){
						valor = vlr[item] + "*";
						queryItem += (separadorQueryItem + "FIELD " + campo + " " + operador + "\"" + valor+"\"");
						separadorQueryItem = " OR ";
					}
				}else{
					valor = "";
				}
				break;
		}						
		if((valor != "" && valor != "*")|| (queryItem != "")){
			formula += queryItem != "" ?
							(separador + "("+queryItem+")") : (separador + "FIELD " + campo + " " + operador + " \"" + valor+"\"");
			separador = " AND "
		}
	}
	
	return formula
}
	
function getFiltersDbColumn(vista, columns) {
	var datos = @DbColumn("", vista, column);
	if(typeof datos == "string"){
		datos = [datos]
	}else{
		datos = @Trim(@Unique(datos)).sort()
	}
	
	return datos;
}

function getFilters(vista, keyField){
	var vw:NotesView = sessionAsSigner.getCurrentDatabase().getView(vista);
	var nd:NotesDocument;
	var ndAux:NotesDocument;
	var datos = [];
	
	switch (keyField){
		case "user":
			break;								
		case "company":
			nd = vw.getFirstDocument();
			var dc:NotesDocumentCollection;
			var vwBenefitsByIdCompany:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwBenefitsByIdCompany");
			while (nd) {
				dc = vwBenefitsByIdCompany.getAllDocumentsByKey(nd.getItemValueString("id"), true);
				if (dc.getCount() > 0) {
					datos.push(nd.getItemValueString("id") + "|" + nd.getItemValueString("name"));
					dc.recycle();
				}
				ndAux = vw.getNextDocument(nd);
				nd.recycle();
				nd = ndAux;
			}
			break;
	}
	datos = @Trim(@Unique(datos)).sort();
	
	return datos;
}

function prueba() {
	var error = "";
	var response;
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
		var obj1 = {id: "", name: ""};
		var obj2 = {};
		var idFieldNames = {"Category":'categoria', "Country":'', "Department":'', "City":'', "Supply":'', "SubCategory":'',
		        "CompanyType":'', "SocietyType":'', "Sector":''};
		for (var prop in idFieldNames) {
			println("prop == ", prop, " --- value == ", idFieldNames[prop]);
		}
		response = isObjectEmpty(obj2);
		
		
	}catch(e){
		error = e.message;
		println("Error en getParticipantsByYear: " + e.message);
	}finally {
		if (error != ""){
			error = "Error al obtener suppliers by year: " + error
		}
		var respuesta = {
			data: response,
			rules: {},
			message: error ? error : "success",
			status: error ? false : true
		};
		writer.write(toJson(respuesta));
		footerResponse(writer)
	}
}
