import exportData from '../../utils/excel';

const exportTechnicalAndManager = (excelData) => {
  const header = [
    'Código SAP',
    'Proveedor',
    'Tipo de suministro',
    'Categoría',
    'Tamaño de empresa',
  ];
  const report = [header];
  excelData.forEach((supplier) => {
    supplier.summarySurvey.forEach(() => {
      report.push([
        supplier.sapCode,
        supplier.name,
        supplier.supply,
        supplier.category,
        supplier.companySize,
      ]);
    });
  });
  exportData([{
    data: report,
    title: 'Comité Técnico',
  }, {
    data: [],
    title: 'Comité Gerencial',
  }], 'Resultados_Comite_Tecnico_Comite_Gerencial.xlsx');
};

export default exportTechnicalAndManager;
