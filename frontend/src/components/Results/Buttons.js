import React from 'react';
import { Row, Col, Button } from 'antd';
import exportData from '../../utils/excel';

function Buttons(props) {
  const handleReset = () => {
    props.form.resetFields();
  };

  const exportExcel = () => {
    const header = ['Código SAP'];
    const body = ['record.sapCode'];
    exportData([{
      data: [header, ...body],
      title: 'Proveedores',
    }], 'ParticipacionConvocatoriaProveedores.xlsx');
  };

  return (
    <Row type="flex" justify="center" style={{ marginBottom: '20px' }}>
      <Col span={2}>
        <Button type="primary" onClick={handleReset}>Limpiar</Button>
      </Col>
      <Col span={2}>
        <Button type="primary" onClick={exportExcel}>Exportar a Excel</Button>
      </Col>
    </Row>
  );
}

export default Buttons;
