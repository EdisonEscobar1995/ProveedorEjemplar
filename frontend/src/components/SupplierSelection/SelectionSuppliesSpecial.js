import React from 'react';
import styled from 'styled-components';
import { Checkbox, Row, Col, Button } from 'antd';

const ContainerCheck = styled.div`
  padding: 20px;
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    .ant-checkbox-group-item {
      margin-bottom: 15px;
    }
  }
`;

const SelectionSuppliesSpecial = (props) => {
  let checkeds = [];
  const { suppliesSpecialsdata, closeModal, checked, sendMethod } = props;
  const options = (suppliesSpecialsdata || []).map(item => ({ label: item.name, value: item.id }));

  const onChange = (checkedValues) => {
    checkeds = checkedValues;
  };

  const submitMethod = () => {
    sendMethod(
      checked,
      props.type,
      '',
      props.openNotification,
      checkeds,
    );
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <ContainerCheck>
            <Checkbox.Group
              options={options}
              onChange={onChange}
            />
          </ContainerCheck>
        </Col>
      </Row>
      <Row justify="center" align="middle" type="flex" gutter={24}>
        <Col span={4}>
          <Button
            key="save"
            type="primary"
            onClick={submitMethod}
          >
            Aceptar
          </Button>
        </Col>
        <Col span={4}>
          <Button
            key="cancel"
            type="primary"
            onClick={closeModal}
          >
            Cancelar
          </Button>
        </Col>
      </Row>
    </div>
  );
};


export default SelectionSuppliesSpecial;
