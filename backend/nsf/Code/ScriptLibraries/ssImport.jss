import ssCommon;

function importData() {	
	var type = param.get("type");
	var data = fromJson(param.get("data"));
	var error = "";
	var response = {error: "", rows: []};
	var result = {error: "", response: response, count: 0};
	
	var columnKeys;
	var columnNameKeys;
	var columnNames;
	var requiredFields = [];
	var defaultFields;
	var foreignKeys = [];
	var viewName;
	var translationData = {}
	
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"});
		
		switch(type){
			case "DIM":
				columnKeys = ["code"];
				columnNameKeys = ["Código dimensión"];
				columnNames = [{commonName: "Dimensión", technicalName: "name"},
				               {commonName: "Dimension", technicalName: "tr_name"},
				               {commonName: "Código dimensión", technicalName: "code"}];
				defaultFields = [{ key: "form", value: "frDimension"}];
				viewName = "vwDimensions";
				translationData = {
					fields: ["name"],
					entity: "Dimension"
				}  
				break;
			case "CRI":
				columnKeys = ["idDimension", "code"];
				columnNameKeys = ["Código dimensión", "Código criterio"];
				columnNames = [{commonName: "Código dimensión", technicalName: "idDimension"},
				               {commonName: "Código criterio", technicalName: "code"},
				               {commonName: "Criterio", technicalName: "name"},
				               {commonName: "Criterion", technicalName: "tr_name"}];
				defaultFields = [{ key: "form", value: "frCriterion"}];
				foreignKeys = [{technicalNames: ["idDimension"], commonNames: ["Código dimensión"], viewNames: ["ImportDimensionsByCode"]}];
				viewName = "vwCriterions";
				translationData = {
					fields: ["name"],
					entity: "Criterion"
				}  
				break;
			case "QUE":
				columnKeys = ["code"];
				columnNameKeys = ["Código"];
				columnNames = [{commonName: "Código dimensión", technicalName: "idDimension"},
				               {commonName: "Código criterio", technicalName: "idCriterion"},
				               {commonName: "Código pregunta", technicalName: "codeQuestion"},
				               {commonName: "Código", technicalName: "code"},
				               {commonName: "Pregunta", technicalName: "wording"},
				               {commonName: "Requiere soporte", technicalName: "requireAttachment"},
				               {commonName: "Tipo de respuesta", technicalName: "type"},
				               {commonName: "Question", technicalName: "tr_wording"}];
				defaultFields = [{ key: "form", value: "frQuestion"}];
				foreignKeys = [{technicalNames: ["idDimension", "idCriterion"], commonNames: ["Código dimensión", "Código criterio"], viewNames: ["ImportDimensionsByCode", "ImportCriterionsByCode"]}];
				viewName = "vwQuestions";
				translationData = {
					fields: ["wording"],
					entity: "Question"
				}  
				break;
			case "OPC":
				columnKeys = ["code"];
				columnNameKeys = ["Código"];
				columnNames = [{commonName: "Código pregunta", technicalName: "idQuestion"},
				               {commonName: "Código", technicalName: "code"},
				               {commonName: "Respuesta", technicalName: "wording"},
				               {commonName: "Response", technicalName: "tr_wording"},
				               {commonName: "Valor respuesta", technicalName: "score"}];
				defaultFields = [{ key: "form", value: "frOption"}];
				foreignKeys = [{technicalNames: ["idQuestion"], commonNames: ["Código pregunta"], viewNames: ["ImportQuestionsByCode"]}];
				viewName = "vwOptions";
				translationData = {
					fields: ["wording"],
					entity: "Option"
				}  
				break;
			case "SEC":
				columnKeys = ["name", "tr_name"];
				columnNameKeys = ["Sector", "Sector to which the company belongs"];
				columnNames = [{commonName: "Sector", technicalName: "name"},
				               {commonName: "Sector to which the company belongs", technicalName: "tr_name"}];
				defaultFields = [{ key: "form", value: "frSector"}];
				viewName = "vwSectors";
				translationData = {
					fields: ["name"],
					entity: "Sector"
				}
				break;
			case "COS":
				columnKeys = ["name", "tr_name"];
				columnNameKeys = ["Tamaño de empresa", "Company Size"];
				columnNames = [{commonName: "Tamaño de empresa", technicalName: "name"},
				               {commonName: "Company Size", technicalName: "tr_name"}];
				defaultFields = [{ key: "form", value: "frCompanySize"}];
				viewName = "vwCompanySizes";
				translationData = {
					fields: ["name"],
					entity: "CompanySize"
				} 
				break;
			case "COT":
				columnKeys = ["name", "tr_name"];
				columnNameKeys = ["Tipo de compañía", "Type of Company"];
				columnNames = [{commonName: "Tipo de compañía", technicalName: "name"},
				               {commonName: "Type of Company", technicalName: "tr_name"}];
				defaultFields = [{ key: "form", value: "frCompanyType"}];
				viewName = "vwCompanyTypes";
				translationData = {
					fields: ["name"],
					entity: "CompanyType"
				} 
				break;
			case "SOT":
				columnKeys = ["name", "tr_name"];
				columnNameKeys = ["Tipos de sociedades", "Type of Company"];
				columnNames = [{commonName: "Tipos de sociedades", technicalName: "name"},
				               {commonName: "Type of Company", technicalName: "tr_name"}];
				defaultFields = [{ key: "form", value: "frSocietyType"}];
				viewName = "vwSocietyTypes";
				translationData = {
					fields: ["name"],
					entity: "SocietyType"
				}
				break;
			case "SUT":
				columnKeys = ["name", "tr_name"];
				columnNameKeys = ["Tipos de suministro", "Category Type"];
				columnNames = [{commonName: "Tipos de suministro", technicalName: "name"},
				               {commonName: "Category Type", technicalName: "tr_name"}];
				defaultFields = [{ key: "form", value: "frSupply"}];
				viewName = "vwSupplies";
				translationData = {
					fields: ["name"],
					entity: "Supply"
				}
				break;
			case "CAT":
				columnKeys = ["idSupply", "name", "tr_name"];
				columnNameKeys = ["Tipos de suministro", "Categoría", "Type of Category"];
				columnNames = [{commonName: "Tipos de suministro", technicalName: "idSupply"},
				               {commonName: "Categoría", technicalName: "name"},
				               {commonName: "Type of Category", technicalName: "tr_name"}];
				defaultFields = [{ key: "form", value: "frCategory"}];
				foreignKeys = [{technicalNames: ["idSupply"], commonNames: ["Tipo de suministro"], viewNames: ["ImportSuppliesByName"]}];
				viewName = "vwCategories";
				translationData = {
					fields: ["name"],
					entity: "Category"
				}
				break;
			case "SUB":
				columnKeys = ["idCategory", "name", "tr_name"];
				columnNameKeys = ["Categoría", "Subcategoría", "Type of Subcategory"];
				columnNames = [{commonName: "Categoría", technicalName: "idCategory"},
				               {commonName: "Subcategoría", technicalName: "name"},
				               {commonName: "Type of Subcategory", technicalName: "tr_name"}];
				defaultFields = [{ key: "form", value: "frSubCategory"}];
				foreignKeys = [{technicalNames: ["idCategory"], commonNames: ["Categoría"], viewNames: ["ImportCategoriesByName"]}];
				viewName = "vwSubCategories";
				translationData = {
					fields: ["name"],
					entity: "SubCategory"
				}
				break;
			case "COU":
				columnKeys = ["code", "name"];
				columnNameKeys = ["PAIS", "NOMBRE PAIS"];
				columnNames = [{commonName: "PAIS", technicalName: "code"},
				               {commonName: "NOMBRE PAIS", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frCountry"}];
				viewName = "vwCountries";
				break;
			case "DEP":
				columnKeys = ["idCountry", "code", "name"];
				columnNameKeys = ["PAIS", "REGION", "NOMBRE REGION"];
				columnNames = [{commonName: "PAIS", technicalName: "idCountry"},
				               {commonName: "REGION", technicalName: "code"},
				               {commonName: "NOMBRE REGION", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frDepartment"}];
				foreignKeys = [{technicalNames: ["idCountry"], commonNames: ["Pais"], viewNames: ["ImportCountriesByCode"]}];
				viewName = "vwDepartments";
				break;
			case "CIT":
				columnKeys = ["idCountry", "idDepartment", "code", "name"];
				columnNameKeys = ["PAIS", "REGION", "POBLACION", "NOMBRE POBLACION"];
				columnNames = [{commonName: "PAIS", technicalName: "idCountry"},
				               {commonName: "REGION", technicalName: "idDepartment"},
				               {commonName: "POBLACION", technicalName: "code"},
				               {commonName: "NOMBRE POBLACION", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frCity"}];
				foreignKeys = [{technicalNames: ["idCountry", "idDepartment"], commonNames: ["Pais", "Departamento"], viewNames: ["ImportCountriesByCode", "ImportDepartmentsByCode"]}];
				viewName = "vwCities";
				break;
			case "SUR":
				columnKeys = ["idSupply", "idCompanySize"];
				columnNameKeys = ["Tipo de suministro", "Tamaño"];
				columnNames = [{commonName: "Tipo de suministro", technicalName: "idSupply"},
				               {commonName: "Tamaño", technicalName: "idCompanySize"}];
				defaultFields = [{ key: "form", value: "frSurvey"}];
				foreignKeys = [{technicalNames: ["idSupply"], commonNames: ["Tipo de suministro"], viewNames: ["ImportSuppliesByName"]},
				               {technicalNames: ["idCompanySize"], commonNames: ["Tamaño"], viewNames: ["ImportCompanySizesByName"]}];
				viewName = "vwSurveys";
				break;
			case "QBS":
				columnKeys = ["idSupply", "idCompanySize", "idQuestion"];
				columnNameKeys = ["Tipo de suministro", "Tamaño", "Pregunta"];
				columnNames = [{commonName: "Tipo de suministro", technicalName: "idSupply"},
				               {commonName: "Tamaño", technicalName: "idCompanySize"},
				               {commonName: "Pregunta", technicalName: "idQuestion"}];
				defaultFields = [{ key: "form", value: "frQuestionBySurvey"}];
				foreignKeys = [{technicalNames: ["idSupply"], commonNames: ["Tipo de suministro"], viewNames: ["ImportSuppliesByName"]},
				               {technicalNames: ["idCompanySize"], commonNames: ["Tamaño"], viewNames: ["ImportCompanySizesByName"]},
				               {technicalNames: ["idQuestion"], commonNames: ["Pregunta"], viewNames: ["ImportQuestionsByCode"]}];
				viewName = "";
				break;
			case "NOT":
				columnKeys = ["alias"];
				columnNameKeys = ["Nombre"];
				columnNames = [{commonName: "Nombre", technicalName: "alias"},
				               {commonName: "Asunto", technicalName: "subject"},
				               {commonName: "Mensaje", technicalName: "message"}];
				defaultFields = [{ key: "form", value: "frNotification"}];
				viewName = "vwNotifications";
				break;
			case "ROL":
				columnKeys = ["name"];
				columnNameKeys = ["Nombre"];
				columnNames = [{commonName: "Nombre", technicalName: "name"},
				               {commonName: "Alias", technicalName: "shortName"}];
				defaultFields = [{ key: "form", value: "frRol"}];
				viewName = "vwRols";
				break;
			case "USE":
				columnKeys = ["name"];
				columnNameKeys = ["Nombre"];
				columnNames = [{commonName: "Nombre", technicalName: "name"},
				               {commonName: "Email", technicalName: "email"},
				               {commonName: "Roles", technicalName: "idRols"}];
				defaultFields = [{ key: "form", value: "frUser"}];
				foreignKeys = [{technicalNames: ["idRols"], commonNames: ["Rol"], viewNames: ["ImportRolByName"]}];
				viewName = "vwUsers";
				break;
			case "CAL":
				columnKeys = ["year"];
				columnNameKeys = ["Año"];
				columnNames = [{commonName: "Año", technicalName: "year"},
				               {commonName: "Fecha cierre de convocatoria", technicalName: "dateToFinishCall"},
				               {commonName: "Fecha límite para hacer la encuesta", technicalName: "deadlineToMakeSurvey"}];
				defaultFields = [{ key: "form", value: "frCall"}];
				viewName = "vwCalls";
				break;
			case "SUP":
				columnKeys = [];
				columnNameKeys = [];
				columnNames = [{commonName: "Código SAP", technicalName: "sapCode"},
				               {commonName: "Correo electrónico", technicalName: "emails"},
				               {commonName: "Nombre", technicalName: "businessName"},
				               {commonName: "NIT", technicalName: "nit"},
				               {commonName: "País", technicalName: "idCountry"},
				               {commonName: "Tipo de suministro", technicalName: "idSupply"},
				               {commonName: "Tamaño", technicalName: "idCompanySize"},
				               {commonName: "Categoría", technicalName: "idCategory"}];
				defaultFields = [{ key: "form", value: "frSupplier"}];
				foreignKeys = [{technicalNames: ["idSupply"], commonNames: ["Tipo de suministro"], viewNames: ["ImportSuppliesByName"]},
				               {technicalNames: ["idCompanySize"], commonNames: ["Tamaño"], viewNames: ["ImportCompanySizesByName"]},
				               {technicalNames: ["idCountry"], commonNames: ["País"], viewNames: ["ImportCountriesByName"]},
				               {technicalNames: ["idCategory"], commonNames: ["Categoría"], viewNames: ["ImportCategoriesByName"]}];
				viewName = "vwSuppliers";
				break;
			case "SBC":
				columnKeys = ["idCall", "idSupplier"];
				columnNameKeys = ["Convocatoria", "Código SAP"];
				columnNames = [{commonName: "Convocatoria", technicalName: "idCall"},
				               {commonName: "Código SAP", technicalName: "idSupplier"},
				               {commonName: "Tipo de suministro", technicalName: "idSupply"},
				               {commonName: "Tamaño", technicalName: "idCompanySize"}];
				defaultFields = [{ key: "form", value: "frSupplierByCall"}];
				foreignKeys = [{technicalNames: ["idCall"], commonNames: ["Convocatoria"], viewNames: ["ImportCallsByYear"]},
				               {technicalNames: ["idSupplier"], commonNames: ["Código SAP"], viewNames: ["ImportSuppliersBySapCode"]},
				               {technicalNames: ["idSupply"], commonNames: ["Tipo de suministro"], viewNames: ["ImportSuppliesByName"]},
				               {technicalNames: ["idCompanySize"], commonNames: ["Tamaño"], viewNames: ["ImportCompanySizesByName"]}];
				viewName = "vwSuppliersByCall";
				break;
			case "ACC":
				columnKeys = ["api", "action"];
				columnNameKeys = ["API", "ACTION"];
				columnNames = [{commonName: "API", technicalName: "api"},
				               {commonName: "ACTION", technicalName: "action"}];
				defaultFields = [{ key: "form", value: "frAccess"}];
				viewName = "vwAccess";
				break;
			case "ABR":
				columnKeys = ["idRol", "api", "action"];
				columnNameKeys = ["ROL", "API", "ACTION"];
				columnNames = [{commonName: "ROL", technicalName: "idRol"},
				               {commonName: "API", technicalName: "api"},
				               {commonName: "ACTION", technicalName: "action"}];
				defaultFields = [{ key: "form", value: "frAccessByRol"}];
				foreignKeys = [{technicalNames: ["idRol"], commonNames: ["ROL"], viewNames: ["ImportRolByShortName"]}];
				viewName = "vwAccessByRols";
				break;
				
			case "MEN":
				columnKeys = ["name", "title", "type", "idsRol", "tr_title"];
				columnNameKeys = ["NOMBRE", "TITULO", "TIPO", "IDSROL", "TITLE"];
				columnNames = [{commonName: "NOMBRE", technicalName: "name"},
				               {commonName: "TITULO", technicalName: "title"},
				               {commonName: "TIPO", technicalName: "type"},
				               {commonName: "IDSROL", technicalName: "idsRol"},
				               {commonName: "TITLE", technicalName: "tr_title"}];
				defaultFields = [{ key: "form", value: "frMenu"}];
				viewName = "vwMenus";
				translationData = {
					fields: ["title"],
					entity: "Menu"
				}
				break;
			case "DIC":
				columnKeys = ["component", "name", "label", "tr_label"];
				columnNameKeys = ["Componente", "Nombre", "Etiqueta", "Traducción"];
				columnNames = [{commonName: "Componente", technicalName: "component"},
				               {commonName: "Nombre", technicalName: "name"},
				               {commonName: "Etiqueta", technicalName: "label"},
				               {commonName: "Traducción", technicalName: "tr_label"}];
				defaultFields = [{ key: "form", value: "frDictionary"}];
				viewName = "vwDictionaries";
				translationData = {
					fields: ["label"],
					entity: "Dictionary"
				}
				break;
		}
		result = importGeneric(data, response, viewName, columnNames, columnKeys, columnNameKeys, requiredFields, defaultFields, foreignKeys, translationData)
		
	}catch(e){
		result.error = e.message;
	}finally {		
		writer.write(toJson(result));
		footerResponse(writer)
	}	
}

function importGeneric(data, response, viewName, columnNames, columnKeys, columnNameKeys, requiredFields, defaultFields, foreignKeys, translationData) {
	var error = "";
	var count = 0;	
	
	try{
		var emptyFields;
		var unavailableForeignNames;
		var savedIds = [];
		var modifiedIds = [];
		var primaryKeyViolated;
		var i;
		var j;
		var k;
		
		if (viewName){
			var vw:NotesView = sessionAsSigner.getCurrentDatabase().getView(viewName);
			vw.getAllEntries().removeAll(true);
		}
		deleteTranslations(translationData);
		
		var nd:NotesDocument;
		var vwForeign:NotesView;
		var ndForeign:NotesDocument;
		
		var _data = data;
		
		var fila;
		var _fila;
		var repeatedRows = 0;
		var incompleteRows = 0;
		var foreignKey;
		var unavailableForeignKeys = 0;
		var keys;
		var surveys;
		var emails;
		
		for (i in data) {
			for (j in columnNames){
				data[i][columnNames[j].technicalName] = data[i][columnNames[j].commonName];
				delete data[i][columnNames[j].commonName];
				if (data[i].hasOwnProperty(columnNames[j].technicalName) && data[i][columnNames[j].technicalName]){
					data[i][columnNames[j].technicalName] = data[i][columnNames[j].technicalName].trim()
				}else{
					data[i][columnNames[j].technicalName] = "";
				}
			}
		}
		
		for(i in data){
			fila = data[i];
			
			emptyFields = [];	
			for(j in requiredFields){				
				if (!fila.hasOwnProperty(requiredFields[j].technicalName)){
					emptyFields.push(requiredFields[j].commonName);					
				}
			}
			if(emptyFields.length > 0){
				incompleteRows ++
				response.rows.push({pos: i + 1, error: "Debe ingresar información en la(s) columna(s): " + emptyFields.join(", ")});
			}		
						
			if (columnKeys.length > 0){
				for(j in _data){
					if(i != j){
						_fila = _data[j];
						primaryKeyViolated = true;
						for (k in columnKeys){
							if(fila[columnKeys[k]] !== _fila[columnKeys[k]]){
								primaryKeyViolated = false;
							}	
						}
						if (primaryKeyViolated){
							repeatedRows ++;
							response.rows.push({pos: i + 1, error: "Clave primaria repetida. Verificar la(s) columna(s) " + columnNameKeys.join(", ")})
						}
					}
				}
			}
			
			unavailableForeignNames = [];
			for (var j in foreignKeys){
				keys = ""
				foreignKey = foreignKeys[j];
 				if (foreignKey.technicalNames.length > 1){
 					for (k = 0; k < foreignKey.technicalNames.length - 1; k++){
 						vwForeign = sessionAsSigner.getCurrentDatabase().getView(foreignKey.viewNames[k]);
 						ndForeign = vwForeign.getDocumentByKey(fila[foreignKey.technicalNames[k]], true);
 						if (ndForeign){
 							fila[foreignKey.technicalNames[k]] = ndForeign.getItemValueString("id");
 							keys += ndForeign.getItemValueString("id");
 							ndForeign.recycle();
 						}
 						vwForeign.recycle();
 					}
 				}
 				keys += fila[foreignKey.technicalNames[foreignKey.technicalNames.length - 1]];
 				if (keys !== ""){
	 				vwForeign = sessionAsSigner.getCurrentDatabase().getView(foreignKey.viewNames[foreignKey.viewNames.length - 1]);
	 				ndForeign = vwForeign.getDocumentByKey(keys, true);
	 				if (!ndForeign){
	 					for (k in foreignKey.commonNames){
	 	 					unavailableForeignNames.push(foreignKey.commonNames[k]);
	 					}
	 				}else{
	 					fila[foreignKey.technicalNames[foreignKey.technicalNames.length - 1]] = ndForeign.getItemValueString("id");
	 					ndForeign.recycle();	
	 				}
	 				vwForeign.recycle();
 				}
     		}
			if(unavailableForeignNames.length > 0){
				unavailableForeignKeys ++;
				response.rows.push({pos: i + 1, error: "Clave foránea inexistente. Verificar la(s) columna(s) " + unavailableForeignNames.join(", ")})
			}	
		
		}
		
		if(incompleteRows > 0){
			error = "Campos requeridos sin diligenciar";
		}else if (repeatedRows){
			error = "Violación de clave primaria";
		}else if (unavailableForeignKeys > 0){
			error = "Violación de clave foránea";
		}else{
			var vwSurveys:NotesView = sessionAsSigner.getCurrentDatabase().getView("ImportSurveysBySupplyAndCompanySize");
			var vwQuestions:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwQuestions");
			var vwSuppliers:NotesView = sessionAsSigner.getCurrentDatabase().getView("ImportSuppliersBySapCode");
			var vwAccess:Notesview = sessionAsSigner.getCurrentDatabase().getView("ImportAccessByApiAndAction");
			var vwRols:Notesview = sessionAsSigner.getCurrentDatabase().getView("ImportRolByShortName");
			vwSuppliers.setAutoUpdate(true);
			var fullName:NotesName;	
			var aDate;
			var abort;
		
			for (i = 0; i < data.length && !error; i++){
				fila = data[i];
				
				abort = false
				
				if (defaultFields[0].value === "frSupplier"){
					ndForeign = vwSuppliers.getDocumentByKey(fila["sapCode"], true);
					if (ndForeign) {
						emails = vectorToArray(ndForeign.getItemValue("emails"));
						emails.push(fila["emails"]);
						ndForeign.replaceItemValue("emails", emails)
						ndForeign.save(true, false);
						ndForeign.recycle();
						abort = true;
					}
				}
				
				if (!abort){
					nd = sessionAsSigner.getCurrentDatabase().createDocument();
					
					for (j in defaultFields){
						nd.replaceItemValue(defaultFields[j].key, defaultFields[j].value);
					}
					
					for (j in fila){
						if (fila.hasOwnProperty(j)){
							println(j);
							println(fila[j]);
							nd.replaceItemValue(j, fila[j]);
						}
					}
					
					nd.replaceItemValue("id", nd.getUniversalID());
					if (nd.getItemValueString("form") == "frQuestionBySurvey" || nd.getItemValueString("form") == "frSupplierByCall"){
						if (nd.getItemValueString("idSupply") !== "" && nd.getItemValueString("idCompanySize") !== ""){
			 				ndForeign = vwSurveys.getDocumentByKey(nd.getItemValueString("idSupply")+nd.getItemValueString("idCompanySize"), true);
							if (ndForeign){
			 					nd.replaceItemValue("idSurvey", ndForeign.getItemValueString("id"));
			 					nd.removeItem("idSupply");
			 					nd.removeItem("idCompanySize");
			 					ndForeign.recycle();
				 			}else{
			 					error = "Violación de clave foránea";
			 					response.rows.push({pos: i + 1, error: "Clave foránea inexistente. No se encontró una encuesta que coincida con Tipo de suministro y Tamaño"})
			 				}
						}else{
							nd.replaceItemValue("idSurvey", "");
							nd.removeItem("idSupply");
		 					nd.removeItem("idCompanySize");
		 				}
						if(nd.getItemValueString("form") == "frSupplierByCall"){
							nd.replaceItemValue("participateInCall", "");
						}
					}else if(nd.getItemValueString("form") == "frCity"){
						nd.removeItem("idCountry");
					}else if(nd.getItemValueString("form") == "frQuestion"){
						nd.replaceItemValue("required", "0");
					}else if(nd.getItemValueString("form") == "frCall"){
						nd.replaceItemValue("year", parseInt(nd.getItemValueString("year"), 10))
						aDate = nd.getItemValueString("dateToFinishCall").split("/");
						nd.replaceItemValue("dateToFinishCall", new Date(parseInt(aDate[2], 10), parseInt(aDate[1], 10) - 1, parseInt(aDate[0], 10)));
						aDate = nd.getItemValueString("deadlineToMakeSurvey").split("/");
						nd.replaceItemValue("deadlineToMakeSurvey", new Date(parseInt(aDate[2], 10), parseInt(aDate[1], 10) - 1, parseInt(aDate[0], 10)));
					}else if(nd.getItemValueString("form") == "frSupplier"){
						fullName = session.createName(nd.getItemValueString("businessName"));
						nd.replaceItemValue("fullName", fullName.getCommon());
						if (nd.getItemValueString("emails") === ""){
							nd.replaceItemValue("emails", "no@no.com")
						}
					}else if(nd.getItemValueString("form") == "frOption"){
						nd.replaceItemValue("score", parseInt(nd.getItemValueString("score"), 10))
					}else if(nd.getItemValueString("form") == "frAccessByRol"){
						ndForeign = vwAccess.getDocumentByKey(nd.getItemValueString("api")+nd.getItemValueString("action"), true);
						if (ndForeign){
		 					nd.replaceItemValue("idAccess", ndForeign.getItemValueString("id"));
		 					nd.removeItem("api");
		 					nd.removeItem("action");
		 					ndForeign.recycle();
			 			}else{
		 					error = "Violación de clave foránea";
		 					response.rows.push({pos: i + 1, error: "Clave foránea inexistente. No se encontró un documento de acceso que coincida con API y ACTION"})
		 				}
					}else if(nd.getItemValueString("form") == "frMenu"){
						idsRol = nd.getItemValueString("idsRol").split(",");
						for (j in idsRol){
							ndForeign = vwRols.getDocumentByKey(idsRol[j], true);
							if(ndForeign){
								idsRol[j] = ndForeign.getItemValueString("id");
								ndForeign.recycle();
							}else{
			 					error = "Violación de clave foránea";
			 					response.rows.push({pos: i + 1, error: "Clave foránea inexistente. No se encontró el rol " + idsRol[j] + " " + nd.getItemValueString("idsRol")})
			 				}
						}						
						nd.replaceItemValue("idsRol", idsRol);
					}
						
					if (nd.getItemValueString("form") == "frQuestionBySurvey"){
						ndForeign = vwQuestions.getDocumentByKey(nd.getItemValueString("idQuestion"), true);
						surveys = vectorToArray(ndForeign.getItemValue("idSurvey"))
						surveys.push(nd.getItemValueString("idSurvey"))
						ndForeign.replaceItemValue("idSurvey", surveys)
		 				ndForeign.save(true, false);
		 				modifiedIds.push(ndForeign.getItemValueString("id"));
		 				ndForeign.recycle();
			 		}else{
			 			translate(nd, translationData);
			 			nd.save(true, false);						
						savedIds.push(nd.getItemValueString("id"));
						nd.recycle();
					}
				}
			}		
		}
		
				
		if ("" !== error){			
			if(savedIds.length > 0){				
				for(i in savedIds){					
					nd = vw.getDocumentByKey(savedIds[i], true);
					if(nd){
						nd.removePermanently(true);
						nd.recycle();
					}
				}
				deleteTranslations(translationData);
				savedIds = [];
			}
			if(modifiedIds.length > 0){
				for(i in modifiedIds){					
 					ndForeign = vwQuestions.getDocumentByKey(modifiedIds[i], true);
					if(ndForeign){
						ndForeign.removeItem("idSurvey");
						ndForeign.save(true, false);
						ndForeign.recycle();
					}
				}
 				modifiedIds = [];
 			}
		}
		

		if (viewName){
			count = savedIds.length
		}else{
			count = modifiedIds.length
		}
		
		
	}catch(e){
		error = e.message + " fila " + i;
	}
	
	return {
		error: error,
		response: response,
		count: count
	}
}

function deleteTranslations(translationData){
	if (translationData.hasOwnProperty("entity")){
		var vwTranslations:NotesView = sessionAsSigner.getCurrentDatabase().getView("ImportTranslationsByEntity");
		var dcTranslations:NotesDocumentCollection = vwTranslations.getAllDocumentsByKey(translationData.entity, true);
		dcTranslations.removeAll(true);
		dcTranslations.recycle()
	}
}

function translate(nd, translationData){
	var ndTranslation:NotesDocument;
	var name;
	if (translationData.hasOwnProperty("fields")){
		for (var i in translationData.fields){
			name = translationData.fields[i];
			
			ndTranslation = sessionAsSigner.getCurrentDatabase().createDocument();
			
			ndTranslation.replaceItemValue("form", "frTranslation");
			ndTranslation.replaceItemValue("id", ndTranslation.getUniversalID());
			ndTranslation.replaceItemValue("language", "en");
			ndTranslation.replaceItemValue("entity", translationData.entity);
			ndTranslation.replaceItemValue("entityId", nd.getItemValueString("id"));
			ndTranslation.replaceItemValue("name", name);
			ndTranslation.replaceItemValue("value", nd.getItemValueString("tr_" + name));
			nd.removeItem("tr_" + name);
			
			if (ndTranslation.getItemValueString("value") !== ""){
				ndTranslation.save(true, false);
			}
		}
	}
}

function vectorToArray(vector){
	var array = [];
	
	if(vector){
		if(typeof vector == "string"){
			return  [vector];
		}
		
		var it = vector.iterator();
		while (it.hasNext() ) {
			array.push( it.next() );
		}
			
	}
	
	return array;
}

function resetDataCXIBM01(){
	var error = "";
	try{
		var writer = headerResponse("text/html", {"Cache-Control" : "no-cache"});
	
		var vwSuppliers:NotesView = sessionAsSigner.getCurrentDatabase().getView("ImportSuppliersByName");
		var vwSuppliersByCall:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwSuppliersByCallSupplier");
		var answers:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwAnswers");
		var ndSupplier:NotesDocument;
		var ndSupplierByCall:NotesDocument;
		var idSupplier;
		
		for (var i = 3; i <= 5; i++){
			ndSupplier = vwSuppliers.getDocumentByKey("CN=Usuario "+i+"/O=desarrollo", true);
			ndSupplier.replaceItemValue("idCompanySize", "");
			ndSupplier.replaceItemValue("emails", "Usuario"+i+"@desarrollo.com")
			ndSupplier.save(true, false);
		
			idSupplier = ndSupplier.getItemValueString("id");
			
			ndSupplierByCall = vwSuppliersByCall.getDocumentByKey(idSupplier, true);
			ndSupplierByCall.replaceItemValue("participateInCall", "");
			ndSupplierByCall.replaceItemValue("idSurvey", "");
			ndSupplierByCall.replaceItemValue("invitedToCall", "0");
			ndSupplierByCall.replaceItemValue("lockedByModification", "0");
			ndSupplierByCall.replaceItemValue("oldIdCompanySize", "");
			ndSupplierByCall.replaceItemValue("reasonForNotParticipation", "");
			ndSupplierByCall.replaceItemValue("idSurvey", "");
			ndSupplierByCall.replaceItemValue("state", "");
			ndSupplierByCall.save(true, false);
			
			ndSupplier.recycle();
			ndSupplierByCall.recycle();
		}
		
		answers.getAllEntries().removeAll(true);
	}catch (e){
		error = e.message
	}finally {
		var response = "Los datos han sido reseteados"
		if (error !== ""){
			response = error
		}
		writer.write("<div>"+response+"<div>");
		footerResponse(writer)
	}
}

