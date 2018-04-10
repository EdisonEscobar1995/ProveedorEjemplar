import React, { Component } from 'react';
import { Tooltip, Button,
  Icon, Select, List, Row, Col,
} from 'antd';
import styled from 'styled-components';
import { ErrorStyle } from '../../utils/style';
import { SCORE } from '../../utils/const';
import Confirm from '../shared/Confirm';

const { Option } = Select;
const { Item } = List;
const { Meta } = Item;

const MetaStyled = styled(Meta)`
  & .ant-list-item-meta-title {
    color: ${props => props.theme.color.primary};
  }

  & .ant-list-item-meta-description {
    color: #404040;
  }
`;

class ManagerTeamSurveyMobile extends Component {
  getHelp = (title, isTab) => (
    title ? (
      <Tooltip placement="topRight" title={title}>
        <Icon
          style={{
            marginLeft: 5,
            marginRight: 0,
            color: isTab ? '#fff' : '#37907c',
          }}
          type={`question-circle${isTab ? '-o' : ''}`}
        />
      </Tooltip>
    ) : null
  )

  getScore = (record) => {
    const { data } = this.props;
    const { masters } = data;

    const defaultValue = record.score.defaultValue;
    return !record.readOnly ? (
      <div>
        <Select
          labelInValue
          key={record.id}
          defaultValue={defaultValue}
          allowClear={false}
          style={{ width: 200 }}
          onChange={(value) => {
            this.changeAnswer(record, value, SCORE);
          }}
        >
          {
            masters.EvaluationScale.map(option => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))
          }
        </Select>
        {
          record.score.error ? (
            <ErrorStyle>Campo requerido</ErrorStyle>
          ) : null
        }
      </div>
    ) : defaultValue.name;
  }

  getDataRows = (item) => {
    const { data } = this.props;
    const { masters } = data;
    const category = masters.Category.find(element => element.id === item.idCategory);
    const rows = [
      {
        title: 'Nombre del Proveedor',
        description: item.businessName,
      },
      {
        title: 'Categoría',
        description: category ? category.name : '',
      },
      {
        title: 'Calificación',
        description: this.getScore(item),
      },
    ];

    if (data.finishVisible) {
      rows.splice(1, 0, {
        title: 'Evaluado por',
        description: item.whoEvaluate,
      });
    }

    return rows;
  };

  changeAnswer = (record, value, type) => {
    const { data, setScore } = this.props;
    const { suppliersByCall, masters } = data;
    const idSupplier = record.id;
    const idSupplierByCall = suppliersByCall.find(element =>
      element.idSupplier === idSupplier).id;
    let answer = masters.ManagerTeamAnswer.find(element =>
      element.idSupplierByCall === idSupplierByCall);
    if (!answer) {
      answer = {
        idSupplierByCall,
      };
    }
    if (type === SCORE) {
      answer.idEvaluationScale = value.key;
      answer.comment = record.comment.value;
      setScore(idSupplier, value, answer);
    }
  }

  render() {
    const { data, finishManagerTeamSurvey } = this.props;
    const { suppliers, masters } = data;

    return suppliers ? (
      <div>
        Escala de evaluación
        {
          this.getHelp(
            masters.EvaluationScale.map(element => (
              <div>{`${element.name}: ${element.helpText}`}</div>
            )),
          )
        }
        <List
          dataSource={suppliers.filter(x => x.visible)}
          itemLayout="vertical"
          size="small"
          bordered
          style={{ 'margin-bottom': '5px' }}
          renderItem={(item, idx) => (
            <Item
              key={item.id}
              style={{ 'background-color': idx % 2 === 0 ? '#f2f2f2' : '#ffffff' }}
            >
              {
                this.getDataRows(item).map(row => (
                  <MetaStyled
                    title={row.title}
                    description={row.description}
                  />))
              }
            </Item>
          )}
        />
        {
          suppliers.filter(element => element.visible === false).length === 0
            && data.finishVisible
            && data.yearCall === (data.years && data.years.length > 0 ? data.years[0] : '') ? (
              <Row type="flex" justify="center">
                <Col span={2}>
                  <Confirm
                    title="¿Confirma que desea finalizar?"
                    method={() => finishManagerTeamSurvey()}
                  >
                    <Button
                      type="primary"
                    >
                    Finalizar
                    </Button>
                  </Confirm>
                </Col>
              </Row>
            ) : null
        }
      </div>
    ) : null;
  }
}

export default ManagerTeamSurveyMobile;
