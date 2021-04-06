var $ = function()	{
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

function getWebDbName(){
	return database.getFilePath().replace("\\","/")
}

function getNombreDia(dia){
var nombreDia = ""; 
	switch (dia){
		case 1:
			nombreDia = "Domingo"
		break;
		case 2:
			nombreDia = "Lunes"
		break;
		case 3:
			nombreDia = "Martes"
		break;
		case 4:
			nombreDia = "Miércoles"
		break;
		case 5:
			nombreDia = "Jueves"
		break;
		case 6:
			nombreDia = "Viernes"
		break;
		case 7:
			nombreDia = "Sábado"
		break;
	}
	return nombreDia;
}

function getNombreMes(numMes, noticia){
	var mes = "";
	
	switch (numMes){
		case 1:
			mes = "Enero";
		break
		case 2:
			mes = "Febrero";
		break
		case 3:
			mes = "Marzo";
		break
		case 4:
			mes = "Abril";
		break
		case 5:
			mes = "Mayo";
		break
		case 6:
			mes = "Junio";
		break
		case 7:
			mes = "Julio";
		break
		case 8:
			mes = "Agosto";
		break
		case 9:
			mes = "Septiembre";
		break
		case 10:
			mes = "Octubre";
		break
		case 11:
			mes = "Noviembre";
		break
		case 12:
			mes = "Diciembre";
		break
	}
	
	if(noticia){
		mes = mes.substr(0,3);
	}
	
	return mes;	
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

function sortDescObjArray(a, b, propiedad) {
	if (a[propiedad] > b[propiedad])
		return -1;
	if (a[propiedad] < b[propiedad])
		return 1;
	return 0;
}

function arrayUnique(arr){
	var newArray = [];
	var valor = "";
	
	if(arr){
		if(typeof arr == "string"){
			return [arr];
		}
		
		if(arr.length == 1){
			return arr;
		}
		
		for(i in arr){
			valor = arr[i];
			if(valor){
				if(newArray.join().indexOf(valor) == -1 ){
					newArray.push(arr[i]);
				}	
			}
		}	
	}
	
	return newArray;
}

function vectorToArray(vector){
	var array = [];
	
	if (typeof vector == "string"){
		return [vector];	
	}
	
	if (vector){
		var it = vector.iterator();
		while (it.hasNext() ) {
			array.push( it.next() );
		}
	}
	return array;
}

function isMember(lista, arreglo){
	if (typeof lista == "string"){
		lista = [lista]
	}
	for (var i = 0; i < lista.length; i++){
		for (var k = 0; k < arreglo.length; k++){
			if (lista[i] == arreglo[k]){
				return true
			}
		}
	}
	return false;
}

function arrayToVector(array){
	var vector:java.util.Vector = new java.util.Vector(array.length);
	for(var i = 0; i < array.length; i++){
		vector.add(i, array[i])	
	}
	return vector;
}

function getValueDate(ndDoc, itemName, formatString) {
	var formato = new java.text.SimpleDateFormat(formatString);
	var ndtFecha:NotesDateTime;
	var fecha = null;
	if (ndDoc) {
		ndtFecha = ndDoc.getItemValue(itemName).size() > 0 ? ndDoc.getItemValue(itemName).elementAt(0) : null;
		fecha = ndtFecha != null ? formato.format(ndtFecha.toJavaDate()) : null;
		if (ndtFecha != null) {
			ndtFecha.recycle();	
		}	
	}	
	return fecha;
}

function getState(idState) {
	var state = null;
	try{
		var vwStates:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwStates");
		var ndState:NotesDocument;
		if (idState && idState != "") {
			ndState = vwStates.getDocumentByKey(idState, true);
			if (ndState) {
				state = {
					color: ndState.getItemValueString("color"),
					description: ndState.getItemValueString("description"),
					forwardButtonName: ndState.getItemValueString("forwardButtonName"),
					rejectButtonName: ndState.getItemValueString("rejectButtonName"),
					backwardButtonName: ndState.getItemValueString("backwardButtonName"),
					isStartFlow: ndState.getItemValueString("isStartFlow"),
					isEndFlow: ndState.getItemValueString("isEndFlow"),
					isApprovalFlow: ndState.getItemValueString("isApprovalFlow"),
					isRejectionFlow: ndState.getItemValueString("isRejectionFlow"),
					isReturnFlow: ndState.getItemValueString("isReturnFlow"),
					modifyValueAid: ndState.getItemValueString("modifyValueAid"),
					applySavePayDay: ndState.getItemValueString("applySavePayDay"),
					applyRejection: ndState.getItemValueString("applyRejection"),
					applyReturn: ndState.getItemValueString("applyReturn"),
					daysForAlarms: ndState.getItemValueDouble("daysForAlarms"),
					responsible: ndState.getItemValueString("responsible"),
					idFlow: ndState.getItemValueString("idFlow"),
					responsibleTypes: ndState.getItemValueString("responsibleTypes"),
					allowEdit: ndState.getItemValueString("allowEdit"),
					allowSelectResponsible: ndState.getItemValueString("allowSelectResponsible"),
					position: ndState.getItemValueString("position"),
					actions: vectorToArray(ndState.getItemValue("actions")),
					applyAlarmDays: ndState.getItemValueString("applyAlarmDays"),
					notification: ndState.getItemValueString("notification"),
					active: ndState.getItemValueString("active") == "1" ? true : false,
					creationDate: getValueDate(ndBenefit, "creationDate", "yyyy/MM/dd"),
					modificationDate: getValueDate(ndBenefit, "modificationDate", "yyyy/MM/dd"),
					creationUser: ndState.getItemValueString("creationUser"),
					modificationUser: ndState.getItemValueString("modificationUser"),
					id: ndState.getItemValueString("id"),
					name: ndState.getItemValueString("name")	
				}
				
			}
		}
	} catch(e){
		println("Error en getState: " + e.message);
	}
	
	return state;
}

function getCompanySize(idCompanySize) {
	var companySize = {};
	try {
		var vwCompanySizes = sessionAsSigner.getCurrentDatabase().getView("vwCompanySizes");
		var ndComapany:NotesDocument;
		ndComapany = vwCompanySizes.getDocumentByKey(idCompanySize, true);
		if (ndComapany) {
			companySize = {
				id: ndComapany.getItemValueString("id"),
				name: ndComapany.getItemValueString("name")
			};
		}
	} catch(e){
		println("Error en getCompanySize: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	
	return companySize;
}

function getAttachments(ndBenefit, itemName) {
	var vwAttachments = sessionAsSigner.getCurrentDatabase().getView("vwAttachments");
	var ndAttachment:NotesDocument;
	var idsAttachments = vectorToArray(ndBenefit.getItemValue(itemName))
	var attachments = [];
	for (var i = 0; i < idsAttachments.length; i++){
		ndAttachment = vwAttachments.getDocumentByKey(idsAttachments[i], true);
		if (ndAttachment) {
			attachments.push({
				id: ndAttachment.getItemValueString("id"),
				name: getAttachmentUrl(ndAttachment),
				url: getFileName(ndAttachment)
			});
		}
	}
	
	return attachments;
}

function getHistory(ndBenefit) {
	try{
		var vwHistory:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwHistoryIdBenefit");
		var ndHistory:NotesDocument;
		var history = [];
		var vec:NotesViewEntryCollection = vwHistory.getAllEntriesByKey(ndBenefit.getItemValueString("id"), true);
		var ve:NotesViewEntry = vec.getFirstEntry(); 
		var veAux:NotesViewEntry;
		var formato = new java.text.SimpleDateFormat("yyyy/MM/dd");
		var ndtFecha:NotesDateTime;
		if (vec.getCount() > 0) {
			while(ve != null){
				var ndHistory:NotesDocument = ve.getDocument();		
				ndtFecha = ndHistory.getItemValue("creationDate").elementAt(0) ? ndHistory.getItemValue("creationDate").elementAt(0) : null;
				history.push({
					comment: ndHistory.getItemValueString("comment"),
				    idBenefit: ndHistory.getItemValueString("idBenefit"),
				    idPrevious: ndHistory.getItemValueString("idPrevious"), 
				    idNext: ndHistory.getItemValueString("idNext"),
				    aprover: ndHistory.getItemValueString("aprover"),
				    creationDate: formato.format(ndtFecha.toJavaDate()),
				    previousStateName: ndHistory.getItemValueString("previousStateName"),
				    nextStateName: ndHistory.getItemValueString("nextStateName")
				});
				
				ndtFecha.recycle();
				veAux = vec.getNextEntry(ve); 
				ve.recycle();
				ve = veAux;
			}	
		}
	} catch(e){
		println("Error en getHistory: " + e.message);
	}
	
	return history;
}

function getAttachmentUrl(document) {
    var url = buildPathResource();
    url += "/vwAttachments/" + document.getUniversalID() + "/$FILE" + "/" + getFileName(document);

    return url;
}

function getFileName(document) {
	return session.evaluate("@AttachmentNames", document).elementAt(0);
}

function buildPathResource() {
    var host = context.getUrl().toString().split(facesContext.getExternalContext().getRequest().getRequestURI())[0];
    var path = getWebDbName();
    return host + "/" + path;
}

/**
 * Meotodos de la clase Call (Convocatoria).
 * 
 */

function isCaducedDate(dateToCompare, today) {
	var response = false;
	var actualDate:NotesDateTime = session.createDateTime(today);
	var dateCompare:NotesDateTime = dateToCompare;
	
	if (actualDate.timeDifference(dateCompare) > 0) {
		response = true;
	}
	return response;
}

function getFieldsCall(ndCall) {
	var callDTO = {
		fields: {},
		methods: {}
	};
	try {
		callDTO.fields = {
			id: ndCall.getItemValueString("id"),
		    year: ndCall.getItemValueDouble("year"),
		    dateToFinishCall: getValueDate(nd, "dateToFinishCall", "yyyy/MM/dd"),
		    deadlineToMakeSurvey: getValueDate(nd, "deadlineToMakeSurvey", "yyyy/MM/dd"),
		    deadlineToMakeSurveyEvaluator: getValueDate(nd, "deadlineToMakeSurveyEvaluator", "yyyy/MM/dd"),
		    deadlineToMakeSurveyTechnicalTeam: getValueDate(nd, "deadlineToMakeSurveyTechnicalTeam", "yyyy/MM/dd"),
		    deadlineToMakeSurveyManagerTeam: getValueDate(nd, "deadlineToMakeSurveyManagerTeam", "yyyy/MM/dd"),
		    supplier: [],
		    active: ndCall.getItemValueString("active") == "1" ? true : false
		}
		callDTO.methods = {
			isCaducedDateToFinishCall: isCaducedDate(nd.getItemValue("dateToFinishCall").elementAt(0), new Date()),
			isCaducedDeadLineToMakeSurvey: isCaducedDate(nd.getItemValue("deadlineToMakeSurvey").elementAt(0), new Date()), 
			isCaducedDeadLineToMakeSurveyEvaluator: isCaducedDate(nd.getItemValue("deadlineToMakeSurveyEvaluator").elementAt(0), new Date()),
			isCaducedDeadLineToMakeSurveyTechnicalTeam: isCaducedDate(nd.getItemValue("deadlineToMakeSurveyTechnicalTeam").elementAt(0), new Date()),
			isCaducedDeadLineToMakeSurveyManagerTeam: isCaducedDate(nd.getItemValue("deadlineToMakeSurveyManagerTeam").elementAt(0), new Date())
		}
	} catch(e){
		println("Error en getFieldsCall: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return callDTO;
}

/**
 * Fin de la clase Call (Convocatoria).
 * 
 */


/**
 * Metodo de la clase State (Estado).
 * 
 */

function getFieldState(ndState) {
	var stateDTO = {};
	try {
	    stateDTO = {
	    	id: ndState.getItemValueString("id"),
	    	name: ndState.getItemValueString("name"),
	   		shortName: ndState.getItemValueString("shortName")
	    }
	} catch(e){
		println("Error en getFieldState: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return stateDTO;
}

function getFinalStateByStageCall(stage) {
    var finalStates = null;
    switch (stage) {
	    case "SUPPLIER":
	        finalStates = "ENDED_SUPPLIER";
	        break;
	    case "EVALUATOR":
	        finalStates = "ENDED_EVALUATOR";
	        break;
	    case "TECHNICAL_TEAM":
	        finalStates = "ENDED_TECHNICAL_TEAM";
	        break;
	    case "MANAGER_TEAM":
	        finalStates = "ENDED_MANAGER_TEAM";
	        break;
	    default:
	    	finalStates = null;
	    	break;
    }

    return finalStates;
}

function getStateByShortName(shortName) {
    var response:NotesDocument = null;
    try {
        var viewName:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwStatesByShortName");
        var document:NotesDocument = viewName.getDocumentByKey(shortName, true);
        if (null != document) {
            response = getFieldState(document);
        }
    } catch (e) {
    	println("Error en getStateByShortName = " + e.message);
        throw new HandlerGenericException(e.message);
    }

    return response;
}

function getStatesByStageCall(stage) {
    var statesByStage = [];
    switch (stage) {
	    case "SUPPLIER":
	        statesByStage.push("NOT_STARTED", "SUPPLIER", "ENDED_SUPPLIER");
	        break;
	    case "EVALUATOR":
	    	statesByStage.push("NOT_STARTED_EVALUATOR", "EVALUATOR", "ENDED_EVALUATOR");
	        break;
	    case "TECHNICAL_TEAM":
	        statesByStage.push("NOT_STARTED_TECHNICAL_TEAM", "TECHNICAL_TEAM", "ENDED_TECHNICAL_TEAM");
	        break;
	    case "MANAGER_TEAM":
	    	statesByStage.push("NOT_STARTED_MANAGER_TEAM", "MANAGER_TEAM", "ENDED_MANAGER_TEAM");
	        break;
	    default:
	    	statesByStage = null;
	    	break;
    }

    return statesByStage;
}
/**
 * Fin de la clase State (Estado).
 * 
 */


/**
 * Metodo de la clase Master.
 * 
 */
function getFieldsMaster(nd) {
	var masterDTO = {};
	try {
		masterDTO = {
			id: nd.getItemValueString("id"),
			name: nd.getItemValueString("name")
		}
	} catch(e){
		println("Error en getFieldsMaster: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return masterDTO;
}
/**
 * Fin de la clase Master.
 * 
 */


/**
 * Metodo de la clase Supply.
 * 
 */
function getFieldsSupply(ndSupply) {
	var supplyDTO = {};
	try {
		supplyDTO = {
			id: ndSupply.getItemValueString("id"),
			name: ndSupply.getItemValueString("name"),
			idCountry: "",
			negotiators: []
		}
	} catch(e){
		println("Error en getFieldsSupply: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return supplyDTO;
}
/**
 * Fin de la clase Supply.
 * 
 */



/**
 * Metodo de la clase Supplier.
 * 
 */
function getFieldsSupplier(ndSupplier) {
	var supplierDTO = {};
	try {
		supplierDTO = {
		  id: ndSupplier.getItemValueString("id"),
		  fullName: ndSupplier.getItemValueString("fullName"),
		  businessName: ndSupplier.getItemValueString("businessName"),
		  idCompanySize: ndSupplier.getItemValueString("idCompanySize"),
		  nameCompanySizeToLoad: ndSupplier.getItemValueString("nameCompanySizeToLoad"),
		  companySize: getCompanySize(ndSupplier.getItemValueString("idCompanySize")),
		  idSupply: ndSupplier.getItemValueString("idSupply"),
		  nameSupplyToLoad: ndSupplier.getItemValueString("nameSupplyToLoad"),
		  supply: null,
		  idCategory: ndSupplier.getItemValueString("idCategory"),
		  category: null,
		  idSubCategory: ndSupplier.getItemValueString("idSubCategory"),
		  subCategory: null,
		  idDocuments: ndSupplier.getItemValue("idDocuments").size() > 0 ? vectorToArray(ndSupplier.getItemValue("idDocuments")) : [],
		  document: [],
		  nit: ndSupplier.getItemValueString("nit"),
		  idCompanyType: ndSupplier.getItemValueString("idCompanyType"),
		  companyLogo: [],
		  idCompanyLogo: ndSupplier.getItemValue("idCompanyLogo").size() > 0 ? vectorToArray(ndSupplier.getItemValue("idCompanyLogo")) : [],
		  companyType: null,
		  producerLivestok: ndSupplier.getItemValueString("producerLivestok") == "1" ? true : false,
		  idSocietyType: ndSupplier.getItemValueString("idSocietyType"),
		  societyType: null,
		  yearOfEstablishment: ndSupplier.getItemValueDouble("yearOfEstablishment"),
		  principalAdress: ndSupplier.getItemValueString("principalAdress"),
		  idCountry: ndSupplier.getItemValueString("idCountry"),
		  nameCountryToLoad: ndSupplier.getItemValueString("nameCountryToLoad"),
		  idOriginCountry: ndSupplier.getItemValueString("idOriginCountry"),
		  idDepartment: ndSupplier.getItemValueString("idDepartment"),
		  idCity: ndSupplier.getItemValueString("idCity"),
		  branchOffice: ndSupplier.getItemValueString("branchOffice"),
		  telephone: ndSupplier.getItemValueString("telephone"),
		  fax: ndSupplier.getItemValueString("fax"),
		  emails: ndSupplier.getItemValue("emails").size() > 0 ? vectorToArray(ndSupplier.getItemValue("emails")) : [],
		  codeZip: ndSupplier.getItemValueString("codeZip"),
		  nameLegalAgent: ndSupplier.getItemValueString("nameLegalAgent"),
		  idLegalAgent: ndSupplier.getItemValueString("idLegalAgent"),
		  fullNameContact: ndSupplier.getItemValueString("fullNameContact"),
		  jobPosition: ndSupplier.getItemValueString("jobPosition"),
		  phoneOfContact: ndSupplier.getItemValueString("phoneOfContact"),
		  emailOfContact: ndSupplier.getItemValueString("emailOfContact"),
		  idSector: ndSupplier.getItemValueString("idSector"),
		  otherSector: ndSupplier.getItemValueString("otherSector"),
		  packagingProvided: ndSupplier.getItemValueString("packagingProvided"),
		  typeOfCurrencyValueAssets: ndSupplier.getItemValueString("typeOfCurrencyValueAssets"),
		  valueAssets: ndSupplier.getItemValueDouble("valueAssets"),
		  idAttachedFinancialReport: ndSupplier.getItemValue("idAttachedFinancialReport").size() > 0 ? vectorToArray(ndSupplier.getItemValue("idAttachedFinancialReport")) : [],
		  attachedFinancialReport: [],
		  numberOfDirectEmployees: ndSupplier.getItemValueInteger("numberOfDirectEmployees"),
		  numberOfSubContratedEmployees: ndSupplier.getItemValueInteger("numberOfSubContratedEmployees"),
		  webSite: ndSupplier.getItemValueString("webSite"),
		  typeOfCurrencyAnnualSales: ndSupplier.getItemValueString("typeOfCurrencyAnnualSales"),
		  annualSalesValue: ndSupplier.getItemValueDouble("annualSalesValue"),
		  principalCustomer: [],
		  contactNutresaGroup: [],
		  participationInSalesWithGroupNutresa: ndSupplier.getItemValueDouble("participationInSalesWithGroupNutresa"),
		  geograficDescriptionOfPrincipalMaterials: ndSupplier.getItemValueString("geograficDescriptionOfPrincipalMaterials"),
		  currentlyExport: ndSupplier.getItemValueString("currentlyExport") == "1" ? true : false,
		  exportDestination: ndSupplier.getItemValueString("exportDestination"),
		  nameCertification: ndSupplier.getItemValueString("nameCertification"),
		  globalAgreement: ndSupplier.getItemValueString("globalAgreement") == "1" ? true : false,
		  chemicalSubstance: ndSupplier.getItemValueString("chemicalSubstance") == "1" ? true : false,
		  sapCode: ndSupplier.getItemValueString("sapCode")
	    }
	} catch(e){
		println("Error en getFieldsSupplier: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return supplierDTO;
}
/**
 * Fin de la clase Supplier.
 * 
 */




/**
 * Metodo de la clase SupplierByCall.
 * 
 */
function getFieldsSupplierByCall(ndSupplierByCall) {
	var supplierByCallDTO = {};
	try {
		supplierByCallDTO = {
	    	id: ndSupplierByCall.getItemValueString("id"),
	   	    idCall: ndSupplierByCall.getItemValueString("idCall"),
	    	idSurvey: ndSupplierByCall.getItemValueString("idCall"),
	    	idSupplier: ndSupplierByCall.getItemValueString("idSupplier"),
	    	participateInCall: ndSupplierByCall.getItemValueString("participateInCall"),
	    	acceptedPolicy: ndSupplierByCall.getItemValueString("acceptedPolicy") == "1" ? true : false,
	    	reasonForNotParticipation: ndSupplierByCall.getItemValueString("reasonForNotParticipation"),
	    	nameWhoSayDontParticipate: ndSupplierByCall.getItemValueString("nameWhoSayDontParticipate"),
	    	emailWhoSayDontParticipate: ndSupplierByCall.getItemValueString("emailWhoSayDontParticipate"),
	    	lockedByModification: ndSupplierByCall.getItemValueString("lockedByModification") == "1" ? true : false,
	    	dateLocked: getValueDate(ndSupplierByCall, "dateLocked", "yyyy/MM/dd"),
	    	dateUnLocked: getValueDate(ndSupplierByCall, "dateUnLocked", "yyyy/MM/dd"),
	    	oldIdCompanySize: ndSupplierByCall.getItemValueString("oldIdCompanySize"),
	    	idState: ndSupplierByCall.getItemValueString("idState"),
	    	invitedToCall: ndSupplierByCall.getItemValueString("invitedToCall") == "1" ? true : false,
	    	dateAssignedToEvaluator: getValueDate(ndSupplierByCall, "dateAssignedToEvaluator", "yyyy/MM/dd"),
	    	whoEvaluate: ndSupplierByCall.getItemValueString("whoEvaluate"),
	    	whoEvaluate: ndSupplierByCall.getItemValueString("whoEvaluateOfTechnicalTeam"),
	   	    idsDimension: []
	    }
	} catch(e){
		println("Error en getFieldSupplierByCall: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return supplierByCallDTO;
}

function getAllByStates(idCall, states) {
	var result = [];
	for (var i in states) {
        var state = getStateByShortName(states[i]);
        var idState = state.id;
        var filter:java.util.Vector = new java.util.Vector(2);
        filter.add(0,idState);
        filter.add(1,idCall);

        var currentView:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwSuppliersByCallIdStateAndIdCall");
        var documents:NotesDocumentCollection = currentView.getAllDocumentsByKey(filter, true);
        if (null != documents && documents.getCount() > 0) {
        	var nd:NotesDocument = documents.getFirstDocument();
        	var ndAux:NotesDocument;
        	while (nd != null){
        		result.push(getFieldsSupplierByCall(nd));
        		
        		ndAux = documents.getNextDocument(nd);
        		nd.recycle();
        		nd = ndAux;
        	}
        }
	}

    return result;
}
/**
 * Fin de la clase SupplierByCall.
 * 
 */

/**
 * Metodo de la clase StatisticalProgress.
 * 
 */

function createAxisOrCounter(axisName, summaryProgress) {
    if (null != axisName && axisName.trim() != "") {
        axisName = axisName.trim();
        if (!summaryProgress.axesStatisticData.hasOwnProperty(axisName)) {
        	summaryProgress.axesStatisticData[axisName] = 0;
        }
        summaryProgress.axesStatisticData[axisName]++;
    } else {
    	println("Error en createAxisOrCounter, 'axisName' nulo o vacio = " + axisName);
		throw new HandlerGenericException();
    }
    return summaryProgress;
}

function calculatePercentageInAxes(summaryProgress) {
    if (summaryProgress.axesStatisticData) {
        var axesWithPercentage = {};
		$.each(summaryProgress.axesStatisticData, function(key, value){
            var percentage = (value * 100) / summaryProgress.totalSupplier;
			axesWithPercentage[key] = percentage; 
		});
		summaryProgress.axesStatisticData = axesWithPercentage;
    }
    return summaryProgress;
}

/**
 * Fin de la clase StatisticalProgress.
 * 
 */


function getFieldAll(column, defaultView) {
	var list:java.util.vector;
    var vista:NotesView = sessionAsSigner.getCurrentDatabase().getView(defaultView);
    if (null != vista) {
        list = vista.getColumnValues(column);
    }
    return list;
}

function getAllBy(key, vista, classDto) {
	var response = [];
	try {
		var vwVista = sessionAsSigner.getCurrentDatabase().getView(vista);
		if (vwVista !== null) {
			var vec:NotesViewEntryCollection = null;
			var ve:NotesViewEntry = null;
			var veAux:NotesViewEntry;
			var nd:NotesDocument;
			vec = vwVista.getAllEntriesByKey(key, true);
			if (vec.getCount() > 0) {
				var fields = {};
				ve = vec.getFirstEntry();
				while (ve != null) {
					nd = ve.getDocument();
					fields = {};
					switch (classDto){
						case "CallDTO":
							fields = getFieldsCall(nd);
							break;
						case "SupplyDTO":
							fields = getFieldsSupply(nd);
							break;
						case "SupplierDTO":
							fields = getFieldsSupplier(nd);
							break;
						case "SupplierByCallDTO":
							fields = getFieldsSupplierByCall(nd);
							break;
						default:
							fields = getFieldsMaster(nd);
							break;
					}
					
					response.push(fields);
					
					veAux = vec.getNextEntry(ve); 
					ve.recycle();
					ve = veAux;
				}
			}
		} else {
			println("Error en getAllBy, vista = [" + vista + "] no definida.");
			throw new HandlerGenericException();
		}
	} catch(e){
		println("Error en getAllBy: " + e.message);
	}
	return response;
}

function getAllSuppliersInCall(key) {
	var response = {
		masters:{"CompanySize":[], "Country":[], "Supply":[]},
		suppliers:[],
		suppliersByCall:[]
	};
	try {
		var vwVista = sessionAsSigner.getCurrentDatabase().getView("vwSuppliersByCallIdCall");
		var vwSuppliers = sessionAsSigner.getCurrentDatabase().getView("vwSuppliers");
		if (vwVista !== null) {
			var vec:NotesViewEntryCollection = null;
			var ve:NotesViewEntry = null;
			var veAux:NotesViewEntry;
			var nd:NotesDocument;
			var ndSupplier:NotesDocument;
			vec = vwVista.getAllEntriesByKey(key, true);
			if (vec.getCount() > 0) {
				var obj = {};
				ve = vec.getFirstEntry();
				while (ve != null) {
					nd = ve.getDocument();
					if (nd.getItemValueString("idSupplier") != "") {
						response['suppliersByCall'].push(getFieldsSupplierByCall(nd));
						ndSupplier = vwSuppliers.getDocumentByKey(nd.getItemValueString("idSupplier"), true);
						if (ndSupplier != null) {
							response['suppliers'].push(getFieldsSupplier(ndSupplier));
							if (ndSupplier.getItemValueString("idCompanySize") != "" && !obj.hasOwnProperty(ndSupplier.getItemValueString("idCompanySize"))) {
								obj[ndSupplier.getItemValueString("idCompanySize")] = '';
								response['masters'].CompanySize.push({
									id: ndSupplier.getItemValueString("idCompanySize"),
									name: get(ndSupplier.getItemValueString("idCompanySize")).name
								});
							}
							if (ndSupplier.getItemValueString("idCountry") != "" && !obj.hasOwnProperty(ndSupplier.getItemValueString("idCountry"))) {
								obj[ndSupplier.getItemValueString("idCountry")] = '';
								response['masters'].Country.push({
									id: ndSupplier.getItemValueString("idCountry"),
									name: get(ndSupplier.getItemValueString("idCountry")).name
								});
							}
							if (ndSupplier.getItemValueString("idSupply") != "" && !obj.hasOwnProperty(ndSupplier.getItemValueString("idSupply"))) {
								obj[ndSupplier.getItemValueString("idSupply")] = '';
								response['masters'].Supply.push({
									id: ndSupplier.getItemValueString("idSupply"),
									name: get(ndSupplier.getItemValueString("idSupply")).name
								});
							}
						}
					}
										
					veAux = vec.getNextEntry(ve); 
					ve.recycle();
					ve = veAux;
				}
			}
		} else {
			println("Error en getAllSuppliersInCall, vista = [" + vista + "] no definida.");
			throw new HandlerGenericException();
		}
	} catch(e){
		println("Error en getAllSuppliersInCall: " + e.message);
	}
	return response;
}

function get(id, classDto) {
	var fields = {};
	try {
		var vwIds = sessionAsSigner.getCurrentDatabase().getView("vwProgIds");
		var nd:NotesDocument = vwIds.getDocumentByKey(id);
		if (nd != null) {
			switch (classDto){
				case "CallDTO":
					fields = getFieldsCall(nd);
					break;
				case "SupplyDTO":
					fields = getFieldsSupply(nd);
					break;
				case "SupplierDTO":
					fields = getFieldsSupplier(nd);
					break;
				default:
					fields = getFieldsMaster(nd);
					break;
			}
		}
	} catch(e){
		println("Error en get: " + e.message);
	}
	return fields;
}
