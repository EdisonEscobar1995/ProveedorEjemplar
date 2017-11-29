import React from 'react';
import { Row, Col, Tooltip, Button } from 'antd';
import styled from 'styled-components';

const ButtonStyle = styled(Button)`
  margin: 2px 8px;
`;

function Field({ label, help, children }) {
  return (
    <Row>
      <Col span={24}>
        {label}
        {
          help ?
            <Tooltip placement="top" title={help}>
              <ButtonStyle size="small" shape="circle" icon="question" />
            </Tooltip>
            :
            ''
        }
      </Col>
      <Col span={24}>
        {
          children
        }
      </Col>
    </Row>
  );
}
export default Field;
