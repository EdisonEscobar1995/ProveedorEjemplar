import React, { Component } from 'react';
import { Tabs, Steps, Select, Row, Col, Form, Button } from 'antd';
import SubTitle from '../shared/SubTitle';
import Field from './Field';
import DinamicForm from './DinamicForm';
import { generalInfo, noParticipateInfo, comercialInfo } from './dataPage';

const { TabPane } = Tabs;
const { Step } = Steps;
const { Option } = Select;

class SupplierForm extends Component {
  state = {};
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields();
  }
  handleChange= (participate) => {
    this.setState({
      participate: participate === 'si',
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let content = '';
    let buttons = '';
    const participate = this.state.participate;
    if (participate === true) {
      content = (
        <DinamicForm
          getFieldDecorator={getFieldDecorator}
          content={generalInfo}
        />
      );
      buttons = (
        <Row type="flex" justify="center">
          <Col span={4}>
            <Button
              type="primary"
              htmlType="submit"
            >
              Guardar
            </Button>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              htmlType="submit"
            >
              Continuar
            </Button>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              htmlType="submit"
            >
              Enviar
            </Button>
          </Col>
        </Row>
      );
    } else if (participate === false) {
      content = (
        <DinamicForm
          getFieldDecorator={getFieldDecorator}
          content={noParticipateInfo}
        />
      );
      buttons = (
        <Row type="flex" justify="center">
          <Col span={4}>
            <Button
              type="primary"
              htmlType="submit"
            >
              Enviar
            </Button>
          </Col>
        </Row>
      );
    }
    return (
      <div>
        <Steps current={0}>
          <Step />
          <Step />
        </Steps>
        <Tabs defaultActiveKey="2">
          <TabPane tab="Informacion General" key="1">
            <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos commodi recusandae aliquid,
            tempora quia exercitationem quidem ullam ex corporis rerum! Amet quis molestias atque
            laborum numquam dolores esse, distinctio repudiandae?
              <div>
                <Field label="Participa del programa ?">
                  <Select style={{ width: '100%' }} onChange={this.handleChange}>
                    <Option value="si">Si</Option>
                    <Option value="no">No</Option>
                  </Select>
                </Field>
                <SubTitle text="Informaciuon de la empresa" />
                Los campos marcados con asteriscos(*) son obligatorios
              </div>
              <Form onSubmit={this.handleSubmit}>
                {
                  content
                }
                {
                  buttons
                }
              </Form>
            </div>
          </TabPane>
          <TabPane tab="Informacion Comercial" key="2">
            <Form onSubmit={this.handleSubmit}>
              <DinamicForm
                getFieldDecorator={getFieldDecorator}
                content={comercialInfo}
              />
              <Button
                type="primary"
                htmlType="submit"
              >
                Enviar
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const Supplier = Form.create()(SupplierForm);

export default Supplier;

