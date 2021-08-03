import ssCommon;
// importPackage(com.nutresa.exemplary_provider.dtl.queries);

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
		if (currentStage != null) {
			
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

function getModifiedSuppliers() {
	var error = "";
	var errorSend = "";
	var year = param.get("year") ? param.get("year") : "";
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
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
        
	    var filter:java.util.Vector = new java.util.Vector(1);
        filter.add(0, getIdCallByYear(year));
        var callsBySupplier = getAllBy(filter, "vwSuppliersByCallModifiedIdCall", "SupplierByCallDTO");
        data = getInformationFromSuppliers(listYears, callsBySupplier);
        		
	}catch(e){
		error = e.message;
		println("Error en getModifiedSuppliers: " + e.message);
	}finally {
		if (errorSend != "") {
			error = errorSend;
		}
		if (error != ""){
			error = "Error al obtener proveedor con cambio en el tamaño de empresa: " + error
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

function getSurveys() {
	var error = "";
	var errorSend = "";
	var year = param.get("year") ? param.get("year") : "";
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
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
        
	    var filter:java.util.Vector = new java.util.Vector(1);
        filter.add(0, getIdCallByYear(year));
        var callsBySupplier = getAllBy(filter, "vwSuppliersByCallIdCall", "SupplierByCallDTO");
        data = getInformationFromSuppliers(listYears, callsBySupplier);
        		
	}catch(e){
		error = e.message;
		println("Error en getSurveys: " + e.message);
	}finally {
		if (errorSend != "") {
			error = errorSend;
		}
		if (error != ""){
			error = "Error al obtener consulta de encuestas: " + error
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

function getSuppliersForSelection() {
	var error = "";
	var errorSend = "";
	var nameNextStage = param.get("stage") ? param.get("stage") : "";
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
		var ndUserCfg:NotesDocument;
		var ndRol:NotesDocument;
		var ndAux:NotesDocument;
		var vec:NotesViewEntryCollection;
		var ve:NotesViewEntry;
		var veAux:NotesViewEntry;
		var objCompanies = {};
		var data = [];
		var resEvaluated;
		// evaluatedSuppliers
		if (nameNextStage == "Evaluator") {
			resEvaluated = getFinishedByStage("ENDED_SUPPLIER");
        }

        if (nameNextStage == "TechnicalTeam") {
        	resEvaluated = getFinishedByStage("ENDED_EVALUATOR");
        }
        
        if (nameNextStage == "ManagerTeam") {
        	resEvaluated = getFinishedByStage("ENDED_TECHNICAL_TEAM");
        }
        
        if (resEvaluated.errorSend != "") {
			errorSend = resEvaluated.errorSend;
			return;
		}
        
        var evaluatedSuppliers = resEvaluated.evaluated;
        
        var parametersToGenerateReport = {};
        var responseBySupplier;
        for (var i=0; i<evaluatedSuppliers.length; i++) {
        	var reportBySupplier = {};
        	parametersToGenerateReport.type = "SUPPLIER_EVALUATOR";
        	if (nameNextStage == "Evaluator" || nameNextStage == "TechnicalTeam") {
        		responseBySupplier = getRecordOfReport(evaluatedSuppliers[i], get(evaluatedSuppliers[i].idSupplier, "SupplierDTO"),
                        parametersToGenerateReport);
        		if (responseBySupplier.errorSend != "") {
        			errorSend = responseBySupplier.errorSend;
        			i = evaluatedSuppliers.length;
    				return;
        		}
                reportBySupplier = responseBySupplier.recordOfReport;
            }

            if ("ManagerTeam".equals(nameNextStage)) {
            	responseBySupplier = getRecordOfReport(evaluatedSuppliers[i], get(evaluatedSuppliers[i].idSupplier, "SupplierDTO"), parametersToGenerateReport);
            	if (responseBySupplier.errorSend != "") {
        			errorSend = responseBySupplier.errorSend;
        			i = evaluatedSuppliers.length;
    				return;
        		}
                reportBySupplier = responseBySupplier.recordOfReport;
                
                parametersToGenerateReport.type = "TECHNICAL_MANAGER";                
                resReportUntilTechnicalTeam = getRecordOfReport(evaluatedSuppliers[i], get(evaluatedSuppliers[i].idSupplier, "SupplierDTO"), parametersToGenerateReport);
            	if (resReportUntilTechnicalTeam.errorSend != "") {
        			errorSend = resReportUntilTechnicalTeam.errorSend;
        			i = evaluatedSuppliers.length;
    				return;
        		}
            	reportUntilTechnicalTeam = resReportUntilTechnicalTeam.recordOfReport;
            	
                reportBySupplier.totalScoreInService = reportUntilTechnicalTeam.totalScoreInService;
                reportBySupplier.services = reportUntilTechnicalTeam.services;
            }
            
            data.push(reportBySupplier);
        }
        		
	}catch(e){
		error = e.message;
		println("Error en getSuppliersForSelection: " + e.message);
	}finally {
		if (errorSend != "") {
			error = errorSend;
		}
		if (error != ""){
			error = "Error al obtener proveedores que pasan evaluación comité técnico: " + error
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

function getParticipantsToManagerTeam() {
	var error = "";
	var errorSend = "";
	var year = param.get("year") ? param.get("year") : "";
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
		var vwUserByName:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwUsersByName");
		var ndUserCfg:NotesDocument;
		var objCompanies = {};
		var data = {};
		var rulesObj = {};
		
		var listYears = vectorToArray(getFieldAll(0, "vwCallsByYear"));
        if (year == "") {
            year = listYears[0];
        }
        
        var rules = new SectionRule();
        var idCall = getIdCallByYear(year);
        var managerTeamInCall = getIdOfManagerTeamMembersInCall(idCall);
               
    	var usuario = getUserInSession();    	
    	ndUserCfg = vwUserByName.getDocumentByKey(usuario, true);
    	
        if (getIsRol("MANAGER_TEAM") && isMember(ndUserCfg.getItemValueString("id"), managerTeamInCall)) {
        	errorSend = "INFORMATION_NOT_FOUND";
        	return;
        }

        var statesIncludInManagerTeamStage = [];
        statesIncludInManagerTeamStage.push("NOT_STARTED_MANAGER_TEAM");
        statesIncludInManagerTeamStage.push("MANAGER_TEAM");
        statesIncludInManagerTeamStage.push("ENDED_MANAGER_TEAM");
        
        var callsBySupplier = identifyParticpantsByCallYearAndStageStates(year, statesIncludInManagerTeamStage);

        var participantsToManagerTeam = getInformationFromSuppliers(listYears, callsBySupplier);

        var currentMasters = participantsToManagerTeam.masters;
        currentMasters.EvaluationScale = getAllBy("MANAGER_TEAM", "vwEvaluationScalesByApplyTo", "EvaluationScaleDTO");
        currentMasters.State = getAll("vwStates", "StateDTO");
        currentMasters.Rol = getAll("vwRols", "RolDTO");
        currentMasters.User = getAllBy(getNameUserInSession(), "vwUsersByName", "UserDTO");

        if (getIsRol("LIBERATOR") || getIsRol("ADMINISTRATOR")) {
            rules.setRulesToSection("liberator", rules.buildRules(true, true));
        }
        rulesObj = rules.getObject();
        
        var nameUserInSession = getNameUserInSession();
        // for (var idSupplierByCall : idsSupplierByCall) {
        var num = 1;
        var auxiliarAnswer;
        var answers = [];
        for (var i in callsBySupplier) {
        	num = 1;
            if (!getIsRol("LIBERATOR") && !getIsRol("ADMINISTRATOR")) {
            	num += 1;
            }
            var filter:java.util.Vector = new java.util.Vector(num);
            filter.add(0, callsBySupplier[i].id);
            if (num == 2) {
            	filter.add(1, nameUserInSession);
            }
            auxiliarAnswer = getAllBy(filter, "vwManagerTeamAnswersByIdSupplierByCallAndWhoEvaluate", "ManagerTeamAnswerDTO");

            if (auxiliarAnswer.length > 0) {
            	answers = answers.concat(auxiliarAnswer);
            }
            filter.clear();
        }
        
        var managersInCall = getAllBy(idCall, "vwManagerTeam", "ManagerTeamDTO");
        var managers = [];
        if (managersInCall.length > 0) {
        	var user = null;
        	for (var i in managersInCall) {
        		user = getBy(managersInCall[i].idUser, "vwUsers", "UserDTO");
                if (null != user) {
                	managers.push(user);
                }	
        	}
        }
        currentMasters.Managers = managers;
        currentMasters.ManagerTeamAnswer = answers;
        participantsToManagerTeam.masters = currentMasters;
        
        data = participantsToManagerTeam;
	}catch(e){
		error = e.message;
		println("Error en getParticipantsToManagerTeam: " + e.message);
	}finally {
		if (errorSend != "") {
			error = errorSend;
		}
		if (error != ""){
			error = "Error al obtener Calificación comité gerencial: " + error
		}
		var respuesta = {
			data: error ? null : data,
			rules: rulesObj,
			notice: "",
			message: error ? error : "success",
			status: error ? false : true
		};
		writer.write(toJson(respuesta));
		footerResponse(writer)
	}
}

function getMasterList() {
	var error = "";
	var errorSend = "";
	var params = param;
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
		var data = {};
		var notFound = {
			cont: 0,
			message: ""
		};
		var sep = "";
		
		var allowedEntities = {
		  Call: {vista: "vwCalls", dto: "CallDTO"},
		  Country: {vista: "vwCountries", dto: ""},
		  City: {vista: "vwCities", dto: ""},
		  Department: {vista: "vwDepartments", dto: ""},
		  CompanySize: {vista: "vwCompanySizes", dto: ""},
		  CompanyType: {vista: "vwCompanyTypes", dto: ""},
		  Sector: {vista: "vwSectors", dto: ""},
		  Category: {vista: "vwCategories", dto: ""},
		  // Subcategory: {vista: "vwSubCategories", dto: ""},
		  Supply: {vista: "vwSupplies", dto: ""},
		  System: {vista: "vwSystems", dto: "SystemDTO"},
		  Dimension: {vista: "vwDimensions", dto: "DimensionDTO"},
		  Criterion: {vista: "vwCriterions", dto: "CriterionDTO"},
		  SocietyType: {vista: "vwSocietyTypes", dto: ""},
		  Supplier: {vista: "vwSuppliers", dto: "SupplierDTO"},
		  User: {vista: "vwUsers", dto: "UserDTO"},
		  Rol: {vista: "vwRols", dto: "RolDTO"},
		  Service: {vista: "vwServices", dto: "ServiceDTO"},
		  Item: {vista: "vwItems", dto: "ItemDTO"},
		  Access: {vista: "vwAccess", dto: "AccessDTO"}
		};
		
		var entry = null;
		for (var i in params) {
			entry = allowedEntities[i];
			if (entry) {
				if (entry.dto != "") {
					data[i] = getAll(entry.vista, entry.dto);
				} else {
					data[i] = getAll(entry.vista);
				}
			} else if (i != "Open" && i != "action") {
				notFound.cont += 1;
				notFound.message += sep + i;
				sep = " ,";
			}
		}
		
		if (notFound.cont > 0) {
			errorSend = "Class '" + notFound.message + "' not found";
			return;
		}

	}catch(e){
		error = e.message;
		println("Error en getMasterList: " + e.message);
	}finally {
		if (errorSend != "") {
			error = errorSend;
		}
		if (error != ""){
			error = "Error al obtener lsta maestra: " + error
		}
		var respuesta = {
			data: error ? null : data,
			rules: {},
			notice: "",
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
	var response = "";
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"})
		var obj1 = {id: "", name: ""};
		var obj2 = {};
		var idFieldNames = {"Category":'categoria', "Country":'', "Department":'', "City":'', "Supply":'', "SubCategory":'',
		        "CompanyType":'', "SocietyType":'', "Sector":''};
		for (var prop in idFieldNames) {
			// println("prop == ", prop, " --- value == ", idFieldNames[prop]);
		}
		
		var obj = {};
				
		println("Por aca.......")
		var service = new Service();
		service.total = 23;
		println("service.total = ", service.total);
		
		var vista:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwManagerTeamAnswersByIdSupplierByCallAndWhoEvaluate");
		if (vista) {
			println("visat encontrada")
		} else {
			println("No esta")
		}
		
		/* var summarySurvey = new SummarySurvey();
		println("==== summarySurvey.getScoreOfSupplier = ", summarySurvey.getScoreOfSupplier())
		setSummarySurveyBySupplier({wording: "wording pueba", score: 987}, summarySurvey);
		println("==== summarySurvey.getScoreOfSupplier = ", summarySurvey.getScoreOfSupplier())
		response = summarySurvey.getObject(); */
		println("param == ", param);
		for (var i in param) {
			println("i = ", i);
		}
		
	}catch(e){
		error = e.message;
		println("Error en prueba: " + e.message);
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
