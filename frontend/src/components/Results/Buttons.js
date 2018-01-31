import React from 'react';
import { Row, Col, Button } from 'antd';
import exportData from '../../utils/excel';

function Buttons(props) {
  const handleReset = () => {
    props.form.resetFields();
  };

  const exportExcel = (data) => {
    const header = [
      'CÓDIGO SAP DEL PROVEEDOR',
      'NIT',
      'NOMBRE DEL PROVEEDOR',
      'Dimensión',
      'Criterio',
      'PREGUNTA',
      'RESPUESTA',
      'PESO',
      'Resultado Proveedor',
      'Resultado esperado',
      'COMENTARIOS',
    ];
    const report = [header];
    data.forEach((supplier) => {
      supplier.summarySurvey.forEach(item =>
        report.push([
          supplier.sapCode,
          supplier.nit,
          supplier.name,
          item.dimension,
          item.criterion,
          item.question,
          item.answer,
          item.expectedScore === -1 || item.scoreOfSupplier === -1 ? 'No aplica' : item.scoreOfSupplier,
          item.expectedScore === -1 || item.scoreOfSupplier === -1 ? 'No aplica' : item.scoreOfSupplier,
          item.expectedScore === -1 ? 'Pregunta abierta' : item.expectedScore,
          item.commentSupplier,
        ]),
      );
      report.push([
        '', '', '', '', '', '',
        supplier.name,
        supplier.totalScore,
        supplier.totalScoreOfSupplier,
        supplier.expectedScore,
      ]);
    });
    exportData([{
      data: report,
      title: 'Proveedores',
    }], 'ParticipacionConvocatoriaProveedores.xlsx');
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
