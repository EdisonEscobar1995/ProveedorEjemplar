import React from 'react';
import { Spin, Row, Col } from 'antd';
import styled from 'styled-components';
import SimpleSelect from '../shared/SimpleSelect';
import SubTitle from '../shared/SubTitle';

const Text = styled.div`
  margin-bottom: 4px;
`;

const SurveyAdmonForm = (props) => {
  const { loading, supply, companySize, supplyValue, companySizeValue } = props;
  const design = { xs: 24, sm: 24, md: 12, lg: 12 };
  return (
    <Spin spinning={loading}>
      <SubTitle text="Información general" />
      <Row align="middle" type="flex" gutter={24}>
        <Col {...design}>
          <Text>Tipo de suministro</Text>
          <SimpleSelect options={supply} handleChange={supplyValue} />
        </Col>
        <Col {...design}>
          <Text>Tamaño de la empresa</Text>
          <SimpleSelect options={companySize} handleChange={companySizeValue} />
        </Col>
      </Row>
    </Spin>
  );
};

export default SurveyAdmonForm;
