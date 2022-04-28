var $ = function()	{
}

$.keys = function (obj)
{
    var keys = [];
    for(var prop in obj)
    {
    	keys.push(String(prop))
    }
    return keys;
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

function isObjectEmpty(obj) {
	var response = true;
	for(var prop in obj) {
    	if(obj.hasOwnProperty(prop)) {
    		return false;
    	}
  	}
	return response;
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

function calculateTotalScore(totalScore, totalExpectedScore) {
    var scoreCalculated = 0.0;
    if (totalScore < 0) {
        scoreCalculated = -1.0;
    } else {
        if (totalExpectedScore > 0) {
            scoreCalculated = (totalScore / totalExpectedScore) * 100;
        }
    }

    return scoreCalculated;
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

//////// 

var SectionRule = function() {
	var rule = {
		show: false,
		readOnly: true
	}
	var specifictRule = {
		supplier: rule,
		evaluator: rule,
		liberator: rule
	};
	
	this.rules = specifictRule;
	
	this.getObject = function() {
		return this.rules;
	}
	this.buildRules = function(show, readOnly) {
		return {
			show: show,
			readOnly: readOnly
		}
	}
	this.setRulesToSection = function(section, rule) {
		this.rules[section] = rule; 
	}
}

var Service = function() {
	this.name = "";
	this.comment = "";
	this.total = 0;
	this.items = [];
	this.getObject = function() {
		return {
	      name: this.name,
	      comment: this.comment,
	      total: this.total,
	      items: this.items
		}
	}
}

var Item = function() {
	this.name = "";
	this.answer = 0;
	this.getObject = function() {
    	return {
			name: this.name,
	      	answer: this.answer
    	}
	}
}

var SummaryManagerSurvey = function() {
    this.whoEvaluate = "";
    this.score = 0;
    this.comment = "";
    this.getObject = function() {
    	return {
    		whoEvaluate: this.whoEvaluate,
    		score: this.score
    	}
	}
}

var SummarySurvey = function() {
  this.dimension = "";
  this.criterion = "";
  this.question = "";
  this.questionType = "";
  this.answerSupplier = "";
  this.answerEvaluator = "";
  this.scoreOfSupplier = 0;
  this.scoreOfEvaluator = 0;
  this.expectedScoreSupplier = 0;
  this.expectedScoreEvaluator = 0;
  this.commentSupplier = "";
  this.commentEvaluator = "";
  this.percentDimension = 0;
  this.percentCriterion = 0;
  this.attachmentCount = 0;
  
  //Get object
  this.getObject = function() {
    return {
      dimension: this.dimension,
      criterion: this.criterion,
      question: this.question,
      questionType: this.questionType,
      answerSupplier: this.answerSupplier,
      answerEvaluator: this.answerEvaluator,
      scoreOfSupplier: this.scoreOfSupplier,
      scoreOfEvaluator: this.scoreOfEvaluator,
      expectedScoreSupplier: this.expectedScoreSupplier,
      expectedScoreEvaluator: this.expectedScoreEvaluator,
      commentSupplier: this.commentSupplier,
      commentEvaluator: this.commentEvaluator,
      percentDimension: this.percentDimension,
      percentCriterion: this.percentCriterion,
      attachmentCount: this.attachmentCount
    }
  }

  // Getter and Setter
  this.getDimension = function() {
    return this.dimension;
  }

  this.setDimension = function(dimenssion) {
    this.dimension = dimenssion;
  }

  this.getCriterion = function() {
    return this.criterion;
  }

  this.setCriterion = function(criterion) {
    this.criterion = criterion;
  }

  this.getQuestion = function() {
    return this.question;
  }

  this.setQuestion = function(question) {
    this.question = question;
  }

  this.getQuestionType = function() {
    return this.questionType;
  }

  this.setQuestionType = function(questionType) {
    this.questionType = questionType;
  }

  this.getAnswerSupplier = function() {
    return this.answerSupplier;
  }

  this.setAnswerSupplier = function(answer) {
    this.answerSupplier = answer;
  }

  this.getScoreOfSupplier = function() {
    return this.scoreOfSupplier;
  }

  this.setScoreOfSupplier = function(scoreOfSupplier) {
    this.scoreOfSupplier = scoreOfSupplier;
  }

  this.getExpectedScoreSupplier = function() {
    return this.expectedScoreSupplier;
  }

  this.setExpectedScoreSupplier = function(expectedScore) {
    this.expectedScoreSupplier = expectedScore;
  }

  this.getExpectedScoreEvaluator = function() {
    return this.expectedScoreEvaluator;
  }

  this.setExpectedScoreEvaluator = function(expectedScore) {
    this.expectedScoreEvaluator = expectedScore;
  }

  this.setCommentSupplier = function(commentSupplier) {
    this.commentSupplier = commentSupplier;
  }

  this.getCommentSupplier = function() {
    return this.commentSupplier;
  }

  this.setAnswerEvaluator = function(answerEvaluator) {
    this.answerEvaluator = answerEvaluator;
  }

  this.getAnswerEvaluator = function() {
    return this.answerEvaluator;
  }

  this.setScoreOfEvaluator = function(scoreOfEvaluator) {
    this.scoreOfEvaluator = scoreOfEvaluator;
  }

  this.getScoreOfEvaluator = function() {
    return this.scoreOfEvaluator;
  }

  this.setCommentEvaluator = function(commentEvaluator) {
    this.commentEvaluator = commentEvaluator;
  }

  this.getCommentEvaluator = function() {
    return this.commentEvaluator;
  }

  this.getPercentDimension = function() {
    return this.percentDimension;
  }

  this.setPercentDimension = function(percentDimension) {
    this.percentDimension = percentDimension;
  }

  this.getPercentCriterion = function() {
    return this.percentCriterion;
  }

  this.setPercentCriterion = function(percentCriterion) {
    this.percentCriterion = percentCriterion;
  }

  this.setAttachmentCount = function(attachmentCount) {
    this.attachmentCount = attachmentCount;
  }

  this.getAttachmentCount = function() {
    return this.attachmentCount;
  }
}

////



/**
 * Metodo de la clase Option (Opcion).
 * 
 */

function getFieldsOption(ndOption) {
	var optionDTO = {};
	try {
		optionDTO = {                                                                                         
	        id: ndOption.getItemValueString("id"),
	        wording: ndOption.getItemValueString("wording"),
	        score: ndOption.getItemValueDouble("score"),
	        idQuestion: ndOption.getItemValueString("idQuestion"),
	        requireAttachment: false
	    }
	} catch(e){
		println("Error en getFieldsOption: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return optionDTO;
}

function generateDependenceInQuestion(option) {
    var generateDependence = false;
    try {
        var vista:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwQuestionWithDependence");
        var document:NotesDocument = vista.getDocumentByKey(option.id, true);
        if (null != document) {
            generateDependence = true;
        }
    } catch (e) {
    	println("Error en generateDependenceInQuestion: " + e.message);
		throw new HandlerGenericException(e.message);
    }

    return generateDependence;
}

function getMaxScoreInQuestion(idQuestion, option) {
    var score = 0;
    var optionWithMaxValue = null;
    
    var currentView:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwOptionsByQuestion");
    var document:NotesDocument = currentView.getDocumentByKey(idQuestion, true);
    if (null != document) {
    	optionWithMaxValue =  getFieldsOption(document);
    }

    if (generateDependenceInQuestion(option)) {
        score = option.score;
    } else {
        if (null != optionWithMaxValue) {
            score = optionWithMaxValue.score;
        }
    }

    return score;
}

/**
 * Fin de la clase Option (Opcion).
 * 
 */


/**
 * Metodo de la clase EvaluationScale (Escala Evaluacion).
 * 
 */

function getFieldsEvaluationScale(ndEval) {
	var evaluationScaleDTO = {};
	try {
		evaluationScaleDTO = {                                                                                         
	        id: ndEval.getItemValueString("id"),
	        name: ndEval.getItemValueString("name"),
	        applyTo: ndEval.getItemValueString("applyTo"),
	    	score: ndEval.getItemValueDouble("score"),
	    	helpText: ndEval.getItemValueString("helpText")
	    }
	} catch(e){
		println("Error en getFieldsEvaluationScale: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return evaluationScaleDTO;
}

/**
 * Fin de la clase EvaluationScale (Escala Evaluacion).
 * 
 */

/**
 * Metodo de la clase Dimension (Dimension).
 * 
 */

function getFieldsDimension(ndDimension) {
	var dimensionDTO = {};
	try {
		/**
		 * TO-DO:
		 * 		Realizar la consulta para el arreglo de criterions List<CriterionDTO> criterions;
		 */
		dimensionDTO = {                                                                                         
	        id: ndDimension.getItemValueString("id"),
	        name: ndDimension.getItemValueString("name"),
	        criterions: []
	    }
	} catch(e){
		println("Error en getFieldsDimension: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return dimensionDTO;
}

/**
 * Fin de la clase Dimension (Dimension).
 * 
 */


/**
 * Metodo de la clase Criterion (Criterio).
 * 
 */

function getFieldsCriterion(ndCriterion) {
	var criterionDTO = {};
	try {
		criterionDTO = {                                                                                         
	        id: ndCriterion.getItemValueString("id"),
	        name: ndCriterion.getItemValueString("name"),
	        idDimension: ndCriterion.getItemValueString("idDimension")
	    }
	} catch(e){
		println("Error en getFieldsCriterion: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return criterionDTO;
}

function getFieldsCriterionPercent(ndCriterion) {
	var criterionPercentDTO = {};
	try {
		criterionPercentDTO = {                                                                                         
	        id: ndCriterion.getItemValueString("id"),
	        idCall: ndCriterion.getItemValueString("idCall"),
	        idSurvey: ndCriterion.getItemValueString("idSurvey"),
	        idDimension: ndCriterion.getItemValueString("idDimension"),
	        idCriterion: ndCriterion.getItemValueString("idCriterion"),
	        percent: ndCriterion.getItemValueDouble("percent")
	    }
	} catch(e){
		println("Error en getFieldsCriterionPercent: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return criterionPercentDTO;
}

function getCriterionPercentById(idSurvey, id, from) {
	var response = {};
    try {
    	var db = sessionAsSigner.getCurrentDatabase();
        var vista:NotesView = db.getView("vwCriterionPercentByIdCriterion");
		if (from.equals("D")) {
			vista = db.getView("vwCriterionPercentByIdDimension");
		}
		
        var filter:java.util.Vector = new java.util.Vector(2);
        filter.add(0,id);
        filter.add(1,idSurvey);
        
    	var document:NotesDocument = vista.getDocumentByKey(filter, true);
    	if (null != document) {
	        response = getFieldsCriterionPercent(document);
	    }
    } catch (e) {
    	println("Error en getCriterionPercentById: " + e.message);
		throw new HandlerGenericException(e.message);
    }

    return response;
}

/**
 * Fin de la clase Criterion (Criterio).
 * 
 */


/**
 * Metodo de la clase Service (Servicio).
 * 
 */

function getFieldsService(ndService) {
	var serviceDTO = {};
	try {
		serviceDTO = {                                                                                         
	        id: ndService.getItemValueString("id"),
	        name: ndService.getItemValueString("name"),
	        helpText: ndService.getItemValueDouble("helpText")
	    }
	} catch(e){
		println("Error en getFieldsService: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return serviceDTO;
}

/**
 * Fin de la clase Service (Servicio).
 * 
 */

/**
 * Metodo de la clase Item (Item).
 * 
 */

function getFieldsItem(ndItem) {
	var itemDTO = {};
	try {
		itemDTO = {                                                                                         
	        id: ndItem.getItemValueString("id"),
	        name: ndItem.getItemValueString("name"),
	        idService: ndItem.getItemValueDouble("helpText"),
	        helpText: ndItem.getItemValueDouble("helpText")
	    }
	} catch(e){
		println("Error en getFieldsItem: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return itemDTO;
}

function getByIdService(parameters) {
    var response = {
    	items: [],
    	errorSend: ""
    };
    try {
    	var idService = parameters.idService? parameters.idService : "";
	    if (idService != "") {
	        // response = itemDAO.getByIdService(idService);
	        var vista:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwItemsByIdService");
	        var documents:NotesDocumentCollection = vista.getAllDocumentsByKey(idService, true);
	
	        if (null != documents && documents.getCount() > 0) {
	            var ndDocument:NotesDocument = documents.getFirstDocument();
	            var ndTemp:NotesDocument;
				while (ndDocument != null){
					response.items.push(getFieldsItem(ndDocument));
					
					ndTemp= documents.getNextDocument(ndDocument);
					ndDocument.recycle();
					ndDocument = ndTemp;
				}
	        }
	
	    } else {
	    	response.errorSend = "UNEXPECTED_VALUE";
	    	throw new HandlerGenericException(e.message);
	    }
    } catch(e){
		println("Error en getByIdService: " + e.message);
		throw new HandlerGenericException(e.message);
	}

    return response;
}

function getItemsByIdItemOrIdService(idItem, idService) {
    var response = {
    	items: [],
    	errorSend: ""
    }
    if (null != idItem && idItem.trim() != "") {
    	response.items.push(get(idItem, "ItemDTO"));
    } else {
        var parameterToService = {};
        parameterToService.idService = idService;
        var reqItem = getByIdService(parameterToService);
        if (reqItem.errorSend != "") {
        	response.errorSend = reqItem.errorSend;
        	return response;
        }
        response.items = reqItem.items;
    }

    return response;
}

/**
 * Fin de la clase Item (Item).
 * 
 */


/**
 * Metodo de la clase Question (Pregunta).
 * 
 */

function getFieldsQuestion(ndQuestion) {
	var questionDTO = {};
	try {
		/**
		 * TO-DO:
		 * 		Realizar la consulta para el arreglo de option List<OptionDTO> options;
		 * 		Realizar la consulta para el arreglo de answer List<AnswerDTO> answer;
		 */
		questionDTO = {
			id: ndQuestion.getItemValueString("id"),
		    idDimension: ndQuestion.getItemValueString("idDimension"),
		    idCriterion: ndQuestion.getItemValueString("idCriterion"),
		    wording: ndQuestion.getItemValueString("wording"),
		    type: ndQuestion.getItemValueString("type"),
		    required: ndQuestion.getItemValueString("required") == "1" ? true : false,
		    requireAttachment: ndQuestion.getItemValueString("requireAttachment") == "1" ? true : false,
		    options: [],
		    helpText: ndQuestion.getItemValueString("helpText"),
		    dependOfOptionId: ndQuestion.getItemValueString("dependOfOptionId"),
		    dependOfQuestion: ndQuestion.getItemValueString("dependOfQuestion"),
		    answer: [],
		    idCall: ndQuestion.getItemValueString("idCall"),
		    idSurvey: ndQuestion.getItemValue("idSurvey").size() > 0 ? vectorToArray(ndQuestion.getItemValue("idSurvey")) : []
	    }
	} catch(e){
		println("Error en getFieldsQuestion: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return questionDTO;
}

function buildCharFTSearch(fields) {
    var separatorToFTSearch = " AND ";
    var stringImploded = "";
    var fieldsToFTSearch = [];
    try {
    	for (var key in fields) {
    		var valueInField = fields[key];
    		fieldsToFTSearch.push("[" + key + "] = " + valueInField);
		}
    	var first = true;
        for (var i in fieldsToFTSearch) {
            if (!first) {
            	stringImploded += separatorToFTSearch;
            }
            stringImploded += fieldsToFTSearch[i];
            first = false;
        }
        
        return stringImploded;
    }catch(e) {
    	println("Error en buildCharFTSearch: " + e.message);
		throw new HandlerGenericException(e.message);
    }
}

/**
 * Filtra las preguntas segÃºn los campos especificados en
 * <code>fieldsToFilter</code>
 * 
 * @param fieldsToFilter
 *            Mapa clave valor de los campos por los cuales se filtrarÃ¡n las
 *            preguntas
 * @return ColecciÃ³n de preguntas
 * @throws HandlerGenericException
 */
function getThemWithFilter(fieldsToFilter) {
    var response = [];
    try {
        var currentView:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwQuestionsByCall");
        currentView.FTSearch(buildCharFTSearch(fieldsToFilter), 0);

        var entries:NotesViewEntryCollection = currentView.getAllEntries();
        var ve:NotesViewEntry;
        var veAux:NotesViewEntry;
        if (null != entries && entries.getCount() > 0) {
        	var nd:NotesDocument;
        	var question = {}; 
            ve = entries.getFirstEntry();
            while (ve != null) {
				nd = ve.getDocument();
				
				question = getFieldsQuestion(nd);
    			if (!isObjectEmpty(question)) {
    				response.push(question);
    			}
				
				veAux = entries.getNextEntry(ve); 
				ve.recycle();
				ve = veAux;
			}
            currentView.clear();
        }
        
        return response;
    }catch(e) {
    	println("Error en getThemWithFilter: " + e.message);
		throw new HandlerGenericException(e.message);
    }
} 

/**
 * Fin de la clase Question (Pregunta).
 * 
 */


/**
 * Metodo de la clase Answer (Respuesta).
 * 
 */

function getFieldsAnswer(ndAnswer) {
	var answerDTO = {};
	try {
		/**
		 * TO-DO:
		 * 		Realizar la consulta para el arreglo de option List<OptionDTO> options;
		 * 		Realizar la consulta para el arreglo de answer List<AnswerDTO> answer;
		 */
		answerDTO = {
			id: ndAnswer.getItemValueString("id"),
		    idSupplierByCall: ndAnswer.getItemValueString("idSupplierByCall"),
		    idSurvey: ndAnswer.getItemValueString("idSurvey"),
		    idQuestion: ndAnswer.getItemValueString("idQuestion"),
		    idOptionSupplier: ndAnswer.getItemValueString("idOptionSupplier"),
		    responseSupplier: ndAnswer.getItemValueString("responseSupplier"),
		    commentSupplier: ndAnswer.getItemValueString("commentSupplier"),
		    dateResponseSupplier: getValueDate(ndAnswer, "dateResponseSupplier", "yyyy/MM/dd"),
		    idOptionEvaluator: ndAnswer.getItemValueString("idOptionEvaluator"),
		    responseEvaluator: ndAnswer.getItemValueString("responseEvaluator"),
		    commentEvaluator: ndAnswer.getItemValueString("commentEvaluator"),
		    dateResponseEvaluator: getValueDate(ndAnswer, "dateResponseEvaluator", "yyyy/MM/dd"),
		    idAttachment: ndAnswer.getItemValue("idAttachment").size() > 0 ? vectorToArray(ndAnswer.getItemValue("idAttachment")) : [],
		    attachment: [],
		    idsToDelete: [],
		    previousAnswer: ""
	    }
	} catch(e){
		println("Error en getFieldsAnswer: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return answerDTO;
}

function getFieldsTechnicalTeamComment(ndTechnical) {
	var technicalTeamCommentDTO = {};
	try {
		technicalTeamCommentDTO  = {
			id: ndTechnical.getItemValueString("id"),
		    idSupplierByCall: ndTechnical.getItemValueString("idSupplierByCall"),
		    idService: ndTechnical.getItemValueString("idService"),
		    dateResponse: getValueDate(ndTechnical, "dateResponse", "yyyy/MM/dd"),
		    comment: ndTechnical.getItemValueString("comment")
	    }
	} catch(e){
		println("Error en getFieldsTechnicalTeamComment: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return technicalTeamCommentDTO ;
}

function getFieldsTechnicalTeamAnswer(ndTechnical) {
	var technicalTeamAnswerDTO = {};
	try {
		technicalTeamAnswerDTO  = {
			id: ndTechnical.getItemValueString("id"),
		    idSupplierByCall: ndTechnical.getItemValueString("idSupplierByCall"),
		    idService: ndTechnical.getItemValueString("idService"),
		    dateResponse: getValueDate(ndTechnical, "dateResponse", "yyyy/MM/dd"),
		    idItem: ndTechnical.getItemValueString("idItem"),
		    idEvaluationScale: ndTechnical.getItemValueString("idEvaluationScale")
	    }
	} catch(e){
		println("Error en getFieldsTechnicalTeamAnswer: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return technicalTeamAnswerDTO;
}

function getFieldsManagerTeamAnswer(ndManTeam) {
	var managerTeamAnswerDTO = {};
	try {
		managerTeamAnswerDTO = {
			id: ndManTeam.getItemValueString("id"),
			idSupplierByCall: ndManTeam.getItemValueString("idSupplierByCall"),
			whoEvaluate: ndManTeam.getItemValueString("whoEvaluate"),
		    idEvaluationScale: ndManTeam.getItemValueString("idEvaluationScale"),
		    comment: ndManTeam.getItemValueString("comment"),
		    dateResponse: getValueDate(ndManTeam, "dateResponse", "yyyy/MM/dd")
	    }
	} catch(e){
		println("Error en getFieldsManagerTeamAnswer: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return managerTeamAnswerDTO;
}

function getFieldsManagerTeam(ndManTeam) {
	var managerTeamDTO = {};
	try {
		managerTeamDTO = {
			id: ndManTeam.getItemValueString("id"),
			idUser: ndManTeam.getItemValueString("idUser"),
			idCall: ndManTeam.getItemValueString("idCall")
	    }
	} catch(e){
		println("Error en getFieldsManagerTeam: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return managerTeamDTO;
}

function getIdOfManagerTeamMembersInCall(idCall) {
    var idMembers = [];
    try {
    	var currentView:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwManagerTeamByIdCall");
	    var documents:NotesDocumentCollection = currentView.getAllDocumentsByKey(idCall, true);
	    if (documents != null && documents.getCount() > 0) {
	    	var ndManTeam:NotesDocument = documents.getFirstDocument();
	    	var ndTemp:NotesDocument;
	    	var managerTeamMember = null;
			while (ndManTeam != null){
				
				idMembers.push(ndManTeam.getItemValueString("idUser"));
				
				ndTemp= documents.getNextDocument(ndManTeam);
				ndManTeam.recycle();
				ndManTeam = ndTemp;
			}
	    }
	    
	    return idMembers;
    } catch (e) {
    	println("Error en getIdOfManagerTeamMembersInCall: " + e.message);
		throw new HandlerGenericException(e.message);
    }
}

function setSummarySurveyBySupplier(optionAnswer, summary) {
    summary.setAnswerSupplier(optionAnswer.wording);
    summary.setScoreOfSupplier(optionAnswer.score);
}

function setSummarySurveyByEvaluator(answer, summary) {
	var SCORE_OF_NA = -1;
    if (null != answer.idOptionEvaluator && answer.idOptionEvaluator != "") {
        var optionEvaluator = get(answer.idOptionEvaluator, "OptionDTO");
        summary.setAnswerEvaluator(optionEvaluator.wording);
        summary.setScoreOfEvaluator(optionEvaluator.score);
    } else {
        summary.setScoreOfEvaluator(SCORE_OF_NA);
    }
}

/**
 * Dada la informaciÃ³n en <code>parameters</code> identifica por cuales
 * campos se deben filtrar las preguntas.
 * 
 * @param parameters
 *            Mapa clave valor de los filtros por los que se van a optener
 *            los resultados
 * @return Mapa clave valor con los campos que se debe filtrar.
 * @throws HandlerGenericException
 */
function identifyFieldsToFTSearch(parameters) {
    var fields = {};
    var FieldsQuestion = ["idCall", "idCriterion", "idDimension"];
    var field;
    for (var i in FieldsQuestion) {
    	field = FieldsQuestion[i];
        if (parameters.hasOwnProperty(field)) {
            var valueInField = parameters[field];
            if (null != valueInField && valueInField.trim() != "") {
                fields[field] = valueInField;
            }
        }
    }
    
    return fields;
}

/**
 * Obtiene las respuesta en base a una convocatoria definitiva de un
 * proveedor.
 * 
 * @param idSupplierByCall
 *            Identificador de la convocatoria definitiva de un proveedor.
 * @return ColecciÃ³n de respuestas
 * @throws HandlerGenericException
 */
function getAsnwersByIdSupplierByCall(idSupplierByCall) {
    var response = [];
    try {
        var currentView:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwAnswersBySupplierByCall");
        var documents:NotesDocumentCollection = currentView.getAllDocumentsByKey(idSupplierByCall, true);
        if (documents != null && documents.getCount() > 0) {
        	var ndAnswer:NotesDocument = documents.getFirstDocument();
        	var ndTemp:NotesDocument;
        	var answer = null;
			while (ndAnswer != null){
				
				answer = getFieldsAnswer(ndAnswer);
				response.push(answer);
				
				ndTemp= documents.getNextDocument(ndAnswer);
				ndAnswer.recycle();
				ndAnswer = ndTemp;
			}
        }
    } catch (e) {
    	println("Error en getAsnwersByIdSupplierByCall: " + e.message);
		throw new HandlerGenericException(e.message);
    }

    return response;
}

/**
 * Obtiene las respuestas por pregunta y convocatoria definitiva de un
 * proveedor.
 * 
 * @param idSupplierByCall
 *            Identificador de la convocatoria definitiva de un proveedor.
 * @param questions
 *            CollecciÃ³n de preguntas a las que se desea obtener la
 *            respuesta.
 * @return ColecciÃ³n de respuestas
 * @throws HandlerGenericException
 */
function getByQuestionAndSupplierByCall(questions, idSupplierByCall) {
    var response = [];

    var key:java.util.Vector = new java.util.Vector(2);
    var entityView = "";
    var answer = null;
    for (var i in questions) {
        key.add(0,questions[i].id);
        key.add(1,idSupplierByCall);
        entityView = "vwAnswersByQuestionAndIdSupplierByCall";
        answer = getBy(key, entityView, "AnswerDTO");
        if (null != answer) {
        	response.push(answer);
        }
        key.clear();
    }

    return response;
}


/**
 * Obtiene las respuestas que se van a tener en cuenta para el reporte de
 * Nota promedio.
 * 
 * @param idSupplierByCall
 *            Identificador de la convocaria definitiva y finalizada de un
 *            proveedor.
 * @param parameters
 *            Mapa clave valor de los filtros por los que se van a optener
 *            los resultados
 * @return CollecciÃ³n de respuestas
 * @throws HandlerGenericException
 */
function getAnswersForReportOfAverageGrade(idSupplierByCall, parameters) {
    var response = {
    	answers: [],	
    	errorSend: ""	
    };
    
    try {
	    var fieldsToFilterQuestion = identifyFieldsToFTSearch(parameters);
	    if (!isObjectEmpty(fieldsToFilterQuestion)) {
	        var questions = getThemWithFilter(fieldsToFilterQuestion);
	        if (questions.length == 0) {
	        	response.errorSend = "INFORMATION_NOT_FOUND"	
	        } else {
	        	response.answers = getByQuestionAndSupplierByCall(questions, idSupplierByCall);	
	        }        
	    } else {
	        response.answers = getAsnwersByIdSupplierByCall(idSupplierByCall);
	    }

    	return response;
    	
    } catch(e){
		println("Error en getAnswersForReportOfAverageGrade: " + e.message);
		throw new HandlerGenericException(e.message);
	}
}

function getCommentBySupplierByCallAndIdService(idSupplierByCall, idService) {
    var technicalTeamComment = {};
    var filter:java.util.Vector = new java.util.Vector(2);
    filter.add(0,idSupplierByCall);
    filter.add(1,idService);
    var vista:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwTechnicalTeamCommentByIdSupplierByCallAndIdService");
    var document:NotesDocument = vista.getDocumentByKey(filter, true);

    if (null != document) {
        technicalTeamComment = getFieldsTechnicalTeamComment(document);
    }

    return technicalTeamComment.comment ? technicalTeamComment.comment : "";
}

function getTechnicalteamAnswer(idSupplierByCall, idService, idItem) {
	var filter:java.util.Vector = new java.util.Vector(3);
	filter.add(0,idSupplierByCall);
	filter.add(1,idService);
	filter.add(2,idItem);
	
	var evaluationScale = {};
	var currentView:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwTechnicalTeamAnswerByIdSupplierByCallAndServiceAndItem");
	// var currentView:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwTechnicalTeamAnswerByIdSupplierByCallAndServiceAndI");
	var document:NotesDocument = currentView.getDocumentByKey(filter, true);
	
	if (null != document) {
		evaluationScale = getFieldsTechnicalTeamAnswer(document);
	}
	
	return evaluationScale;
}

function getAnswersOfSupplier(idSupplierByCall) {
    var answersOfSupplier = [];
    var vista:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwManagerTeamAnswersByIdSupplierByCallAndWhoEvaluate");
    var documents = vista.getAllDocumentsByKey(idSupplierByCall, true);
       
    if (documents != null && documents.getCount() > 0) {
    	var ndDoc:NotesDocument = documents.getFirstDocument();
    	var ndTemp:NotesDocument;
		while (ndDoc != null){
			answersOfSupplier.push(getFieldsManagerTeamAnswer(ndDoc));
			
			ndTemp= documents.getNextDocument(ndDoc);
			ndDoc.recycle();
			ndDoc = ndTemp;
		}
    }

    return answersOfSupplier;
}

//TODO: Se debe descomnetar esta función cuando se pase a producción el desarrollo de porcentajes por criterio
function buildReportOfAverageGradeBySupplier(idSupplierByCall, recordOfReport, parameters) {
	var response = {
		recordOfReport: {},
		errorSend: ""
	};
	try {
		var SCORE_OF_NA = -1;
	    var MINIMUM_SCORE = 0;
		var reqAnswers = getAnswersForReportOfAverageGrade(idSupplierByCall, parameters);
		
		if (reqAnswers.errorSend != "") {
			response.errorSend = reqAnswers.errorSend;
			return response;
		}
		var answers = reqAnswers.answers;
		
        var sumScoreAnsweredBySupplierNA = 0;
        var sumScoreAnsweredByEvaluatorNA = 0;
        var counterQuestions = answers.length;
        var sumExpectedScoreSupplier = 0;
        var sumExpectedScoreEvaluator = 0;
        var sumScoreAnsweredBySupplier = 0;
        var sumScoreAnsweredByEvaluator = 0;
        var summariesSurvey = [];
        
        var criterionPercentDTO = {};
        var dimensionPercentDTO = {};
        var percents = {};
        var counterQuestionsByCriterion = {};
        var scoresOfEvaluators = {};
        var scoresOfSupplier = {};
        
        var contador = 0;
        var contC = 0;
        var scoreS = [];
        var scoreAuxS = []; 
        for (var i in answers) {
        	var answer = answers[i];
        	var question = get(answer.idQuestion, "QuestionDTO");
            var option = get(answer.idOptionSupplier, "OptionDTO");
            var criterion = get(question.idCriterion, "CriterionDTO");
            var dimension = get(question.idDimension, "DimensionDTO");
            // var report = new ReportOfCalificationsBySuppliers();
            
            if (!percents.hasOwnProperty(question.idCriterion)) {
				criterionPercentDTO = getCriterionPercentById(answer.idSurvey, question.idCriterion, "C");
				percents[criterionPercentDTO.idCriterion] = criterionPercentDTO.percent;
			}
	          
			if (!percents.hasOwnProperty(question.idDimension)) {
			    dimensionPercentDTO = getCriterionPercentById(answer.idSurvey, question.idDimension, "D");
			    percents[dimensionPercentDTO.idDimension] = dimensionPercentDTO.percent;
			}
			  
			if (!counterQuestionsByCriterion.hasOwnProperty(question.idCriterion)) {
			    counterQuestionsByCriterion[question.idCriterion] = 1;
			} else {
			    contC = counterQuestionsByCriterion[question.idCriterion];
			    counterQuestionsByCriterion[question.idCriterion] = contC + 1;
			}
            
            var summarySurvey = new SummarySurvey();
            
            var expectedScoreSupplier = 0;
            var expectedScoreEvaluator = 0;
            
            if (null != option && !isObjectEmpty(option)) {
                setSummarySurveyBySupplier(option, summarySurvey);
                if (summarySurvey.getScoreOfSupplier() >= MINIMUM_SCORE) {
                    sumScoreAnsweredBySupplier = sumScoreAnsweredBySupplier + summarySurvey.getScoreOfSupplier();
                    
                    if (!scoresOfSupplier.hasOwnProperty(question.idCriterion)) {
                        scoreS = [];
                        scoreS.push(summarySurvey.getScoreOfSupplier().toString());
                        scoresOfSupplier[question.idCriterion] = scoreS;
					} else {
	                    scoreAuxS = scoresOfSupplier[question.idCriterion];
	                    scoreAuxS.push(summarySurvey.getScoreOfSupplier().toString());
	                    scoresOfSupplier[question.idCriterion] = scoreAuxS;
					}
                    
                    expectedScoreSupplier = getMaxScoreInQuestion(question.id, option);
                    sumExpectedScoreSupplier = sumExpectedScoreSupplier + expectedScoreSupplier;
                } else {
                    summarySurvey.setExpectedScoreSupplier(SCORE_OF_NA);
                    expectedScoreSupplier = SCORE_OF_NA;
                    sumScoreAnsweredBySupplierNA = sumScoreAnsweredBySupplierNA + SCORE_OF_NA;
                }

                setSummarySurveyByEvaluator(answer, summarySurvey);
                if (summarySurvey.getScoreOfEvaluator() >= MINIMUM_SCORE) {
                    var optionEvaluator = get(answer.idOptionEvaluator, "OptionDTO");
                    sumScoreAnsweredByEvaluator = sumScoreAnsweredByEvaluator + summarySurvey.getScoreOfEvaluator();
                    
                    if (!scoresOfEvaluators.hasOwnProperty(question.idCriterion)) {
                        score = [];
                        score.push(summarySurvey.getScoreOfEvaluator().toString());
                        scoresOfEvaluators[question.idCriterion] = score;
					} else {
                        scoreAux = scoresOfEvaluators[question.idCriterion];
                        scoreAux.push(summarySurvey.getScoreOfEvaluator().toString());
                        scoresOfEvaluators[question.idCriterion] = scoreAux;
                    }
                    
                    expectedScoreEvaluator = getMaxScoreInQuestion(question.id, optionEvaluator);
                    sumExpectedScoreEvaluator = sumExpectedScoreEvaluator + expectedScoreEvaluator;
                } else {
                	contador++;
                    summarySurvey.setExpectedScoreEvaluator(SCORE_OF_NA);
                    expectedScoreEvaluator = SCORE_OF_NA;
                    sumScoreAnsweredByEvaluatorNA = sumScoreAnsweredByEvaluatorNA + SCORE_OF_NA;
                }

            } else {
                summarySurvey.setAnswerSupplier(answer.responseSupplier);

                if (answer.responseSupplier != "") {
                    summarySurvey.setAnswerEvaluator(answer.responseSupplier);
                    expectedScoreEvaluator = SCORE_OF_NA;
                }

                expectedScoreSupplier = SCORE_OF_NA;
            }
            
            summarySurvey.setExpectedScoreSupplier(expectedScoreSupplier);
            summarySurvey.setExpectedScoreEvaluator(expectedScoreEvaluator);
            summarySurvey.setQuestion(question.wording);
            summarySurvey.setQuestionType(question.type);
            summarySurvey.setCommentSupplier(answer.commentSupplier);
            summarySurvey.setCommentEvaluator(answer.commentEvaluator);
            summarySurvey.setCriterion(criterion.name);
            summarySurvey.setDimension(dimension.name);
            summarySurvey.setPercentCriterion(percents[criterion.id]);
            summarySurvey.setPercentDimension(percents[dimension.id]);
            summarySurvey.setAttachmentCount(answer.idAttachment.length);

            summariesSurvey.push(summarySurvey.getObject());
        }
        
        counterQuestions = counterQuestions * SCORE_OF_NA;
        
        var percentScoreOfEvaluator = 0;
        var percentScoreOfSupplier = 0;
        
        var itemsPercents = $.keys(percents);
        var itemsCounterQuestionsByCriterion = $.keys(counterQuestionsByCriterion);
        if (itemsPercents.length >= itemsCounterQuestionsByCriterion.length) {
          var scoresQEvaluators = null;
          var scoresQSuppliers = null;
          var counterQ;
          for (var key in counterQuestionsByCriterion) {
                counterQ = counterQuestionsByCriterion[key];
                var idCriterion = key;
                var percentCri = (percents[idCriterion] / 100) / counterQ;
                scoresQEvaluators = scoresOfEvaluators[idCriterion];
                if (null != scoresQEvaluators && scoresQEvaluators.length > 0) {
                  	for (var i = 0; i < scoresQEvaluators.length; i++) {
                    	percentScoreOfEvaluator = percentScoreOfEvaluator + (parseFloat(scoresQEvaluators[i]) * percentCri);
					}
                  	scoresQEvaluators = null;
                }
                scoresQSuppliers = scoresOfSupplier[idCriterion];
                if (null != scoresQSuppliers && scoresQSuppliers.length > 0) {
                  	for (var i = 0; i < scoresQSuppliers.length; i++) {
                    	percentScoreOfSupplier = percentScoreOfSupplier + (parseFloat(scoresQSuppliers[i]) * percentCri);
                  	}
                  	scoresQSuppliers = null;
                }
                // percentScoreOfEvaluator = (short) (percentScoreOfEvaluator + (percentCri / counterQ));
            }
        }

        recordOfReport.expectedScoreSupplier = sumExpectedScoreSupplier;
        recordOfReport.expectedScoreEvaluator = sumExpectedScoreEvaluator;

        if (counterQuestions == sumScoreAnsweredBySupplierNA) {
            sumScoreAnsweredBySupplier = SCORE_OF_NA;
            recordOfReport.expectedScoreSupplier = SCORE_OF_NA;
        }
        recordOfReport.totalScoreOfSupplier = calculateTotalScore(sumScoreAnsweredBySupplier, sumExpectedScoreSupplier);
        recordOfReport.totalPercentScoreOfSupplier = percentScoreOfSupplier;

        if (counterQuestions == sumScoreAnsweredByEvaluatorNA) {
            sumScoreAnsweredByEvaluator = SCORE_OF_NA;
            recordOfReport.expectedScoreEvaluator = SCORE_OF_NA;
        }
        recordOfReport.totalScoreOfEvaluator = calculateTotalScore(sumScoreAnsweredByEvaluator, sumExpectedScoreEvaluator);
        recordOfReport.totalPercentScoreOfEvaluator = percentScoreOfEvaluator;

        recordOfReport.scoreOfSupplier = sumScoreAnsweredBySupplier;
        recordOfReport.scoreOfEvaluator = sumScoreAnsweredByEvaluator;
        recordOfReport.summarySurvey = summariesSurvey;
        
        response.recordOfReport = recordOfReport;
        
        return response;
	} catch(e){
		println("Error en buildReportOfAverageGradeBySupplier: " + e.message);
		throw new HandlerGenericException(e.message);
	}
}

/* function buildReportOfAverageGradeBySupplier(idSupplierByCall, recordOfReport, parameters) {
	var response = {
		recordOfReport: {},
		errorSend: ""
	};
	try {
		var SCORE_OF_NA = -1;
	    var MINIMUM_SCORE = 0;
		var reqAnswers = getAnswersForReportOfAverageGrade(idSupplierByCall, parameters);
		
		if (reqAnswers.errorSend != "") {
			response.errorSend = reqAnswers.errorSend;
			return response;
		}
		var answers = reqAnswers.answers;
		
        var sumScoreAnsweredBySupplierNA = 0;
        var sumScoreAnsweredByEvaluatorNA = 0;
        var counterQuestions = answers.length;
        var sumExpectedScoreSupplier = 0;
        var sumExpectedScoreEvaluator = 0;
        var sumScoreAnsweredBySupplier = 0;
        var sumScoreAnsweredByEvaluator = 0;
        var summariesSurvey = [];
        
        var contador = 0;
        for (var i in answers) {
        	var answer = answers[i];
        	var question = get(answer.idQuestion, "QuestionDTO");
            var option = get(answer.idOptionSupplier, "OptionDTO");
            var criterion = get(question.idCriterion, "CriterionDTO");
            var dimension = get(question.idDimension, "DimensionDTO");
            // var report = new ReportOfCalificationsBySuppliers();
            var summarySurvey = new SummarySurvey();
            
            var expectedScoreSupplier = 0;
            var expectedScoreEvaluator = 0;
            
            if (null != option && !isObjectEmpty(option)) {
                setSummarySurveyBySupplier(option, summarySurvey);
                if (summarySurvey.getScoreOfSupplier() >= MINIMUM_SCORE) {
                    sumScoreAnsweredBySupplier = sumScoreAnsweredBySupplier + summarySurvey.getScoreOfSupplier();
                    expectedScoreSupplier = getMaxScoreInQuestion(question.id, option);
                    sumExpectedScoreSupplier = sumExpectedScoreSupplier + expectedScoreSupplier;
                } else {
                    summarySurvey.setExpectedScoreSupplier(SCORE_OF_NA);
                    expectedScoreSupplier = SCORE_OF_NA;
                    sumScoreAnsweredBySupplierNA = sumScoreAnsweredBySupplierNA + SCORE_OF_NA;
                }

                setSummarySurveyByEvaluator(answer, summarySurvey);
                if (summarySurvey.getScoreOfEvaluator() >= MINIMUM_SCORE) {
                    var optionEvaluator = get(answer.idOptionEvaluator, "OptionDTO");
                    sumScoreAnsweredByEvaluator = sumScoreAnsweredByEvaluator + summarySurvey.getScoreOfEvaluator();
                    expectedScoreEvaluator = getMaxScoreInQuestion(question.id, optionEvaluator);
                    sumExpectedScoreEvaluator = sumExpectedScoreEvaluator + expectedScoreEvaluator;
                } else {
                	contador++;
                    summarySurvey.setExpectedScoreEvaluator(SCORE_OF_NA);
                    expectedScoreEvaluator = SCORE_OF_NA;
                    sumScoreAnsweredByEvaluatorNA = sumScoreAnsweredByEvaluatorNA + SCORE_OF_NA;
                }

            } else {
                summarySurvey.setAnswerSupplier(answer.responseSupplier);

                if (answer.responseSupplier != "") {
                    summarySurvey.setAnswerEvaluator(answer.responseSupplier);
                    expectedScoreEvaluator = SCORE_OF_NA;
                }

                expectedScoreSupplier = SCORE_OF_NA;
            }
            
            summarySurvey.setExpectedScoreSupplier(expectedScoreSupplier);
            summarySurvey.setExpectedScoreEvaluator(expectedScoreEvaluator);
            summarySurvey.setQuestion(question.wording);
            summarySurvey.setQuestionType(question.type);
            summarySurvey.setCommentSupplier(answer.commentSupplier);
            summarySurvey.setCommentEvaluator(answer.commentEvaluator);
            summarySurvey.setCriterion(criterion.name);
            summarySurvey.setDimension(dimension.name);
            summarySurvey.setAttachmentCount(answer.idAttachment.length);

            summariesSurvey.push(summarySurvey.getObject());
        }
        
        counterQuestions = counterQuestions * SCORE_OF_NA;

        recordOfReport.expectedScoreSupplier = sumExpectedScoreSupplier;
        recordOfReport.expectedScoreEvaluator = sumExpectedScoreEvaluator;

        if (counterQuestions == sumScoreAnsweredBySupplierNA) {
            sumScoreAnsweredBySupplier = SCORE_OF_NA;
            recordOfReport.expectedScoreSupplier = SCORE_OF_NA;
        }
        recordOfReport.totalScoreOfSupplier = calculateTotalScore(sumScoreAnsweredBySupplier, sumExpectedScoreSupplier);

        if (counterQuestions == sumScoreAnsweredByEvaluatorNA) {
            sumScoreAnsweredByEvaluator = SCORE_OF_NA;
            recordOfReport.expectedScoreEvaluator = SCORE_OF_NA;
        }
        recordOfReport.totalScoreOfEvaluator = calculateTotalScore(sumScoreAnsweredByEvaluator, sumExpectedScoreEvaluator);

        recordOfReport.scoreOfSupplier = sumScoreAnsweredBySupplier;
        recordOfReport.scoreOfEvaluator = sumScoreAnsweredByEvaluator;
        recordOfReport.summarySurvey = summariesSurvey;
        
        response.recordOfReport = recordOfReport;
        
        return response;
	} catch(e){
		println("Error en buildReportOfAverageGradeBySupplier: " + e.message);
		throw new HandlerGenericException(e.message);
	}
} */

function buildReportOfTechnicalTeam(idSupplierByCall, recordOfReport, parameters) {
	var response = {
		recordOfReport: {},
		errorSend: ""
	};
	try {
		var SCORE_OF_NA = -1;
	    var MINIMUM_SCORE = 0;
	    var idService = parameters.service ? parameters.service : "";
	    var idItem = parameters.item ? parameters.item : "";
	    var services = [];
	    var items = [];
	    if (null != idService && idService.trim() != "") {
	        services.push(get(idService, "ServiceDTO"));
	    } else {
	        var temporalServices = getAll("vwServices", "ServiceDTO");
	        for (var i in temporalServices) {
	            services.push(temporalServices[i]);
	        }
	    }
	    
	    var serviceToReport = [];
	    var counterAllItems = 0;
	    var sumScoreAllItems = 0;
	    var counterAllItemsWithoutAnswer = 0;
	    var reqItems;
	    var service
	    for (var i = 0; i<services.length; i++) {
	    	service = services[i];
	        sumScoreByItemsInService = 0;
	        var serviceRecord = new Service();
	        serviceRecord.name = service.name;
	        reqItems = getItemsByIdItemOrIdService(idItem, service.id);
	        if (reqItems.errorSend != "") {
	        	response.errorSend = reqItems.errorSend;
    			i = services.length;
	        }
	        items = reqItems.items ? reqItems.items : [];
	        serviceRecord.comment = getCommentBySupplierByCallAndIdService(idSupplierByCall, service.id);
	
	        var itemToReport = [];
	        var counterItems = items.length;
	        var counterItemsWithoutAnswer = 0;
	        counterAllItems = (counterAllItems + items.length);
	        for (var j in items) {
	        	var item = items[j];
	            var itemRecord = new Item();
	            itemRecord.name = item.name;
	
	            var technicalTeamAnswer = getTechnicalteamAnswer(idSupplierByCall, service.id, item.id);
	
	            var scoreEvaluation = 0;
	            if (technicalTeamAnswer.id && null != technicalTeamAnswer.id) {
	                scoreEvaluation = get(technicalTeamAnswer.idEvaluationScale, "EvaluationScaleDTO").score;
	                sumScoreByItemsInService = (sumScoreByItemsInService + scoreEvaluation);
	                sumScoreAllItems = (sumScoreAllItems + scoreEvaluation);
	                itemRecord.answer = scoreEvaluation;
	            } else {
	                itemRecord.answer = SCORE_OF_NA;
	                counterItemsWithoutAnswer = (counterItemsWithoutAnswer + 1);
	                counterAllItemsWithoutAnswer = (counterAllItemsWithoutAnswer + 1);
	            }
	
	            itemToReport.push(itemRecord.getObject());
	        }
	
	        serviceRecord.items = itemToReport;
	        if (counterItems == counterItemsWithoutAnswer) {
	            serviceRecord.total = SCORE_OF_NA;
	        } else {
	            serviceRecord.total = sumScoreByItemsInService / counterItems;
	        }
	
	        serviceToReport.push(serviceRecord.getObject());
	    }
	    
	    if (response.errorSend != "") {
        	return response;
        }
	
	    if (counterAllItems == counterAllItemsWithoutAnswer) {
	        recordOfReport.totalScoreInService = SCORE_OF_NA;
	    } else {
	        var totalScoreInService = sumScoreAllItems / counterAllItems;
	        recordOfReport.totalScoreInService = totalScoreInService;
	    }
	
	    recordOfReport.services = serviceToReport;
	    
		response.recordOfReport = recordOfReport;
        
        return response;
	} catch(e){
		println("Error en buildReportOfTechnicalTeam: " + e.message);
		throw new HandlerGenericException(e.message);
	}
}

function buildReportOfManagerTeam(idSupplierByCall, recordOfReport) {
    var answerToReport = [];
    var managerAnswers = getAnswersOfSupplier(idSupplierByCall);
    var answer;
    for (var i in managerAnswers) {
    	answer = managerAnswers[i];
        var answerRecord = new SummaryManagerSurvey();
        answerRecord.comment = answer.comment;
        answerRecord.whoEvaluate = answer.whoEvaluate;
        answerRecord.score = get(answer.idEvaluationScale, "EvaluationScaleDTO").score;
        answerToReport.push(answerRecord.getObject());
    }
    recordOfReport.managerAnswers = answerToReport;

    return recordOfReport;
}

/**
 * Fin de la clase Answer (Respuesta).
 * 
 */


/**
 * Metodo de la clase Call (Convocatoria).
 * 
 */

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

function getFieldsReportOfCalificationsBySuppliers(nd) {
	var reportOfCalificationsBySuppliersDTO = {
		fields: {},
		methods: {}
	};
	try {
		reportOfCalificationsBySuppliersDTO.fields = {
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
		reportOfCalificationsBySuppliersDTO.methods = {
			isCaducedDateToFinishCall: isCaducedDate(nd.getItemValue("dateToFinishCall").elementAt(0), new Date()),
			isCaducedDeadLineToMakeSurvey: isCaducedDate(nd.getItemValue("deadlineToMakeSurvey").elementAt(0), new Date()), 
			isCaducedDeadLineToMakeSurveyEvaluator: isCaducedDate(nd.getItemValue("deadlineToMakeSurveyEvaluator").elementAt(0), new Date()),
			isCaducedDeadLineToMakeSurveyTechnicalTeam: isCaducedDate(nd.getItemValue("deadlineToMakeSurveyTechnicalTeam").elementAt(0), new Date()),
			isCaducedDeadLineToMakeSurveyManagerTeam: isCaducedDate(nd.getItemValue("deadlineToMakeSurveyManagerTeam").elementAt(0), new Date())
		}
	} catch(e){
		println("Error en getFieldsReportOfCalificationsBySuppliers: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return reportOfCalificationsBySuppliersDTO;
}

function isCaducedDate(dateToCompare, today) {
	var response = false;
	var actualDate:NotesDateTime = session.createDateTime(today);
	var dateCompare:NotesDateTime = dateToCompare;
	
	if (actualDate.timeDifference(dateCompare) > 0) {
		response = true;
	}
	return response;
}

function identifyParticpantsByCallYearAndStageStates(year, statesOfStage) {
	var callsBySupplier = [];
	try {
		var viewName:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwSuppliersByCallIdStateAndIdCall");
		var vwSupplierSpecial:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwSuppliersByCallSpecial");
		var separatorToFTSearch = " AND ";
		var sep = "";
		var query = "[idCall] = " + getIdCallByYear(year);
		var idState = "";
		
		if (statesOfStage.length > 0) {
			for (var i in statesOfStage) {
				if (i == 0) {
					query += " AND (";
				}
				idState = getStateByShortName(statesOfStage[i]).id;
				if (idState != "") {
					query += sep + "[idState] = " + idState;
					sep = " OR ";
				}
			}
			query += ")";
		}
		
	    // callsBySupplier.addAll(getAllBy(getIdCallByYear(year), viewName, "SupplierByCallDTO"));
		viewName.refresh();
	    viewName.FTSearch(query, 0);

        var entries:NotesViewEntryCollection = viewName.getAllEntries();
        var ve:NotesViewEntry;
        var veAux:NotesViewEntry;
        if (null != entries && entries.getCount() > 0) {
        	var nd:NotesDocument;
        	var supplierByCall = {}; 
            ve = entries.getFirstEntry();
            while (ve != null) {
				nd = ve.getDocument();
				
				supplierByCall = getFieldsSupplierByCall(nd);
    			if (!isObjectEmpty(supplierByCall)) {
    				callsBySupplier.push(supplierByCall);
    			}
				
				veAux = entries.getNextEntry(ve); 
				ve.recycle();
				ve = veAux;
			}
            viewName.clear();
        }
        
        // Buscar supplier by call special
        vwSupplierSpecial.refresh();
        vwSupplierSpecial.FTSearch(query, 0);
        
        var entries:NotesViewEntryCollection = vwSupplierSpecial.getAllEntries();
        var ve:NotesViewEntry;
        var veAux:NotesViewEntry;
        if (null != entries && entries.getCount() > 0) {
        	var nd:NotesDocument;
        	var supplierByCall = {}; 
            ve = entries.getFirstEntry();
            while (ve != null) {
				nd = ve.getDocument();
				
				supplierByCall = getFieldsSupplierByCallSpecial(nd);
    			if (!isObjectEmpty(supplierByCall)) {
    				callsBySupplier.push(supplierByCall);
    			}
				
				veAux = entries.getNextEntry(ve); 
				ve.recycle();
				ve = veAux;
			}
            vwSupplierSpecial.clear();
        }
	    
		return callsBySupplier;
    }catch(e) {
    	println("Error en identifyParticpantsByCallYearAndStageStates: " + e.message);
		throw new HandlerGenericException(e.message);
    }
}

function getRecordOfReport(supplierByCall, supplier, parameters) {
	var response = {
		recordOfReport: {
			totalPercentScoreOfSupplier: 0,
			totalPercentScoreOfEvaluator: 0,
			services: null,
			totalScoreInService: 0,
			managerAnswers: null
		},
		errorSend: ""
	};
	try {
		var supply = get(supplier.idSupply, "SupplyDTO");
		var category = get(supplier.idCategory);
		var companySize = get(supplier.idCompanySize);
		
		response.recordOfReport.nit = supplier.nit;
		response.recordOfReport.sapCode = supplier.sapCode;
		response.recordOfReport.name = supplier.businessName;
		response.recordOfReport.supply = supply.name;
		response.recordOfReport.category = category.name;
		response.recordOfReport.companySize = companySize.name;
		response.recordOfReport.idSupplier = supplierByCall.idSupplier;
		response.recordOfReport.idSupplierByCall = supplierByCall.id;
		response.recordOfReport.idState = supplierByCall.idState;
		response.recordOfReport.states = getAll("vwStates", "StateDTO");
		response.recordOfReport.whoEvaluateOfTechnicalTeam= supplierByCall.whoEvaluateOfTechnicalTeam;

	    var typeReport = parameters.type;
		
	    if (undefined == typeReport) {
	        response.errorSend = "UNEXPECTED_VALUE";
	        return response;
	    }

	    if (typeReport == "SUPPLIER_EVALUATOR") {
	    	 var reqRecord = buildReportOfAverageGradeBySupplier(supplierByCall.id, response.recordOfReport,
	                parameters);
	    	 if (reqRecord.errorSend != "") {
	    		 response.errorSend = reqRecord.errorSend;
	    		 return response;
	    	 }
	    	 response.recordOfReport = reqRecord.recordOfReport;
	    } else {
	        if (typeReport == "TECHNICAL_MANAGER") {
	        	var reqRecord = buildReportOfTechnicalTeam(supplierByCall.id, response.recordOfReport, parameters);
	        	if (reqRecord.errorSend != "") {
    		 		response.errorSend = reqRecord.errorSend;
    		 		return response;
		    	}
	        	response.recordOfReport = reqRecord.recordOfReport;
	            response.recordOfReport = buildReportOfManagerTeam(supplierByCall.id, response.recordOfReport);
	        }
	    }
        
        return response;
	} catch(e){
		println("Error en getRecordOfReport: " + e.message);
		throw new HandlerGenericException(e.message);
	}
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

function getFieldsRol(ndRol) {
	var rolDTO = {};
	try {
		rolDTO = {
	    	id: ndRol.getItemValueString("id"),
	    	name: ndRol.getItemValueString("name"),
	   		shortName: ndRol.getItemValueString("shortName")
	    }
	} catch(e){
		println("Error en getFieldsRol: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return rolDTO;
}

function getFieldsUser(ndUser) {
	var userDTO = {};
	try {
		userDTO = {
	    	id: ndUser.getItemValueString("id"),
	    	name: ndUser.getItemValueString("name"),
	    	idRols: ndUser.getItemValue("idRols").size() > 0 ? vectorToArray(ndUser.getItemValue("idRols")) : [],
	    	email: ndUser.getItemValueString("email")
	    }
	} catch(e){
		println("Error en getFieldsUser: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return userDTO;
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
		var keyForm = nd.getItemValueString("form");
		switch (keyForm){
			case "frCategory":
				masterDTO.idSupply = nd.getItemValueString("idSupply");
				masterDTO.subCategories = [];
				break;
			case "frCity":
				masterDTO.idDepartment = nd.getItemValueString("idDepartment");
				break;
			case "frDepartment":
				masterDTO.idCountry = nd.getItemValueString("idCountry");
				break;
			case "frSubCategory":
				masterDTO.idCategory = nd.getItemValueString("idCategory");
				break;
			case "frSupply":
				masterDTO.idCountry = nd.getItemValueString("idCountry");
				masterDTO.negotiators = [];
				break;
		}
		
	} catch(e){
		println("Error en getFieldsMaster: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return masterDTO;
}

function getFieldsSystem(nd) {
	var systemDTO = {};
	try {
		systemDTO = {
			id: nd.getItemValueString("id"),
		    rotationTime: nd.getItemValueDouble("rotationTime"),
		    title: nd.getItemValueString("title"),
		    content: nd.getItemValueString("content"),
		    images: nd.getItemValue("images").size() > 0 ? vectorToArray(nd.getItemValue("images")) : [],
		    document: [],
		    informationProgram: nd.getItemValueString("informationProgram"),
		    dataPolicy: nd.getItemValueString("dataPolicy"),
		    messageByChangeSizeCompany: nd.getItemValueString("messageByChangeSizeCompany"),
		    inputPoll: nd.getItemValueString("inputPoll"),
		    uploadMaxFilesize: nd.getItemValueDouble("uploadMaxFilesize"),
		    uploadPathApplication: nd.getItemValueString("uploadPathApplication"),
		    namesPathApplication: nd.getItemValueString("namesPathApplication"),
		    supplierPathApplication: nd.getItemValueString("supplierPathApplication"),
		    filesPathApplication: nd.getItemValueString("filesPathApplication"),
		    uploadExtensions: nd.getItemValue("uploadExtensions").size() > 0 ? vectorToArray(nd.getItemValue("uploadExtensions")) : [],
		    otherSectorId: nd.getItemValueString("otherSectorId"),
		    packagingMaterialCategoryId: nd.getItemValueString("packagingMaterialCategoryId")
		}
		
	} catch(e){
		println("Error en getFieldsSystem: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return systemDTO;
}

function getFieldsAccess(nd) {
	var accessDTO = {};
	try {
		accessDTO = {
			id: nd.getItemValueString("id"),
		    api: nd.getItemValueString("api"),
		    action: nd.getItemValueString("action")
		}
		
	} catch(e){
		println("Error en getFieldsAccess: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return accessDTO;
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
 * Metodo de la clase Attachment.
 * 
 */
function getFieldsAttachment(ndAttachment) {
	var attachmentDTO = {};
	try {
		attachmentDTO = {
			id: ndAttachment.getItemValueString("id"),
			name: getAttachmentUrl(ndAttachment),
			url: getFileName(ndAttachment)
	    }
	} catch(e){
		println("Error en getFieldsAttachment: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return attachmentDTO;
}

function getDocuments(idsAttachments) {
    var attachments = [];
    if (idsAttachments.length > 0) {
    	for (var i = 0; i < idsAttachments.length; i++){
        	attachment = get(idsAttachments[i], "AttachmentDTO");
            if (null != attachment && attachment.id) {
            	attachments.push(attachment);
            }
    	}	
    }
    
    return attachments;
}
/**
 * Fin de la clase Attachment.
 * 
 */


/**
 * Metodo de la clase Customer and Contact.
 * 
 */
function getFieldsCustomer(ndCustomer) {
	var customerDTO = {};
	try {
		customerDTO = {
			idSupplier: ndCustomer.getItemValueString("idSupplier"),
			percentageOfParticipationInSales: ndCustomer.getItemValueInteger("percentageOfParticipationInSales")
	    }
	} catch(e){
		println("Error en getFieldsCustomer: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return customerDTO;
}

function getFieldsContact(ndContact) {
	var contactDTO = {};
	try {
		contactDTO = {
			idSupplier: ndContact.getItemValueString("idSupplier"),
		    email: ndContact.getItemValueString("email"),
		    phone: ndContact.getItemValueString("phone")
	    }
	} catch(e){
		println("Error en getFieldsContact: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return contactDTO;
}

function getCustomersBySupplier(idSupplier) {
	var customers = [];
    try {
        var currentView:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwCustomersBySupplier");
        var documents:NotesDocumentCollection = currentView.getAllDocumentsByKey(idSupplier, true);
    	if (documents.getCount() > 0) {
    		var ndAux:NotesDocument;
    		var document:NotesDocument = documents.getFirstDocument();
    		var customer = {};
    		while (document != null) {
    			// isObjectEmpty(obj2);
    			customer = getFieldsCustomer(document);
    			if (!isObjectEmpty(customer)) {
    				customers.push(customer);	
    			}
    			
    			ndAux = documents.getNextDocument(document);
    			document.recycle();
    			document = ndAux;
    			customer = {};
    		}
    	}
    } catch (e) {
    	println("Error en getCustomersBySupplier: " + e.message);
		throw new HandlerGenericException(e.message);
    }
    return customers;
}

function getContactsBySupplier(idSupplier) {
    var contacts = [];
    try {
       	var currentView:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwContactsBySupplier");
        var documents:NotesDocumentCollection = currentView.getAllDocumentsByKey(idSupplier, true);
    	var ndAux:NotesDocument;
	    if (documents.getCount() > 0) {
			var document:NotesDocument = documents.getFirstDocument();
			while (document != null) {
				
				contacts.push(getFieldsContact(document));
								    			
				ndAux = documents.getNextDocument(document);
				document.recycle();
				document = ndAux;
			}
		}
    } catch (e) {
    	println("Error en getContactsBySupplier: " + e.message);
		throw new HandlerGenericException(e.message);
    }
    return contacts;
}
/**
 * Fin de la clase Customer and Contact.
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

function getSupplierInSession(idSupplier) {
	var response = {
		supplier: null,
		errorSend: ""
	};
	try {
        response.supplier = getSupplierByFullName(null);

        if (null == response.supplier) {
            if (getIsRol("LIBERATOR") || getIsRol("ADMINISTRATOR") || getIsRol("EVALUATOR")) {
                response.supplier = getSupplierByFullName(idSupplier);
            } else {
            	response.errorSend = "ROL_INVALID";
            }
        }
		
        // println("response = ", response)
        
        if (null != response.supplier) {
            response.supplier["document"] = getDocuments(response.supplier.idDocuments);
            response.supplier["attachedFinancialReport"] = getDocuments(response.supplier.idAttachedFinancialReport);
            response.supplier["companyLogo"] = getDocuments(response.supplier.idCompanyLogo);
            response.supplier["principalCustomer"] = getCustomersBySupplier(response.supplier.id);
            response.supplier["contactNutresaGroup"] = getContactsBySupplier(response.supplier.id);
        }

        return response;
	} catch(e){
		println("Error en getSupplierInSession: " + e.message);
		throw new HandlerGenericException(e.message);
	}
}

function getSupplierByFullName(idSupplier) {
    var supplier = null;
    var fullName = "";
    try {
        if (null != idSupplier) {
            fullName = get(idSupplier, "SupplierDTO").fullName;
        } else {
            fullName = getNameUserInSession();
        }

        var vista:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwSuppliersByFullName");
        var document:NotesDocument = vista.getDocumentByKey(fullName, true);
        if (null != document) {
            supplier = getFieldsSupplier(document);
        }
    } catch(e){
		println("Error en getSupplierByFullName: " + e.message);
		throw new HandlerGenericException(e.message);
	}

    return supplier;
}

function getInformationFromSuppliers(listYears, callsFound) {
	try {
		var response = {
			masters:{
				"Category": [], "Country": [],
				"Department": [], "City": [],
				"Supply": [], "SubCategory": [],
	        	"CompanyType": [], "SocietyType": [], "Sector": []
	        },
			states:[],
			suppliers:[],
			suppliersByCall:[],
			years:[]
		};
		
		var idFieldNames = {
			"Category": 'idCategory', "Country": 'idCountry',
			"Department": 'idDepartment', "City": 'idCity',
			"Supply": 'idSupply', "SubCategory": 'idSubCategory', "CompanyType": 'idCompanyType',
			"SocietyType": 'idSocietyType', "Sector": 'idSector'
		};
		var numCallsFound = callsFound.length;
		var obj = {};
		var vwSuppliers = sessionAsSigner.getCurrentDatabase().getView("vwSuppliers");
		var state = {};
		for (var i=0; i<numCallsFound; i++) {
			if (callsFound[i].idSupplier && callsFound[i].idSupplier != "") {
				ndSupplier = vwSuppliers.getDocumentByKey(callsFound[i].idSupplier, true);
				if (ndSupplier != null) {
					response['suppliers'].push(getFieldsSupplier(ndSupplier));
					response.suppliers[response.suppliers.length - 1].principalCustomer = getCustomersBySupplier(ndSupplier.getItemValueString("id"));
		            response.suppliers[response.suppliers.length - 1].contactNutresaGroup = getContactsBySupplier(ndSupplier.getItemValueString("id"));
					if (callsFound[i].idSupplySpecial) {
						response['suppliers'][response['suppliers'].length - 1].idSupplySpecial = callsFound[i].idSupplySpecial;
						response['suppliers'][response['suppliers'].length - 1].id = ndSupplier.getItemValueString("id") + "_" + callsFound[i].id;
						response['suppliers'][response['suppliers'].length - 1].supply = callsFound[i].supply;
						response['suppliers'][response['suppliers'].length - 1].isEspecial = true;
					}
					if (callsFound[i].idState != "" && !obj.hasOwnProperty(callsFound[i].idState)) {
						obj[callsFound[i].idState] = '';
						state = get(callsFound[i].idState,"StateDTO");
						if (!isObjectEmpty(state)) {
							response['states'].push(get(callsFound[i].idState,"StateDTO"));	
						}
					}
					
					for (var prop in idFieldNames) {
						if (ndSupplier.getItemValueString(idFieldNames[prop]) != "" && !obj.hasOwnProperty(ndSupplier.getItemValueString(idFieldNames[prop]))) {
							obj[ndSupplier.getItemValueString(idFieldNames[prop])] = '';
							response['masters'][prop].push(get(ndSupplier.getItemValueString(idFieldNames[prop]), "", prop));
						}	
					}
				}
				state = {};
			}
		}
		
		response['masters'].CompanySize = getAll("vwCompanySizes");
		response.suppliersByCall = callsFound;
		response.years = listYears;
		
	} catch (e) {
		println("Error en getInformationFromSuppliers: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	
	return response;
}

function getInformationByYearInView(year, viewName) {
	var response = null;
	try {
		var listYears = vectorToArray(getFieldAll(0, "vwCallsByYear"));
        if (null == year || year == "") {
            year = listYears[0];
        }
		
		var callsByYear = getAllBy(getIdCallByYear(year), viewName, "SupplierByCallDTO");
		response = getInformationFromSuppliers(listYears, callsByYear);
		
	} catch (e) {
		println("Error en getInformationByYearInView: " + e.message);
		throw new HandlerGenericException(e.message);
	}

	return response;
}

function getSummaryWithSurvey(year) {
    var viewName = "vwSuppliersByCallIdCall";
    return getInformationByYearInView(year, viewName);
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
	    	idSurvey: ndSupplierByCall.getItemValueString("idSurvey"),
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
	    	whoEvaluateOfTechnicalTeam: ndSupplierByCall.getItemValueString("whoEvaluateOfTechnicalTeam"),
	    	idsDimension: ndSupplierByCall.getItemValue("idsDimension").size() > 0 ? vectorToArray(ndSupplierByCall.getItemValue("idsDimension")) : [],
	    	percentsDimension: ndSupplierByCall.getItemValue("percentsDimension").size() > 0 ? vectorToArray(ndSupplierByCall.getItemValue("percentsDimension")) : []
	    }
	} catch(e){
		println("Error en getFieldSupplierByCall: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return supplierByCallDTO;
}

function getFieldsSupplierByCallSpecial(ndSupplierByCallSpecial) {
	var supplierByCallDTOSpecial = {};
	try {
		supplierByCallDTOSpecial = {
	    	id: ndSupplierByCallSpecial.getItemValueString("id"),
	   	  	idCall: ndSupplierByCallSpecial.getItemValueString("idCall"),
	    	idSurvey: ndSupplierByCallSpecial.getItemValueString("idCall"),
	    	idSupplier: ndSupplierByCallSpecial.getItemValueString("idSupplier"),
        	idSupplySpecial: ndSupplierByCallSpecial.getItemValueString("idSupplySpecial"),
       		supply: ndSupplierByCallSpecial.getItemValueString("supply"),
	    	participateInCall: ndSupplierByCallSpecial.getItemValueString("participateInCall"),
	    	acceptedPolicy: ndSupplierByCallSpecial.getItemValueString("acceptedPolicy") == "1" ? true : false,
	    	reasonForNotParticipation: ndSupplierByCallSpecial.getItemValueString("reasonForNotParticipation"),
	    	nameWhoSayDontParticipate: ndSupplierByCallSpecial.getItemValueString("nameWhoSayDontParticipate"),
	    	emailWhoSayDontParticipate: ndSupplierByCallSpecial.getItemValueString("emailWhoSayDontParticipate"),
	    	lockedByModification: ndSupplierByCallSpecial.getItemValueString("lockedByModification") == "1" ? true : false,
	    	dateLocked: getValueDate(ndSupplierByCallSpecial, "dateLocked", "yyyy/MM/dd"),
	    	dateUnLocked: getValueDate(ndSupplierByCallSpecial, "dateUnLocked", "yyyy/MM/dd"),
	    	oldIdCompanySize: ndSupplierByCallSpecial.getItemValueString("oldIdCompanySize"),
	    	idState: ndSupplierByCallSpecial.getItemValueString("idState"),
	    	invitedToCall: ndSupplierByCallSpecial.getItemValueString("invitedToCall") == "1" ? true : false,
	    	dateAssignedToEvaluator: getValueDate(ndSupplierByCallSpecial, "dateAssignedToEvaluator", "yyyy/MM/dd"),
	    	whoEvaluate: ndSupplierByCallSpecial.getItemValueString("whoEvaluate"),
	    	whoEvaluateOfTechnicalTeam: ndSupplierByCallSpecial.getItemValueString("whoEvaluateOfTechnicalTeam"),
	    	idsDimension: ndSupplierByCallSpecial.getItemValue("idsDimension").size() > 0 ? vectorToArray(ndSupplierByCallSpecial.getItemValue("idsDimension")) : [],
	    	percentsDimension: ndSupplierByCallSpecial.getItemValue("percentsDimension").size() > 0 ? vectorToArray(ndSupplierByCallSpecial.getItemValue("percentsDimension")) : []
	    }
	} catch(e){
		println("Error en getFieldsSupplierByCallSpecial: " + e.message);
		throw new HandlerGenericException(e.message);
	}
	return supplierByCallDTOSpecial;
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

function getByStateInCall(idState, idCall) {
	var result = [];
	
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

    return result;
}

function getFinishedByStage(stageState) {
	var response = {
		evaluated: [],
		errorSend: ""
	};
	try {
		var listYears = vectorToArray(getFieldAll(0, "vwCallsByYear"));
        var year = year = listYears[0];
        var stateId = getStateByShortName(stageState).id;
        response.evaluated = getByStateInCall(stateId, getIdCallByYear(year));
        
        if (response.evaluated.length == 0) {
        	response.errorSend = "INFORMATION_NOT_FOUND";
        }
        return response;
	} catch(e){
		println("Error en getFinishedByStage: " + e.message);
		throw new HandlerGenericException(e.message);
	}
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

function getAllSuppliersInCall(key) {
	var response = {
		masters:{"CompanySize":[], "Country":[], "Supply":[]},
		suppliers:[],
		suppliersByCall:[]
	};
	try {
		var vwVista = sessionAsSigner.getCurrentDatabase().getView("vwSuppliersByCallIdCall");
		var vwSuppliers = sessionAsSigner.getCurrentDatabase().getView("vwSuppliers");
		if (vwVista != null) {
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

function getAll(currentView, classDto) {
	var response = [];
    try {
	  	var vista = sessionAsSigner.getCurrentDatabase().getView(currentView);
      	var vec:NotesViewEntryCollection = vista.getAllEntries();
	  	var ve:NotesViewEntry;
	  	var veAux:NotesViewEntry;
	  	var nd:NotesDocument;
		if (vec.getCount() > 0) {
			var fields = {};
			ve = vec.getFirstEntry();
			while (ve != null) {
				nd = ve.getDocument();
				
				fields = resolveDTO(classDto, nd);
				if (classDto == "CallDTO") {
					response.push(fields.fields);
				} else {
					response.push(fields);	
				}
				
				veAux = vec.getNextEntry(ve); 
				ve.recycle();
				ve = veAux;
			}
		}

    } catch (e) {
    	println("Error en getAll = " + e.message);
		throw new HandlerGenericException();
    }

    return response;
}

function getAllBy(key, vista, classDto) {
	var response = [];
	try {
		var vwVista = sessionAsSigner.getCurrentDatabase().getView(vista);
		if (vwVista != null) {
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
					fields = resolveDTO(classDto, nd);
					
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

function getFieldAll(column, defaultView) {
	var list:java.util.vector;
    var vista:NotesView = sessionAsSigner.getCurrentDatabase().getView(defaultView);
    if (null != vista) {
        list = vista.getColumnValues(column);
    }
    return list;
}

function get(id, classDto, keyAdd) {
	var fields = {};
	try {
		var vwIds = sessionAsSigner.getCurrentDatabase().getView("vwProgIds");
		var nd:NotesDocument = vwIds.getDocumentByKey(id, true);
		if (nd != null) {
			fields = resolveDTO(classDto, nd);
		}
	} catch(e){
		println("Error en get: " + e.message);
	}
	return fields;
}

function getBy(key, vista, classDto) {
	var response = null;
	try {
		var vwVista = sessionAsSigner.getCurrentDatabase().getView(vista);
		if (vwVista != null) {
			var nd:NotesDocument = vwVista.getDocumentByKey(key, true);
			if (nd) {
				var fields = resolveDTO(classDto, nd);
			}
		} else {
			println("Error en getBy, vista = [" + vista + "] no definida.");
			throw new HandlerGenericException();
		}
	} catch(e){
		println("Error en getBy: " + e.message);
	}
	return response;
}

function resolveDTO(classDto, nd) {
	var fields = {};
	
	switch (classDto){
		case "AccessDTO":
			fields = getFieldsAccess(nd);
			break;
		case "AnswerDTO":
			fields = getFieldsAnswer(nd);
			break;
		case "AttachmentDTO":
			fields = getFieldsAttachment(nd);
			break;
		case "CallDTO":
			fields = getFieldsCall(nd);
			break;
		case "CriterionDTO":
			fields = getFieldsCriterion(nd);
			break;
		case "CriterionPercentDTO":
			fields = getFieldsCriterionPercent(nd);
			break;
		case "DimensionDTO":
			fields = getFieldsDimension(nd);
			break;
		case "EvaluationScaleDTO":
			fields = getFieldsEvaluationScale(nd);
			break;
		case "ItemDTO":
			fields = getFieldsItem(nd);
			break;
		case "ManagerTeamAnswerDTO":
			fields = getFieldsManagerTeamAnswer(nd);
			break;
		case "ManagerTeamDTO":
			fields = getFieldsManagerTeam(nd);
			break;
		case "OptionDTO":
			fields = getFieldsOption(nd);
			break;
		case "QuestionDTO":
			fields = getFieldsQuestion(nd);
			break;
		case "RolDTO":
			fields = getFieldsRol(nd);
			break;
		case "ServiceDTO":
			fields = getFieldsService(nd);
			break;
		case "StateDTO":
			fields = getFieldState(nd);
			break;
		case "SupplyDTO":
		case "SupplySpecialDTO":
			fields = getFieldsSupply(nd);
			break;
		case "SupplierDTO":
			fields = getFieldsSupplier(nd);
			break;
		case "SupplierByCallDTO":
			fields = getFieldsSupplierByCall(nd);
			break;
		case "SystemDTO":
			fields = getFieldsSystem(nd);
			break;
		case "TechnicalTeamCommentDTO":
			fields = getFieldsTechnicalTeamComment(nd);
			break;
		case "TechnicalTeamAnswerDTO":
			fields = getFieldsTechnicalTeamAnswer(nd);
			break;
		case "UserDTO":
			fields = getFieldsUser(nd);
			break;
		default:
			fields = getFieldsMaster(nd);
			break;
	}
	
	return fields;
}
