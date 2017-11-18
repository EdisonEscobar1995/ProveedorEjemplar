import React, { Component } from 'react';
import { Form, Select, Button, Row, Col } from 'antd';
import DinamicForm from './DinamicForm';
import { generalInfo, noParticipateInfo } from './dataPage';
import Field from './Field';
import SubTitle from '../shared/SubTitle';

const { Option } = Select;

class General extends Component {
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
    const fields = generalInfo(
      this.props.categories,
      this.props.companyTypes,
      this.props.societyTypes,
    );
    let content = '';
    let buttons = '';
    const participate = this.state.participate;
    if (participate === true) {
      content = (
        <DinamicForm
          getFieldDecorator={getFieldDecorator}
          content={fields}
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
    );
  }
}

const GeneralForm = Form.create()(General);

export default GeneralForm;
