import React, { Component } from 'react';
import { Form, Select } from 'antd';
import styled from 'styled-components';
import DinamicForm from '../shared/DinamicForm';
import { generalInfo, noParticipateInfo } from './dataPage';
import Field from './Field';
import FormButtons from './FormButtons';
import SubTitle from '../shared/SubTitle';

const ParagraphStyle = styled.p`
  margin-bottom:  ${props => props.theme.spaces.main};
`;

const { Option } = Select;

class General extends Component {
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
  handleChange= (participateInCall) => {
    this.props.changeParticipate(participateInCall);
  }
  render() {
    const { participateInCall, changeIdCompanySize, system, readOnly, next } = this.props;
    const { messageByChangeSizeCompany, informationProgram } = system;
    const { getFieldDecorator, setFields } = this.props.form;
    let content = '';
    let buttons = [];
    if (participateInCall === 'true') {
      const fields = generalInfo(this.props);
      buttons = [
        {
          key: 1,
          text: 'Guardar',
          buttoncolor: 'buttonFirst',
          onClick: this.saveDraft,
          disabled: readOnly,
          showConfirm: changeIdCompanySize,
          messageConfirm: messageByChangeSizeCompany,
        },
        {
          key: 3,
          text: 'Continuar',
          buttoncolor: 'buttonSecond',
          onClick: next,
          disabled: readOnly,
        },
        {
          key: 2,
          text: 'Enviar',
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
          text: 'Enviar',
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
      <div>
        <ParagraphStyle>
          {
            informationProgram
          }
        </ParagraphStyle>
        <Field label="¿Participa del programa?">
          <Select
            disabled={readOnly}
            style={{ width: '100%' }}
            value={participateInCall}
            onChange={this.handleChange}
          >
            <Option value="true">Si</Option>
            <Option value="false">No</Option>
          </Select>
        </Field>
        {participateInCall === 'true' ? <SubTitle text="Información de la empresa" /> : ''}
        <ParagraphStyle>
          Los campos marcados con asterisco(*) son requeridos
        </ParagraphStyle>
        <Form onSubmit={this.handleSubmit}>
          {
            content
          }
          <FormButtons
            buttons={buttons}
          />
        </Form>
      </div>
    );
  }
}

const GeneralForm = Form.create()(General);

export default GeneralForm;
