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
	var requiredFields;
	var defaultFields;
	var foreignKeys = [];
	var viewName;
	
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"});
		
		switch(type){
			case "DIM":
				columnKeys = ["name"];
				columnNameKeys = ["Dimensión"];
				columnNames = [{commonName: "Dimensión", technicalName: "name"}];
				requiredFields = [{commonName: "Dimensión", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frDimension"}];
				viewName = "vwDimensions";
				break;
			case "CRI":
				columnKeys = ["idDimension", "name"];
				columnNameKeys = ["Dimensión", "Criterio"];
				columnNames = [{commonName: "Dimensión", technicalName: "idDimension"},
				               {commonName: "Criterio", technicalName: "name"}];
				requiredFields = [{commonName: "Dimensión", technicalName: "idDimension"},
					               {commonName: "Criterio", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frCriterion"}];
				foreignKeys = [{technicalNames: ["idDimension"], commonNames: ["Dimensión"], viewNames: ["ImportDimensionsByName"]}];
				viewName = "vwCriterions";
				break;
			case "QUE":
				columnKeys = ["idDimension", "idCriterion", "wording"];
				columnNameKeys = ["Dimensión", "Criterio", "Pregunta"];
				columnNames = [{commonName: "Dimensión", technicalName: "idDimension"},
				               {commonName: "Criterio", technicalName: "idCriterion"},
				               {commonName: "Pregunta", technicalName: "wording"},
				               {commonName: "Requiere soporte", technicalName: "requireAttachment"},
				               {commonName: "Tipo de respuesta", technicalName: "type"}];
				requiredFields = [{commonName: "Dimensión", technicalName: "idDimension"},
					               {commonName: "Criterio", technicalName: "idCriterion"},
					               {commonName: "Pregunta", technicalName: "wording"},
					               {commonName: "Requiere soporte", technicalName: "requireAttachment"},
					               {commonName: "Tipo de respuesta", technicalName: "type"}];
				defaultFields = [{ key: "form", value: "frQuestion"}];
				foreignKeys = [{technicalNames: ["idDimension", "idCriterion"], commonNames: ["Dimensión", "Criterio"], viewNames: ["ImportDimensionsByName", "ImportCriterionsByName"]}];
				viewName = "vwQuestions";
				break;
			case "OPC":
				columnKeys = ["idQuestion", "wording"];
				columnNameKeys = ["Pregunta", "Respuesta"];
				columnNames = [{commonName: "Pregunta", technicalName: "idQuestion"},
				               {commonName: "Respuesta", technicalName: "wording"},
				               {commonName: "Peso", technicalName: "score"}];
				requiredFields = [{commonName: "Pregunta", technicalName: "idQuestion"},
					               {commonName: "Respuesta", technicalName: "wording"},
					               {commonName: "Peso", technicalName: "score"}];
				defaultFields = [{ key: "form", value: "frOption"}];
				foreignKeys = [{technicalNames: ["idQuestion"], commonNames: ["Pregunta"], viewNames: ["ImportQuestionsByWording"]}];
				viewName = "vwOptions";
				break;
			case "SEC":
				columnKeys = ["name"];
				columnNameKeys = ["Sector"];
				columnNames = [{commonName: "Sector", technicalName: "name"}];
				requiredFields = [{commonName: "Sector", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frSector"}];
				viewName = "vwSectors";
				break;
			case "COS":
				columnKeys = ["name"];
				columnNameKeys = ["Tamaño de empresa"];
				columnNames = [{commonName: "Tamaño de empresa", technicalName: "name"}];
				requiredFields = [{commonName: "Tamaño de empresa", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frCompanySize"}];
				viewName = "vwCompanySizes";
				break;
			case "COT":
				columnKeys = ["name"];
				columnNameKeys = ["Tipo de compañía"];
				columnNames = [{commonName: "Tipo de compañía", technicalName: "name"}];
				requiredFields = [{commonName: "Tipo de compañía", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frCompanyType"}];
				viewName = "vwCompanyTypes";
				break;
			case "SOT":
				columnKeys = ["name"];
				columnNameKeys = ["Tipos de sociedades"];
				columnNames = [{commonName: "Tipos de sociedades", technicalName: "name"}];
				requiredFields = [{commonName: "Tipos de sociedades", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frSocietyType"}];
				viewName = "vwSocietyTypes";
				break;
			case "SUT":
				columnKeys = ["name"];
				columnNameKeys = ["Tipos de suministro"];
				columnNames = [{commonName: "Tipos de suministro", technicalName: "name"}];
				requiredFields = [{commonName: "Tipos de suministro", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frSupply"}];
				viewName = "vwSupplies";
				break;
			case "CAT":
				columnKeys = ["idSupply", "name"];
				columnNameKeys = ["Tipos de suministro", "Categoría"];
				columnNames = [{commonName: "Tipos de suministro", technicalName: "idSupply"},
				               {commonName: "Categoría", technicalName: "name"}];
				requiredFields = [{commonName: "Tipos de suministro", technicalName: "idSupply"},
					               {commonName: "Categoría", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frCategory"}];
				foreignKeys = [{technicalNames: ["idSupply"], commonNames: ["Tipo de suministro"], viewNames: ["ImportSuppliesByName"]}];
				viewName = "vwCategories";
				break;
			case "SUB":
				columnKeys = ["idCategory", "name"];
				columnNameKeys = ["Categoría", "Subcategoría"];
				columnNames = [{commonName: "Categoría", technicalName: "idCategory"},
				               {commonName: "Subcategoría", technicalName: "name"}];
				requiredFields = [{commonName: "Categoría", technicalName: "idCategory"},
					               {commonName: "Subcategoría", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frSubCategory"}];
				foreignKeys = [{technicalNames: ["idCategory"], commonNames: ["Categoría"], viewNames: ["ImportCategoriesByName"]}];
				viewName = "vwSubCategories";
				break;
				
			case "COU":
				columnKeys = ["name"];
				columnNameKeys = ["Pais"];
				columnNames = [{commonName: "Pais", technicalName: "name"}];
				requiredFields = [{commonName: "Pais", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frCountry"}];
				viewName = "vwCountries";
				break;
			case "DEP":
				columnKeys = ["idCountry", "name"];
				columnNameKeys = ["Pais", "Departamento"];
				columnNames = [{commonName: "Pais", technicalName: "idCountry"},
				               {commonName: "Departamento", technicalName: "name"}];
				requiredFields = [{commonName: "Pais", technicalName: "idCountry"},
					               {commonName: "Departamento", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frDepartment"}];
				foreignKeys = [{technicalNames: ["idCountry"], commonNames: ["Pais"], viewNames: ["ImportCountriesByName"]}];
				viewName = "vwDepartments";
				break;
			case "CIT":
				columnKeys = ["idCountry", "idDepartment", "name"];
				columnNameKeys = ["Pais", "Departamento", "Ciudad"];
				columnNames = [{commonName: "Pais", technicalName: "idCountry"},
				               {commonName: "Departamento", technicalName: "idDepartment"},
				               {commonName: "Ciudad", technicalName: "name"}];
				requiredFields = [{commonName: "Pais", technicalName: "idCountry"},
					               {commonName: "Departamento", technicalName: "idDepartment"},
					               {commonName: "Ciudad", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frCity"}];
				foreignKeys = [{technicalNames: ["idCountry", "idDepartment"], commonNames: ["Pais", "Departamento"], viewNames: ["ImportCountriesByName", "ImportDepartmentsByName"]}];
				viewName = "vwCities";
				break;
			case "SUR":
				columnKeys = ["idSupply", "idCompanySize"];
				columnNameKeys = ["Tipo de suministro", "Tamaño"];
				columnNames = [{commonName: "Tipo de suministro", technicalName: "idSupply"},
				               {commonName: "Tamaño", technicalName: "idCompanySize"}];
				requiredFields = [{commonName: "Tipo de suministro", technicalName: "idSupply"},
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
				requiredFields = [{commonName: "Tipo de suministro", technicalName: "idSupply"},
					               {commonName: "Tamaño", technicalName: "idCompanySize"},
					               {commonName: "Pregunta", technicalName: "idQuestion"}];
				defaultFields = [{ key: "form", value: "frQuestionBySurvey"}];
				foreignKeys = [{technicalNames: ["idSupply"], commonNames: ["Tipo de suministro"], viewNames: ["ImportSuppliesByName"]},
				               {technicalNames: ["idCompanySize"], commonNames: ["Tamaño"], viewNames: ["ImportCompanySizesByName"]},
				               {technicalNames: ["idQuestion"], commonNames: ["Pregunta"], viewNames: ["ImportQuestionsByWording"]}];
				viewName = "vwQuestionsBySurvey";
				break;
			case "NOT":
				columnKeys = ["alias"];
				columnNameKeys = ["Nombre"];
				columnNames = [{commonName: "Nombre", technicalName: "alias"},
				               {commonName: "Asunto", technicalName: "subject"},
				               {commonName: "Mensaje", technicalName: "message"}];
				requiredFields = [{commonName: "Nombre", technicalName: "alias"},
					               {commonName: "Asunto", technicalName: "subject"},
					               {commonName: "Mensaje", technicalName: "message"}];
				defaultFields = [{ key: "form", value: "frNotification"}];
				viewName = "vwNotifications";
				break;
			
		}
		result = importGeneric(data, response, viewName, columnNames, columnKeys, columnNameKeys, requiredFields, defaultFields, foreignKeys)
		
	}catch(e){
		result.error = e.message;
	}finally {		
		writer.write(toJson(result));
		footerResponse(writer)
	}	
}

function importGeneric(data, response, viewName, columnNames, columnKeys, columnNameKeys, requiredFields, defaultFields, foreignKeys) {
	var error = "";
	var count = 0;	
	
	try{
		var emptyFields;
		var unavailableForeignNames;
		var savedIds = [];
		var primaryKeyViolated;
		var i;
		var j;
		var k;
		
		var vw:NotesView = sessionAsSigner.getCurrentDatabase().getView(viewName);
		vw.getAllEntries().removeAll(true);
		
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
			for (i = 0; i < data.length && !error; i++){
					
				nd = sessionAsSigner.getCurrentDatabase().createDocument();
				
				for (j in defaultFields){
					nd.replaceItemValue(defaultFields[j].key, defaultFields[j].value);
				}
				
				fila = data[i];
				for (j in fila){
					if (fila.hasOwnProperty(j)){
						nd.replaceItemValue(j, fila[j]);
					}
				}
				
				nd.replaceItemValue("id", nd.getUniversalID());
				if (nd.getItemValueString("form") == "frQuestionBySurvey"){
					vwForeign = sessionAsSigner.getCurrentDatabase().getView("ImportSurveysBySupplyAndCompanySize");
	 				ndForeign = vwForeign.getDocumentByKey(nd.getItemValueString("idSupply")+nd.getItemValueString("idCompanySize"), true);
	 				if (ndForeign){
	 					nd.replaceItemValue("idSurvey", ndForeign.getItemValueString("id"));
	 					nd.removeItem("idSupply");
	 					nd.removeItem("idCompanySize");
		 			}else{
	 					error = "Violación de clave foránea";
	 					response.rows.push({pos: i + 1, error: "Clave foránea inexistente. No se encontró una encuesta que coincida con Tipo de suministro y Tamaño"})
	 				}
				}else if(nd.getItemValueString("form") == "frCity"){
					nd.removeItem("idCountry");
				}
												
				nd.save(true, false);						
				savedIds.push(nd.getItemValueString("id"));
				nd.recycle();
						
			}		
		}
		
		if ("" !== error){			
			if(savedIds.length > 0){				
				for(i in savedIds){					
					nd = sessionAsSigner.getCurrentDatabase().getView("vwDevIds").getDocumentByKey(savedIds[i], true);
					if(nd){
						nd.removePermanently(true);
						nd.recycle();
					}
				}
				savedIds = [];
			}
		}
		
		count = savedIds.length
	
	}catch(e){
		error = e.message + " fila " + i;
	}
	
	return {
		error: error,
		response: response,
		count: count
	}
}


