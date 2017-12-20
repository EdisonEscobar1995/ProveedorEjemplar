import React from 'react';
import { Row, Col, Tooltip, Button } from 'antd';
import styled from 'styled-components';
import FormattedMessage from '../shared/FormattedMessage';

const ButtonStyle = styled(Button)`
  margin: 2px 8px;
`;
const ColStyle = styled(Col)`
  margin-bottom: 4px;
`;

function Field({ label, help, required, children }) {
  return (
    <Row>
      <ColStyle span={24}>
        <FormattedMessage
          id={label}
        />
        {
          required && '(*)'
        }
        {
          help ?
            <Tooltip placement="top" title={help}>
              <ButtonStyle type="primary" size="small" shape="circle" icon="question" />
            </Tooltip>
            :
            ''
        }
      </ColStyle>
      <Col span={24}>
        {
          children
        }
      </Col>
    </Row>
  );
}
export default Field;
