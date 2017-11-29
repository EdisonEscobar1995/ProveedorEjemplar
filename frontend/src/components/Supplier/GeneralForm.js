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
    this.props.changeParticipate(participateInCall === 'true');
  }
  render() {
    const { participateInCall, call, changeIdCompanySize, system } = this.props;
    const { messageByChangeSizeCompany, informationProgram } = system;
    const { lockedByModification } = call;
    const { getFieldDecorator, setFields } = this.props.form;
    let valueSelect = '';
    if (typeof (participateInCall) === 'boolean') {
      valueSelect = participateInCall ? 'true' : 'false';
    }
    let content = '';
    let buttons = [];
    if (participateInCall === true) {
      const fields = generalInfo(this.props);
      buttons = [
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
      content = (
        <DinamicForm
          getFieldDecorator={getFieldDecorator}
          setFields={setFields}
          content={fields}
        />
      );
    } else if (participateInCall === false) {
      const fields = noParticipateInfo(this.props);
      buttons = [
        {
          key: 1,
          text: 'Enviar',
          disabled: lockedByModification,
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
        <Field label="Participa del programa ?">
          <Select
            disabled={lockedByModification}
            style={{ width: '100%' }}
            value={valueSelect}
            onChange={this.handleChange}
          >
            <Option value="true">Si</Option>
            <Option value="false">No</Option>
          </Select>
        </Field>
        <SubTitle text="Información de la empresa" />
        <ParagraphStyle>
          Los campos marcados con asterisco(*) son requeridos
        </ParagraphStyle>
        <Form onSubmit={this.handleSubmit}>
          {
            content
          }
          <FormButtons
            buttons={buttons}
            changeIdCompanySize={changeIdCompanySize}
            messageByChangeSizeCompany={messageByChangeSizeCompany}
          />
        </Form>
      </div>
    );
  }
}

const GeneralForm = Form.create()(General);

export default GeneralForm;
