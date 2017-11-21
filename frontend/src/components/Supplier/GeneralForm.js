import React, { Component } from 'react';
import { Form, Select, Button, Row, Col } from 'antd';
import DinamicForm from './DinamicForm';
import { generalInfo, noParticipateInfo } from './dataPage';
import Field from './Field';
import SubTitle from '../shared/SubTitle';

const { Option } = Select;

class General extends Component {
  constructor(...props) {
    super(props);
    this.state = {
      sizeCompany: props.sizeCompany,
    };
  }
  state = {}
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (this.state.participate) {
          this.props.next();
        }
      }
    });
  }
  handleChange= (participate) => {
    this.setState({
      participate: participate === 'si',
    });
  }
  render() {
    console.log(this.state.sizeCompany);
    const participate = this.state.participate;
    const { getFieldDecorator } = this.props.form;
    const fields = generalInfo(this.props);
    let content = '';
    let buttons = '';
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
          <Col xs={24} sm={24} md={24} span={4}>
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
        <Field label="Participa del programa ?">
          <Select style={{ width: '100%' }} onChange={this.handleChange}>
            <Option value="si">Si</Option>
            <Option value="no">No</Option>
          </Select>
        </Field>
        <SubTitle text="Informaciuon de la empresa" />
        <p>Los campos marcados con asteriscos(*) son obligatorios</p>
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
