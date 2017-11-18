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
				foreignKeys = [{technicalName: "idDimension", commonName: "Dimensión", viewName: "vwDimensionsByName"}];
				viewName = "vwCriterions";
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
				foreignKeys = [{technicalName: "idSupply", commonName: "Tipo de suministro", viewName: "vwSuppliesByName"}];
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
				foreignKeys = [{technicalName: "idCategory", commonName: "Categoría", viewName: "vwCategoriesByName"}];
				viewName = "vwSubCategories";
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
		var unavailableForeignKeys = 0;
		
		for (i in data) {
			for (j in columnNames){
				data[i][columnNames[j].technicalName] = data[i][columnNames[j].commonName];
				delete data[i][columnNames[j].commonName];
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
			for (j in foreignKeys){
				vwForeign = sessionAsSigner.getCurrentDatabase().getView(foreignKeys[j].viewName);
				ndForeign = vwForeign.getDocumentByKey(fila[foreignKeys[j].technicalName], true);
				if (!ndForeign){
					unavailableForeignNames.push(foreignKeys[j].commonName)
				}else{
					fila[foreignKeys[j].technicalName] = ndForeign.getItemValueString("id");
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
			for (i in data){
					
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
		error = e.message;
	}
	
	return {
		error: error,
		response: response,
		count: count
	}
}


