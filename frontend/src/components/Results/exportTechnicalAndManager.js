import exportData from '../../utils/excel';

const exportTechnicalAndManager = (excelData) => {
  const report = [];
  const merge = [];
  let range;
  let column = 0;
  if (excelData.length > 0) {
    range = { s: { r: 0, c: column } };
    let row = ['PROVEEDOR'];
    row = row.concat(['', '', '', '']);
    column += 4;
    range.e = { r: 0, c: column };
    merge.push(range);

    excelData[0].services.forEach((service) => {
      row.push(service.name.toUpperCase());
      column += 1;
      range = { s: { r: 0, c: column } };
      service.items.forEach(() => {
        row.push('');
        column += 1;
      });
      row.push('');
      column += 1;
      range.e = { r: 0, c: column };
      merge.push(range);
    });
    row.push('TOTAL GENERAL');
    column += 1;
    range = {
      s: { r: 0, c: column },
      e: { r: 1, c: column },
    };
    merge.push(range);
    report.push(row);

    row = [
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
    row.push('');
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
      row.push(supplier.totalScoreInService < 0 ? '' : supplier.totalScoreInService.toFixed(2));
      report.push(row);
    });
  }

  exportData([{
    data: report,
    merge,
    title: 'Comité Técnico',
  }, {
    data: [],
    title: 'Comité Gerencial',
  }], 'Resultados_Comite_Tecnico_Comite_Gerencial.xlsx');
};

export default exportTechnicalAndManager;
