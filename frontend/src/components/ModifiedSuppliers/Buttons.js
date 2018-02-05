import React from 'react';
import { Row, Col, Button } from 'antd';

function Buttons(props) {
  const handleReset = () => {
    props.form.resetFields();
    props.getModifiedSuppliers();
  };

  return (
    <Row type="flex" justify="center" style={{ marginBottom: '20px' }}>
      <Col span={2}>
        <Button type="primary" onClick={handleReset}>Limpiar</Button>
      </Col>
    </Row>
  );
}

export default Buttons;
