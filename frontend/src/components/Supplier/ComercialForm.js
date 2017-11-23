import React, { Component } from 'react';
import { Form, Button } from 'antd';
import DinamicForm from './DinamicForm';
import { comercialInfo } from './dataPage';


class Comercial extends Component {
  componentDidMount() {
    const { call, getDimensionsBySurvey } = this.props;
    const { idSurvey } = call;
    getDimensionsBySurvey(idSurvey);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const fields = comercialInfo(this.props);
    return (
      <Form onSubmit={this.handleSubmit}>
        <DinamicForm
          getFieldDecorator={getFieldDecorator}
          content={fields}
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
