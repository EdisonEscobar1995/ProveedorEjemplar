import React, { Component } from 'react';
import { Form, Button } from 'antd';
import DinamicForm from './DinamicForm';
import { comercialInfo } from './dataPage';


class Comercial extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
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
    );
  }
}
const ComercialForm = Form.create()(Comercial);

export default ComercialForm;
