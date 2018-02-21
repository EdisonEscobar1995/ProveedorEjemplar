import React from 'react';
import fieldsData from './fieldsData';
import FilterForm from '../shared/FilterForm';
import exportData from '../../utils/excel';

function Filters(props) {
  const handleReset = () => {
    props.form.resetFields();
  };

  const exportExcel = (data) => {
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
    data.forEach((supplier) => {
      supplier.summarySurvey.forEach(item =>
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
          item.commentSupplier,
          item.expectedScore === -1 || item.scoreOfSupplier === -1 ? 'No aplica' : item.scoreOfSupplier,
          item.expectedScore === -1 ? 'Pregunta abierta' : item.expectedScore,
          supplier.scoreOfSupplier,
          supplier.expectedScore,
          supplier.totalScoreOfSupplier,
          item.answerEvaluator,
          item.commentEvaluator,
          item.expectedScore === -1 || item.scoreOfEvaluator === -1 ? 'No aplica' : item.scoreOfEvaluator,
          item.expectedScore === -1 ? 'Pregunta abierta' : item.expectedScore,
          supplier.scoreOfEvaluator,
          supplier.expectedScore,
          supplier.totalScoreOfEvaluator,
        ]),
      );
    });
    exportData([{
      data: report,
      title: 'Resultados',
    }], 'ResultadosProveedorEquipoEvaluador.xlsx');
  };

  const getResults = () => {
    props.getResults(props.form.getFieldsValue(), exportExcel);
  };

  return (
    <FilterForm
      {...props}
      fieldsData={fieldsData}
      handleReset={handleReset}
      getResults={getResults}
    />
  );
}

export default Filters;
