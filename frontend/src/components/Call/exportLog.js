import exportData from '../../utils/excel';

function getMessage(status) {
  switch (status) {
    case 'DONT_EXIST_IN_DIRECTORY':
      return 'El proveedor no existe en el directorio';
    case 'DUPLICATED':
      return 'El proveedor ya existe para esta convocatoría';
    case 'SURVEY_DOES_NOT_EXIST':
      return 'No existe una encuesta para el proveedor';
    case 'COUNTRY_DONT_EXIST':
      return 'El país ingresado no existe';
    case 'SUPPLY_DONT_EXIST':
      return 'tipo de suministro no existe';
    case 'COMPANY_SIZE_DONT_EXIST':
      return 'Tamaño de la compañía no existe';
    case 'UNDEFINED_SUPPLIERS':
      return 'Debe ingresar al menos un proveedor';
    case 'INVALID_NIT':
      return 'NIT Inválido';
    case 'INVALID_SAP_CODE':
      return 'Código SAP inválido';
    case 'CREATED':
      return 'Proveedor creado';
    default:
      return 'El error no ha sido configurado';
  }
}

const exportLog = (errorData) => {
  const header = [
    'Fila',
    'Código SAP',
    'NIT',
    'Proveedor',
    'Estado',
  ];
  const report = [header];
  errorData.forEach((error, i) => {
    const errorstatus = getMessage(error.status);
    report.push([
      i + 2,
      error.sapCode,
      error.nit,
      error.name,
      errorstatus,
    ]);
  });
  exportData([{
    data: report,
    title: 'Log de errores',
  }], 'Log.xlsx');
};

export default exportLog;
