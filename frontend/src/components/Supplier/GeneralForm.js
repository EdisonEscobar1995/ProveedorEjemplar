import React, { Component } from 'react';
import { Form, Select, Row, Col } from 'antd';
import DinamicForm from '../shared/DinamicForm';
import { generalInfo, noParticipateInfo } from './dataPage';
import Field from './Field';
import FormButtons, { ButtonStyle } from './FormButtons';
import SubTitle from '../shared/SubTitle';
import Paragraph from '../shared/Paragraph';
import FormattedMessage from '../shared/FormattedMessage';
import validateFields from './validateFields';

const { Option } = Select;

class General extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.save(values, 'send');
      }
    });
  }
  validateContactInfo = (rules) => {
    let response = true;
    // No se valida la información si es el usuario administrador
    if (rules.administrator && !(rules.administrator.readOnly)) {
      return response;
    }
    this.props.form.validateFieldsAndScroll(validateFields, (err) => {
      if (err) {
        response = false;
      }
    });
    return response;
  }
  saveDraft = (rules) => {
    if (this.validateContactInfo(rules) === true) {
      const isAdmin = rules.administrator && !(rules.administrator.readOnly);
      const dataValues = this.props.form.getFieldsValue();
      this.props.save(dataValues, '', isAdmin);
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
      participateInCall,
      acceptedPolicy,
      changeIdCompanySize,
      system,
      rules: { supplier: { readOnly } },
      rules,
    } = this.props;
    const { messageByChangeSizeCompany, informationProgram } = system;
    const { getFieldDecorator, setFields } = this.props.form;
    let content = '';
    let buttons = [];
    if (participateInCall === 'true') {
      if (!acceptedPolicy) {
        content = (
          <div>
            <SubTitle text="SupplierByCall.dataPolicy" />
            {system.dataPolicy.split('\r\n').map(item => <div>{item}<br /></div>)}
            <Row justify="center" align="middle" type="flex" gutter={24}>
              <Col>
                <ButtonStyle
                  buttoncolor="buttonFirst"
                  onClick={() => this.props.changeAcceptedPolicy(true)}
                >
                  <FormattedMessage id="Button.agree" />
                </ButtonStyle>
              </Col>
              <Col>
                <ButtonStyle
                  buttoncolor="buttonSecond"
                  onClick={() => { this.props.changeAcceptedPolicy(false); this.props.changeParticipate('false'); }}
                >
                  <FormattedMessage id="Button.refuse" />
                </ButtonStyle>
              </Col>
            </Row>
          </div>
        );
      } else {
        const fields = generalInfo(this.props);
        buttons = [
          {
            key: 1,
            text: 'Button.save',
            buttoncolor: 'buttonFirst',
            onClick: () => this.saveDraft(rules),
            disabled: (rules && rules.administrator) ? rules.administrator.readOnly : readOnly,
            showConfirm: changeIdCompanySize,
            messageConfirm: messageByChangeSizeCompany,
          },
          {
            key: 2,
            text: 'Button.continue',
            buttoncolor: 'buttonSecond',
            onClick: this.handleSubmit,
            showConfirm: changeIdCompanySize,
            disabled: readOnly,
            messageConfirm: messageByChangeSizeCompany,
          },
          /* {
            key: 3,
            text: 'Button.send',
            buttoncolor: 'buttonThird',
            onClick: this.handleSubmit,
            disabled: readOnly,
            showConfirm: changeIdCompanySize,
            messageConfirm: messageByChangeSizeCompany,
          }, */
        ];
        content = (
          <DinamicForm
            getFieldDecorator={getFieldDecorator}
            setFields={setFields}
            content={fields}
          />
        );
      }
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
      if ((rules && rules.administrator) && !(rules.administrator.readOnly)) {
        buttons.push({
          key: 2,
          text: 'Button.save',
          buttoncolor: 'buttonFirst',
          onClick: () => this.saveDraft(rules),
          disabled: (rules && rules.administrator) ? rules.administrator.readOnly : readOnly,
          showConfirm: changeIdCompanySize,
          messageConfirm: messageByChangeSizeCompany,
        });
      }
      content = (
        <DinamicForm
          getFieldDecorator={getFieldDecorator}
          setFields={setFields}
          content={fields}
        />
      );
    }
    return (
      <div>
        <Paragraph text={informationProgram} />
        <Field label="SupplierByCall.participateInCall">
          <Select
            disabled={(rules && rules.administrator) ? rules.administrator.readOnly : readOnly}
            style={{ width: '100%' }}
            value={participateInCall}
            onChange={this.handleChange}
          >
            <Option value="true"><FormattedMessage id="Supplier.yes" /></Option>
            <Option value="false"><FormattedMessage id="Supplier.no" /></Option>
          </Select>
        </Field>
        {participateInCall === 'true' && acceptedPolicy ? <SubTitle text="Supplier.companyInformation" /> : ''}
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
      </div>
    );
  }
}

const GeneralForm = Form.create()(General);

export default GeneralForm;
