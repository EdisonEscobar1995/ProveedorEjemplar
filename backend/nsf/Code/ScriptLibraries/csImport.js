function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for (; l < data.byteLength / w; ++l) {
		o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
	}
	o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
	return o;
}

function loadFile() {
	$("#log").html("");
	
	var type = $("[data-name='type']").val();
	if (type === "") {
		alert("Debe seleccionar el tipo de estructura");
		return false;
	}
	
	var ruta = $("[data-name='fileUpload']").val();
	var file = document.getElementsByClassName("fileUpload")[0];
	if (ruta === "") {
		alert("Debe seleccionar el archivo a cargar");
		return false;
	}

	var reg = /xls|xlsx/g;
	var extensions = "xls o xlsx";

	ruta = ruta.substring(ruta.lastIndexOf(".") + 1, ruta.length).toLowerCase();
	if (!ruta.match(reg)) {
		alert("Debe elegir un archivo con extensión " + extensions);
		clearFields();
		return false;
	}
	
	var files = file.files;
	var i, f;

	for (i = 0; i != files.length; ++i) {
		f = files[i];
		var reader = new FileReader();

		reader.onload = readFile;
		reader.readAsArrayBuffer(f);
	}
}

function readFile(e) {
	var data = e.target.result;
	var arr = fixdata(data);
	var workbook = XLSX.read(btoa(arr), { type: 'base64' });

	/* DO SOMETHING WITH workbook HERE */

	var first_sheet_name = workbook.SheetNames[0];
	/* Get worksheet */
	var worksheet = workbook.Sheets[first_sheet_name];

	var aData = XLSX.utils.sheet_to_json(worksheet);

	if(aData.length > 0){
		var url =  "xaImport.xsp?Open&action=import";
		var datos = {
				data : JSON.stringify(aData),
				type : $("[data-name='type']").val()
		};
		var result = ajax(url,datos,"POST");
		var log = $("#log");	
	
		log.html(logResult(result));	
		log.show();
		clearFields();
	
	}else{
		alert("Archivo sin datos");
		clearFields();
	}
}

function clearFields(){
	$("[data-name='type']").val("");
	$("[data-name='fileUpload']").val("");
}

function logResult(result){
	var	html = "";
	if (result.error){
		html = html + "<div class='alert alert-danger'>";								
		html = html + result.error;	
		html = html + "</div>";	
	}else if (result.response.rows.length > 0) {
		html = html + "<div class='alert alert-danger'>";								
		html = html + "Errores encontrados en la carga del archivo";	
		html = html + "</div>";	
		html = html + "<table class='table table-bordered table-condensed'>";
		html = html + "<tr>";
		html = html + "<th>Fila</th>";
		html = html + "<th>Error</th>";
		html = html + "</tr>";
		if (result.response.rows.length > 0) {
			result.response.rows.forEach(function(valor){
				html = html + "<tr>";
				html = html + "<td>"+(valor.pos+1)+"</td>";
				html = html + "<td>"+valor.error+"</td>";
				html = html + "</tr>"
			})
		}
		html = html + "</table>";	
	}else if (result.count > 0){
		html = html + "<div class='alert alert-success'>";								
		html = html + "Se cargaron exitosamente " + result.count + " registros";
		html = html + "</div>";	
	}
	

	return html;

}

function ajax(url, data, method, dataType) {
	var tmpMethod;
	var tmpDataType;
	var tmpData = {};

	tmpMethod = method ? method : "POST";
	tmpDataType = dataType ? dataType : "";

	$.ajax({
		method: tmpMethod,
		async: false,
		dataType: tmpDataType,
		url: url,
		data: data

	}).done(function (data) {
		tmpData = data;
	}).fail(function () {
		alert("Error al procesar los datos")
		return false;
	});

	return tmpData;
}
