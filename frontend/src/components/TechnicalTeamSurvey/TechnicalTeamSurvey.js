import React, { Component } from 'react';
import { Table, Tabs, Tooltip,
  Icon, Select, Input, Button,
  Row, Col,
} from 'antd';
import { ContentStyle, TabsStyle, ErrorStyle } from '../../utils/style';
import Confirm from '../shared/Confirm';

const { Column } = Table;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

class TechnicalTeamSurvey extends Component {
  getHelp = title => (
    title ? (
      <Tooltip placement="topRight" title={title}>
        <Icon
          style={{
            marginLeft: 5,
            marginRight: 0,
          }}
          type="question-circle-o"
        />
      </Tooltip>
    ) : null
  )

  getServices = () => {
    const { data } = this.props;
    const { masters } = data;

    return masters.Service.map(service => (
      <TabPane
        tab={
          <ContentStyle>
            {service.name}
            {this.getHelp(service.helpText)}
          </ContentStyle>
        }
        key={service.id}
      >
        {
          this.getSuppliers(service)
        }
      </TabPane>
    ));
  }

  getSuppliers = (service) => {
    const { data } = this.props;
    const { suppliers } = data;

    return (
      <Table
        rowKey={record => record.id}
        dataSource={suppliers.filter(supplier => supplier.visible)}
      >
        {
          this.getSupplierColumns()
        }
        {
          this.getItemsColumns(service)
        }
      </Table>
    );
  }

  getSupplierColumns = () => {
    const { data } = this.props;
    const { suppliersByCall, masters } = data;

    const columns = [{
      title: 'Estado',
      key: 'surveyState',
      render(text, record) {
        const idState = suppliersByCall
          .find(supplierByCall => supplierByCall.idSupplier === record.id)
          .idState;
        return masters.State.find(state => state.id === idState).name;
      },
    }, {
      title: 'Evaluado por',
      key: 'negotiator',
      render(text, record) {
        return suppliersByCall
          .find(supplierByCall => supplierByCall.idSupplier === record.id)
          .whoEvaluateOfTechnicalTeam;
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

  getItemsColumns = (service) => {
    const { data } = this.props;
    const { masters } = data;

    return (
      masters.Item.filter(item => item.idService === service.id).map(item => (
        <Column
          title={
            <div>
              {item.name}
              {this.getHelp(item.helpText)}
            </div>
          }
          key={item.id}
          dataIndex={item.id}
          render={(text, record) => {
            switch (item.type) {
              case 'comment': return this.getComment(service, record);
              case 'subtotal': return this.getSubTotal(item, record);
              case 'total': return record.total.toFixed(2);
              default: return this.getScore(item, record);
            }
          }}
        />
      ))
    );
  }

  getComment = (service, record) => {
    const defaultValue = record.comments.find(element => element.idService === service.id).value;
    return !record.readOnly ? (
      <TextArea
        rows={4}
        defaultValue={defaultValue}
        onBlur={e => this.changeComment(record, service, e.target.value)}
      />
    ) : defaultValue;
  }

  getSubTotal = (item, record) => (
    record.totals
      .find(element => element.idService === item.idServiceForTotal)
      .value.toFixed(2)
  )

  getScore = (item, record) => {
    const { data } = this.props;
    const { masters } = data;

    const recordItem = record.items.find(element => element.id === item.id);
    const defaultValue = recordItem.defaultValue;
    return !record.readOnly ? (
      <div>
        <Select
          labelInValue
          key={record.id}
          defaultValue={defaultValue}
          allowClear={false}
          style={{ width: 50 }}
          onChange={(value) => {
            this.changeScore(record, item, value);
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
          recordItem.error ? (
            <ErrorStyle>Campo requerido</ErrorStyle>
          ) : null
        }
      </div>
    ) : defaultValue.name;
  }

  changeComment = (record, service, value) => {
    const { data, setComment } = this.props;
    const { suppliersByCall, masters } = data;

    const idSupplier = record.id;
    const idService = service.id;
    const idSupplierByCall = suppliersByCall.find(element =>
      element.idSupplier === idSupplier).id;
    let comment = masters.TechnicalTeamComment.find(element =>
      element.idSupplierByCall === idSupplierByCall && element.idService === idService);
    if (!comment) {
      comment = {
        idSupplierByCall,
        idService,
      };
    }
    comment.comment = value;
    setComment(idSupplier, idService, value, comment);
  }

  changeScore = (record, item, value) => {
    const { data, setScore } = this.props;
    const { suppliersByCall, masters } = data;

    const idSupplier = record.id;
    const idItem = item.id;
    const idSupplierByCall = suppliersByCall.find(element =>
      element.idSupplier === idSupplier).id;
    let answer = masters.TechnicalTeamAnswer.find(element =>
      element.idSupplierByCall === idSupplierByCall && element.idItem === idItem);
    if (!answer) {
      answer = {
        idSupplierByCall,
        idService: item.idService,
        idItem,
      };
    }
    answer.idEvaluationScale = value.key;
    setScore(idSupplier, idItem, value, answer);
  }

  render() {
    const { data, finishTechnicalTeamSurvey } = this.props;
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
        <TabsStyle
          animated={false}
          style={{ marginTop: 10 }}
        >
          {
            this.getServices()
          }
        </TabsStyle>
        <Row type="flex" justify="center">
          <Col span={2}>
            <Confirm
              title="¿Confirma que desea finalizar?"
              method={() => finishTechnicalTeamSurvey()}
            >
              <Button
                type="primary"
              >
                Finalizar
              </Button>
            </Confirm>
          </Col>
        </Row>
      </div>
    ) : null;
  }
}

export default TechnicalTeamSurvey;
