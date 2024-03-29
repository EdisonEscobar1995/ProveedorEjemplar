import React, { Component } from 'react';
import { Form } from 'antd';
import DinamicForm from '../shared/DinamicForm';
import SubTitle from '../shared/SubTitle';
import message from '../shared/message';
import FormButtons from './FormButtons';
import { comercialInfo } from './dataPage';

class Comercial extends Component {
  componentDidMount() {
    if (!this.props.rules.supplier.readOnly) {
      const config = {
        type: 'warning',
        text: 'Supplier.validateInfo',
      };
      message(config);
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.save(values, 'send');
      }
    });
  }
  saveDraft = () => {
    this.props.save(this.props.form.getFieldsValue());
  }
  continue = () => {
    this.props.save(this.props.form.getFieldsValue(), 'send');
  }
  render() {
    const {
      system,
      rules: { supplier: { readOnly } },
      changeIdCompanySize,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const fields = comercialInfo(this.props);
    const { messageByChangeSizeCompany } = system;
    const buttons = [
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
        key: 3,
        text: 'Button.continue',
        buttoncolor: 'buttonSecond',
        onClick: this.continue,
        disabled: readOnly,
        showConfirm: changeIdCompanySize,
        messageConfirm: messageByChangeSizeCompany,
      },
      {
        key: 2,
        text: 'Button.send',
        buttoncolor: 'buttonThird',
        onClick: this.handleSubmit,
        disabled: readOnly,
        showConfirm: changeIdCompanySize,
        messageConfirm: messageByChangeSizeCompany,
      },
    ];
    return (
      <div>
        <SubTitle text="Supplier.principalCustomers" />
        <Form onSubmit={this.handleSubmit}>
          <DinamicForm
            getFieldDecorator={getFieldDecorator}
            content={fields}
          />
          <FormButtons
            preventTranlate
            buttons={buttons}
          />
        </Form>
      </div>
    );
  }
}
const ComercialForm = Form.create()(Comercial);

export default ComercialForm;
