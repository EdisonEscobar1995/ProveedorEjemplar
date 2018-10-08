import exportData from '../../utils/excel';

const exportSupplierAndEvaluator = (excelData) => {
  const header = [
    'Código SAP',
    'NIT',
    'Proveedor',
    'Tipo de suministro',
    'Categoría',
    'Tamaño de empresa',
    'Dimensión',
    'Criterio',
    'Pregunta',
    'Respuesta proveedor',
    'Tiene anexos',
    '# de soportes',
    'Comentarios',
    'Resultado proveedor',
    'Resultado esperado',
    'Total proveedor',
    'Total esperado',
    'Porcentaje obtenido',
    'Respuesta evaluador',
    'Comentarios',
    'Resultado evaluador',
    'Resultado esperado',
    'Total evaluador',
    'Total esperado',
    'Porcentaje obtenido',
  ];
  const report = [header];
  excelData.forEach((supplier) => {
    supplier.summarySurvey.forEach((item) => {
      let labelForExpected;
      if (item.questionType === 'Abierta') {
        labelForExpected = 'Pregunta abierta';
      } else {
        labelForExpected = 'No aplica';
      }
      report.push([
        supplier.sapCode,
        supplier.nit,
        supplier.name,
        supplier.supply,
        supplier.category,
        supplier.companySize,
        item.dimension,
        item.criterion,
        item.question,
        item.answerSupplier,
        item.attachmentCount > 0 ? 'Si' : 'No',
        item.attachmentCount,
        item.commentSupplier,
        item.expectedScoreSupplier < 0 || item.scoreOfSupplier < 0 ? 'No aplica' : item.scoreOfSupplier,
        item.expectedScoreSupplier < 0 ? labelForExpected : item.expectedScoreSupplier,
        supplier.scoreOfSupplier < 0 ? 'No aplica' : supplier.scoreOfSupplier,
        supplier.expectedScoreSupplier < 0 ? 'No aplica' : supplier.expectedScoreSupplier,
        supplier.totalScoreOfSupplier < 0 ? 'No aplica' : supplier.totalScoreOfSupplier,
        item.answerEvaluator,
        item.commentEvaluator,
        item.expectedScoreEvaluator < 0 || item.scoreOfEvaluator < 0 ? 'No aplica' : item.scoreOfEvaluator,
        item.expectedScoreEvaluator < 0 ? labelForExpected : item.expectedScoreEvaluator,
        supplier.scoreOfEvaluator < 0 ? 'No aplica' : supplier.scoreOfEvaluator,
        supplier.expectedScoreEvaluator < 0 ? 'No aplica' : supplier.expectedScoreEvaluator,
        supplier.totalScoreOfEvaluator < 0 ? 'No aplica' : supplier.totalScoreOfEvaluator,
      ]);
    });
  });
  exportData([{
    data: report,
    title: 'Resultados',
  }], 'Resultados_Proveedor_Equipo_Evaluador.xlsx');
};

export default exportSupplierAndEvaluator;
