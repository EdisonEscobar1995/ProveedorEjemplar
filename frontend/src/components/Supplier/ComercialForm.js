import React, { Component } from 'react';
import { Form } from 'antd';
import DinamicForm from '../shared/DinamicForm';
import TableForm from '../shared/TableForm';
import { comercialInfo, mainCustomers } from './dataPage';
import FormButtons from './FormButtons';


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
        this.props.save(values, 'send');
      }
    });
  }
  saveDraft = () => {
    this.props.save(this.props.form.getFieldsValue());
  }
  render() {
    const {
      principalCustomer,
      call,
      system,
      addData,
      saveData,
      editData,
      deleteData,
      cancelData,
      changeIdCompanySize,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const fields = comercialInfo(this.props);
    const { lockedByModification } = call;
    const colummns = mainCustomers;
    const { messageByChangeSizeCompany } = system;
    const buttons = [
      {
        key: 1,
        text: 'Guardar',
        onClick: this.saveDraft,
        disabled: lockedByModification,
      },
      {
        key: 2,
        text: 'Enviar',
        onClick: this.handleSubmit,
        disabled: lockedByModification,
      },
    ];
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <DinamicForm
            getFieldDecorator={getFieldDecorator}
            content={fields}
          />
          <FormButtons
            buttons={buttons}
            changeIdCompanySize={changeIdCompanySize}
            messageByChangeSizeCompany={messageByChangeSizeCompany}
          />
        </Form>
        <TableForm
          data={principalCustomer}
          colummns={colummns}
          addData={addData}
          saveData={saveData}
          editData={editData}
          deleteData={deleteData}
          cancelData={cancelData}
          disabled={call.lockedByModification}
          loading={false}
        />
      </div>
    );
  }
}
const ComercialForm = Form.create()(Comercial);

export default ComercialForm;
