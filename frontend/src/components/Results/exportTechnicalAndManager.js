import exportData from '../../utils/excel';

const exportTechnicalAndManager = (excelData) => {
  const report = [];
  if (excelData.length > 0) {
    let row = [
      'Código SAP',
      'Proveedor',
      'Tipo de suministro',
      'Categoría',
      'Tamaño de empresa',
    ];
    excelData[0].services.forEach((service) => {
      service.items.forEach((item) => {
        row.push(item.name);
      });
      row.push('Comentarios');
      row.push('Total');
    });
    report.push(row);
    excelData.forEach((supplier) => {
      row = [
        supplier.sapCode,
        supplier.name,
        supplier.supply,
        supplier.category,
        supplier.companySize,
      ];
      supplier.services.forEach((service) => {
        service.items.forEach((item) => {
          row.push(item.answer < 0 ? '' : item.answer);
        });
        row.push(service.comment);
        row.push(service.total < 0 ? '' : service.total.toFixed(2));
      });
      report.push(row);
    });
  }
  exportData([{
    data: report,
    title: 'Comité Técnico',
  }, {
    data: [],
    title: 'Comité Gerencial',
  }], 'Resultados_Comite_Tecnico_Comite_Gerencial.xlsx');
};

export default exportTechnicalAndManager;
