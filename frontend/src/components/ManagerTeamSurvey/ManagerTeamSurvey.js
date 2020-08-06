import React, { Component } from 'react';
import { Table, Tooltip,
  Icon, Select, Input, Button,
  Row, Col,
} from 'antd';
import { ErrorStyle } from '../../utils/style';
import { COMMENT, SCORE } from '../../utils/const';
import Confirm from '../shared/Confirm';

const { Column } = Table;
const { Option } = Select;
const { TextArea } = Input;

class ManagerTeamSurvey extends Component {
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

  getComment = (record) => {
    const defaultValue = record.comment.value;
    return !record.readOnly ? (
      <TextArea
        rows={4}
        defaultValue={defaultValue}
        value={record.comment.value}
        onChange={e => this.changeComment(e, record)}
        onBlur={e => this.changeAnswer(record, e.target.value, COMMENT)}
      />
    ) : defaultValue;
  }

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
          style={{ width: 50 }}
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

  getSupplierColumns = () => {
    const { data } = this.props;
    const { masters } = data;

    const columns = [{
      title: 'Estado',
      key: 'surveyState',
      render(text, record) {
        return masters.State.find(state => state.id === record.idState).name;
      },
    }, {
      title: 'Evaluado por',
      key: 'manager',
      render(text, record) {
        return record.whoEvaluate;
      },
    }, {
      title: 'Nombre del proveedor',
      key: 'businessName',
    }, {
      title: 'Tipo de suministro',
      key: 'idSupply',
      render(text, record) {
        return masters.Supply.find(supply => supply.id === record.idSupply).name;
      },
    }, {
      title: 'Categoría',
      key: 'idCategory',
      render(text, record) {
        const category = masters.Category.find(element => element.id === record.idCategory);
        return category ? category.name : '';
      },
    }, {
      title: 'Tamaño de empresa',
      key: 'idCompanySize',
      render(text, record) {
        const companySize = masters.CompanySize.find(
          element => element.id === record.idCompanySize);
        return companySize ? companySize.name : '';
      },
    }, {
      title: 'Calificación',
      key: 'score.value',
      render: (text, record) => this.getScore(record),
    }, {
      title: 'Comentarios',
      key: 'comment.value',
      render: (text, record) => this.getComment(record),
    }];

    return columns.map(column => (
      <Column
        title={column.title}
        key={column.key}
        dataIndex={column.key}
        render={column.render}
      />
    ));
  }

  setAnswerCommentState = (record, value) => {
    const { data, setCommentState } = this.props;
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
    setCommentState(idSupplier, value, answer);
  }

  changeComment = (e, record) => {
    this.setAnswerCommentState(record, e.target.value);
  }

  changeAnswer = (record, value, type) => {
    const { data, setComment, setScore } = this.props;
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
    } else {
      answer.idEvaluationScale = record.score.defaultValue.key;
      answer.comment = value;
      setComment(idSupplier, value, answer);
    }
  }

  render() {
    const { data, finishManagerTeamSurvey } = this.props;
    const { suppliers, masters } = data;
    return suppliers ? (
      <div>
        <span>
          Escala de evaluación
          {
            this.getHelp(
              masters.EvaluationScale.map(element => (
                <div>{`${element.name}: ${element.helpText}`}</div>
              )),
            )
          }
          <strong style={{ marginLeft: 20 }}>Total resultados: </strong>
          {suppliers.filter(supplier => supplier.visible).length}
        </span>
        <Table
          dataSource={suppliers.filter(supplier => supplier.visible)}
        >
          {
            this.getSupplierColumns()
          }
        </Table>
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

export default ManagerTeamSurvey;
