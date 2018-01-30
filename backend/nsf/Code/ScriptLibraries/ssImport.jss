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
	var defaultFields;
	var foreignKeys = [];
	var viewName;
	
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"});
		
		switch(type){
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
		}
		result = importGeneric(data, response, viewName, columnNames, columnKeys, columnNameKeys, defaultFields, foreignKeys)
		
	}catch(e){
		result.error = e.message;
	}finally {		
		writer.write(toJson(result));
		footerResponse(writer)
	}	
}

function importGeneric(data, response, viewName, columnNames, columnKeys, columnNameKeys, defaultFields, foreignKeys) {
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
		var aux;
		
		for (i in data) {
			for (j in columnNames){
				aux = data[i][columnNames[j].commonName];
				delete data[i][columnNames[j].commonName];
				data[i][columnNames[j].technicalName] = aux;
				if (data[i].hasOwnProperty(columnNames[j].technicalName) && data[i][columnNames[j].technicalName]){
					data[i][columnNames[j].technicalName] = data[i][columnNames[j].technicalName].trim()
				}else{
					data[i][columnNames[j].technicalName] = "";
				}
			}
		}
		
		for(i in data){
			fila = data[i];
						
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
			var dbDirectorio:NotesDatabase = sessionAsSigner.getDatabase("", "dnbddirectorio.nsf");
			var vwPeopeXCedula:NotesView = dbDirectorio.getView("PeopleXcedula");
			var vwUsers:NotesView = dbDirectorio.getView("($Users)");
			var ndUser:NotesDocument;	
			
			var vwCfg:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwSystems");
			var ndCfg:NotesView = vwCfg.getDocumentByKey("frSystem", true);
		
			var vwSurveys:NotesView = sessionAsSigner.getCurrentDatabase().getView("ImportSurveysBySupplyAndCompanySize");
			var vwSuppliers:NotesView = sessionAsSigner.getCurrentDatabase().getView("ImportSuppliersBySapCode");
			var vwSuppliersByCall:NotesView = sessionAsSigner.getCurrentDatabase().getView("ImportSuppliersByCall");
			vwSuppliers.setAutoUpdate(true);
			
			var vwStates:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwStatesByShortName");
			var ndState:NotesDocument = vwStates.getDocumentByKey("NOT_STARTED", true);
			
			var fullName:NotesName;	
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
							nd.replaceItemValue(j, fila[j]);
						}
					}
					
					nd.replaceItemValue("uploadDate", @Now());
					nd.replaceItemValue("id", nd.getUniversalID());
					
					if (nd.getItemValueString("form") == "frSupplierByCall"){
						ndForeign = vwSuppliersByCall.getDocumentByKey(nd.getItemValueString("idCall")+nd.getItemValueString("idSupplier"), true)
						if (!ndForeign){
							
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
							nd.replaceItemValue("participateInCall", "");
							nd.replaceItemValue("invitedToCall", "0");
							nd.replaceItemValue("idstate", ndState.getItemValueString("id"));
						}else{
							error = "Violación de clave primaria";
		 					response.rows.push({pos: i + 1, error: "Ya existe en el sistema un documento que coincide con convocatoria y proveedor"})
		 				}
					}else if(nd.getItemValueString("form") == "frSupplier"){
						ndUser = vwPeopeXCedula.getDocumentByKey(nd.getItemValueString("nit"), true);
						if (!ndUser){
							ndUser = vwPeopeXCedula.getDocumentByKey(nd.getItemValueString("sapCode"), true);
							if (!ndUser){
								ndUser = vwUsers.getDocumentByKey("P00" + nd.getItemValueString("sapCode"), true);
							}	
						}
						if (ndUser){
							nd.replaceItemValue("fullName", ndUser.getItemValueString("fullName"));
							if (nd.getItemValueString("fullName") === ""){
								nd.replaceItemValue("fullName", ndUser.getItemValueString("fullName2"));
							}
						}
						if (nd.getItemValueString("fullName") === ""){
							nd.replaceItemValue("fullName", "XXX");
						}
						if (nd.getItemValueString("emails") === ""){
							nd.replaceItemValue("emails", "no@no.com")
						}
					}
					
		 			nd.save(true, false);						
					savedIds.push(nd.getItemValueString("id"));
					nd.recycle();

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