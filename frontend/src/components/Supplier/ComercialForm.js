import React, { Component } from 'react';
import { Form, Button } from 'antd';
import DinamicForm from '../shared/DinamicForm';
import TableForm from '../shared/TableForm';
import { comercialInfo, mainCustomers } from './dataPage';


class Comercial extends Component {
  componentDidMount() {
    const { call, getDimensionsBySurvey } = this.props;
    const { idSurvey } = call;
    getDimensionsBySurvey(idSurvey);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.save(values);
      }
    });
  }
  render() {
    const { principalCustomer, addData, saveData, editData, deleteData, cancelData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const fields = comercialInfo(this.props);
    const colummns = mainCustomers;
    return (
      <div>
        <TableForm
          data={principalCustomer}
          colummns={colummns}
          addData={addData}
          saveData={saveData}
          editData={editData}
          deleteData={deleteData}
          cancelData={cancelData}
          loading={false}
        />
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
      </div>
    );
  }
}
const ComercialForm = Form.create()(Comercial);

export default ComercialForm;
