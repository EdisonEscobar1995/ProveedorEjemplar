import React from 'react';
import { Row, Col, Button } from 'antd';
import exportData from '../../utils/excel';

function Buttons(props) {
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
      'Respuesta',
      'Comentarios',
      'Resultado proveedor',
      'Resultado esperado',
      'Total proveedor',
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
          item.answer,
          item.commentSupplier,
          item.expectedScore === -1 || item.scoreOfSupplier === -1 ? 'No aplica' : item.scoreOfSupplier,
          item.expectedScore === -1 ? 'Pregunta abierta' : item.expectedScore,
          supplier.totalScore,
          supplier.expectedScore,
          supplier.totalScoreOfSupplier,
        ]),
      );
    });
    exportData([{
      data: report,
      title: 'Proveedores',
    }], 'ResultadosProveedorEquipoEvaluador.xlsx');
  };

  const getResults = () => {
    props.getResults(props.form.getFieldsValue(), exportExcel);
  };

  return (
    <Row type="flex" justify="center" style={{ marginBottom: '20px' }}>
      <Col span={2}>
        <Button type="primary" onClick={handleReset}>Limpiar</Button>
      </Col>
      <Col span={2}>
        <Button type="primary" onClick={getResults}>Exportar a Excel</Button>
      </Col>
    </Row>
  );
}

export default Buttons;
