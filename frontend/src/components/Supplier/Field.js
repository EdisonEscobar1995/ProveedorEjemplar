import React from 'react';
import { Row, Col } from 'antd';

function Field({ label, children }) {
  return (
    <Row>
      <Col span={24}>
        {label}
      </Col>
      <Col span={22}>
        {
          children
        }
      </Col>
    </Row>
  );
}
export default Field;
