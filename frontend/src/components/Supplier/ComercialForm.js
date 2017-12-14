import React, { Component } from 'react';
import { Form } from 'antd';
import DinamicForm from '../shared/DinamicForm';
import TableForm from '../shared/TableForm';
import { comercialInfo, mainCustomers } from './dataPage';
import FormButtons from './FormButtons';


class Comercial extends Component {
  componentDidMount() {
    const { call, participateInCall, getDimensionsBySurvey } = this.props;
    const { idSurvey } = call;
    if (participateInCall === 'true') {
      getDimensionsBySurvey(idSurvey);
    }
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
      system,
      addData,
      saveData,
      editData,
      deleteData,
      cancelData,
      readOnly,
      changeIdCompanySize,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const fields = comercialInfo(this.props);
    const colummns = mainCustomers;
    const { messageByChangeSizeCompany } = system;
    const buttons = [
      {
        key: 1,
        text: 'Guardar',
        onClick: this.saveDraft,
        disabled: readOnly,
      },
      {
        key: 2,
        text: 'Enviar',
        onClick: this.handleSubmit,
        disabled: readOnly,
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
            showConfirm={changeIdCompanySize}
            messageConfirm={messageByChangeSizeCompany}
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
          disabled={readOnly}
          loading={false}
        />
      </div>
    );
  }
}
const ComercialForm = Form.create()(Comercial);

export default ComercialForm;
