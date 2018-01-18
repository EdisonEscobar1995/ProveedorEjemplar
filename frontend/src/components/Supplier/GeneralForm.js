import React, { Component } from 'react';
import { Form, Select } from 'antd';
import DinamicForm from '../shared/DinamicForm';
import { generalInfo, noParticipateInfo, mainCustomers } from './dataPage';
import Field from './Field';
import FormButtons from './FormButtons';
import SubTitle from '../shared/SubTitle';
import Paragraph from '../shared/Paragraph';
import FormattedMessage from '../shared/FormattedMessage';
import TableForm from '../shared/TableForm';
import validateFields from './validateFields';

const { Option } = Select;
const colummns = mainCustomers;

class General extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.save(values, 'send');
      }
    });
  }
  validateContactInfo = () => {
    let response = true;
    this.props.form.validateFieldsAndScroll(validateFields, (err) => {
      if (err) {
        response = false;
      }
    });
    return response;
  }
  saveDraft = () => {
    if (this.validateContactInfo() === true) {
      this.props.save(this.props.form.getFieldsValue());
    }
  }
  continue = () => {
    const isValid = this.validateContactInfo();
    if (isValid) {
      this.props.save(this.props.form.getFieldsValue(), 'send');
    }
    return isValid;
  }
  handleChange= (participateInCall) => {
    this.props.changeParticipate(participateInCall);
  }
  render() {
    const {
      supplier,
      participateInCall,
      changeIdCompanySize,
      system,
      readOnly,
      addData,
      saveData,
      editData,
      deleteData,
      cancelData,
      updateField,
    } = this.props;
    const { principalCustomer } = supplier;
    const { messageByChangeSizeCompany, informationProgram } = system;
    const { getFieldDecorator, setFields } = this.props.form;
    let content = '';
    let buttons = [];
    if (participateInCall === 'true') {
      const fields = generalInfo(this.props);
      buttons = [
        {
          key: 1,
          text: 'Button.save',
          buttoncolor: 'buttonFirst',
          onClick: this.saveDraft,
          disabled: readOnly,
          showConfirm: changeIdCompanySize,
          messageConfirm: messageByChangeSizeCompany,
        },
        {
          key: 2,
          text: 'Button.continue',
          buttoncolor: 'buttonSecond',
          onClick: this.continue,
          showConfirm: changeIdCompanySize,
          disabled: readOnly,
          messageConfirm: messageByChangeSizeCompany,
        },
        {
          key: 3,
          text: 'Button.send',
          buttoncolor: 'buttonThird',
          onClick: this.handleSubmit,
          disabled: readOnly,
          showConfirm: changeIdCompanySize,
          messageConfirm: messageByChangeSizeCompany,
        },
      ];
      content = (
        <DinamicForm
          getFieldDecorator={getFieldDecorator}
          setFields={setFields}
          content={fields}
        />
      );
    } else if (participateInCall === 'false') {
      const fields = noParticipateInfo(this.props);
      buttons = [
        {
          key: 1,
          text: 'Button.send',
          buttoncolor: 'buttonThird',
          disabled: readOnly,
          onClick: this.handleSubmit,
        },
      ];
      content = (
        <DinamicForm
          getFieldDecorator={getFieldDecorator}
          setFields={setFields}
          content={fields}
        />
      );
    }
    return (
      <div style={{ width: '90vw' }}>
        <Paragraph text={informationProgram} />
        <Field label="SupplierByCall.participateInCall">
          <Select
            disabled={readOnly}
            style={{ width: '100%' }}
            value={participateInCall}
            onChange={this.handleChange}
          >
            <Option value="true"><FormattedMessage id="Supplier.yes" /></Option>
            <Option value="false"><FormattedMessage id="Supplier.no" /></Option>
          </Select>
        </Field>
        {participateInCall === 'true' ? <SubTitle text="Supplier.companyInformation" /> : ''}
        <Paragraph text="Survey.required" translate />
        <Form onSubmit={this.handleSubmit}>
          {
            content
          }
          <FormButtons
            preventTranlate
            buttons={buttons}
          />
        </Form>
        {participateInCall === 'true' ?
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
            updateField={updateField}
          />
          :
          null
        }
      </div>
    );
  }
}

const GeneralForm = Form.create()(General);

export default GeneralForm;
