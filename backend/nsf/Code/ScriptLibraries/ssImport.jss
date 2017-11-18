import ssCommon;

function importData() {	
	var type = param.get("type");
	var data = fromJson(param.get("data"));
	var error = "";
	var response = {error: "", rows: []};
	var result = {error: "", response: response, count: 0};
	
	try{
		var writer = headerResponse("application/json;charset=UTF-8", {"Cache-Control" : "no-cache"});
		
		switch(type){
			case "SEC":
			result = importSectors(data, response)
			break;
		}
	}catch(e){
		result.error = e.message;
	}finally {		
		writer.write(toJson(result));
		footerResponse(writer)
	}	
}

function importSectors(data, response) {
	var error = ""
	var fields;
	var emptyFields;	
	var savedIds = [];
	
	var vwSectors:NotesView = sessionAsSigner.getCurrentDatabase().getView("vwSectors");
	vwSectors.getAllEntries().removeAll(true);
	
	var ndActual:NotesDocument = null;
	
	var _data = data;
	
	var fila;
	var _fila;
	var repeated = 0;
	
	for (var i in data) {
		data[i]["name"] = data[i]["Sector"];
		delete data[i]["Sector"];
	}
	
	for(i in data){
		fila = data[i];
		for(j in _data){
			if(i != j){
				_fila = _data[j];
				if(fila.name == _fila.name){
					repeated ++;
					response.rows.push({pos: i + 1, error: "Nombre repetido."})
				}	
			}
		}
	}
	
	if(repeated > 0){
		error = "Hay nombres repetidos en el archivo";
	}else{
		
		for (i in data){
			emptyFields = [];	
			fields = [];			
			fields[0] = {name: "name", title: "Nombre"};
									
			for(var j = 0; j <= fields.length - 1; j++){				
				if (!data[i].hasOwnProperty(fields[j].name)){
					emptyFields.push(fields[j].title);					
				}
			}
						
			if(emptyFields.length == 0){
				
				ndActual = sessionAsSigner.getCurrentDatabase().createDocument();
				
				ndActual.replaceItemValue("form","frSector");
				ndActual.replaceItemValue("name", data[i].name);
				ndActual.replaceItemValue("id", ndActual.getUniversalID());										
												
				ndActual.save(true, false);						
				savedIds.push(ndActual.getItemValueString("id"));
				ndActual.recycle();
			
			}else{
				error = "Faltan datos por diligenciar";
				response.rows.push({pos: i + 1, error: "Debe ingresar información en la(s) columna(s): " + emptyFields.join(", ")});
			}			
		}
	}
	
	if ("" !== error){			
		if(savedIds.length > 0){				
			var nd:NotesDocument = null;
			for(i in savedIds){					
				nd = sessionAsSigner.getCurrentDatabase().getView("vwDevIds").getDocumentByKey(savedIds[i], true);
				if(nd){
					nd.removePermanently(true);
				}
			}
			savedIds = [];
		}
	}
	
	return {
		error: error,
		response: response,
		count: savedIds.length
	}
}


