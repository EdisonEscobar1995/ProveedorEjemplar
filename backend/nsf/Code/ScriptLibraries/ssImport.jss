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
	var viewName;
	
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"});
		
		switch(type){
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
			case "DIM":
				columnKeys = ["name"];
				columnNameKeys = ["Dimensión"];
				columnNames = [{commonName: "Dimensión", technicalName: "name"}];
				requiredFields = [{commonName: "Dimensión", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frDimension"}];
				viewName = "vwDimensions";
				break;
			case "SEC":
				columnKeys = ["name"];
				columnNameKeys = ["Sector"];
				columnNames = [{commonName: "Sector", technicalName: "name"}];
				requiredFields = [{commonName: "Sector", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frSector"}];
				viewName = "vwSectors";
				break;
			case "SOT":
				columnKeys = ["name"];
				columnNameKeys = ["Tipos de sociedades"];
				columnNames = [{commonName: "Tipos de sociedades", technicalName: "name"}];
				requiredFields = [{commonName: "Tipos de sociedades", technicalName: "name"}];
				defaultFields = [{ key: "form", value: "frSocietyType"}];
				viewName = "vwSocietyTypes";
				break;
		}
		result = importGeneric(data, response, viewName, columnNames, columnKeys, columnNameKeys, requiredFields, defaultFields)
		
	}catch(e){
		result.error = e.message;
	}finally {		
		writer.write(toJson(result));
		footerResponse(writer)
	}	
}

function importGeneric(data, response, viewName, columnNames, columnKeys, columnNameKeys, requiredFields, defaultFields) {
	var error = "";
	var count = 0;	
	
	try{
		var emptyFields;	
		var savedIds = [];
		var primaryKeyViolated;
		var i;
		var j;
		var k;
		
		var vw:NotesView = sessionAsSigner.getCurrentDatabase().getView(viewName);
		vw.getAllEntries().removeAll(true);
		
		var nd:NotesDocument;
		
		var _data = data;
		
		var fila;
		var _fila;
		var repeatedRows = 0;
		var incompleteRows = 0;
		
		for (i in data) {
			for (j in columnNames){
				data[i][columnNames[j].technicalName] = data[i][columnNames[j].commonName];
				delete data[i][columnNames[j].commonName];
			}
		}
		
		for(i in data){
			fila = data[i];
		
			emptyFields = [];	
			for(j in requiredFields.length){				
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
		}
		
		if(incompleteRows > 0){
			error = "Campos requeridos sin diligenciar";
		}else{
			if (repeatedRows){
				error = "Violación de clave primaria";
			}else{
				
				for (i in data){
						
					nd = sessionAsSigner.getCurrentDatabase().createDocument();
					
					for (k in defaultFields){
						nd.replaceItemValue(defaultFields[k].key, defaultFields[k].value);
					}
					
					fila = data[i];
					for (k in fila){
						if (fila.hasOwnProperty(k)){
							nd.replaceItemValue(k, fila[k]);
						}
					}
					
					nd.replaceItemValue("id", nd.getUniversalID());										
													
					nd.save(true, false);						
					savedIds.push(nd.getItemValueString("id"));
					nd.recycle();
							
				}		
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
		error = e.message;
	}
	
	return {
		error: error,
		response: response,
		count: count
	}
}


