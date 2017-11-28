import React, { Component } from 'react';
import { Form, Select, Button, Row, Col } from 'antd';
import DinamicForm from '../shared/DinamicForm';
import { generalInfo, noParticipateInfo } from './dataPage';
import Field from './Field';
import SubTitle from '../shared/SubTitle';
import Confirm from '../shared/Confirm';

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
    this.props.changeParticipate(participateInCall === 'si');
  }
  render() {
    const { participateInCall, call, changeIdCompanySize, system } = this.props;
    const { messageByChangeSizeCompany } = system;
    const { lockedByModification } = call;
    const { getFieldDecorator, setFields } = this.props.form;
    let valueSelect = '';
    if (participateInCall) {
      valueSelect = participateInCall ? 'si' : 'no';
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
        <Field label="Participa del programa ?">
          <Select
            disabled={lockedByModification}
            style={{ width: '100%' }}
            value={valueSelect}
            onChange={this.handleChange}
          >
            <Option value="si">Si</Option>
            <Option value="no">No</Option>
          </Select>
        </Field>
        <SubTitle text="Informaciuon de la empresa" />
        <p>Los campos marcados con asteriscos(*) son obligatorios</p>
        <Form onSubmit={this.handleSubmit}>
          {
            content
          }
          <Row type="flex" justify="center">
            {
              buttons.map(button => (
                <Col span={4} key={button.key}>
                  {
                    changeIdCompanySize ?
                      <Confirm title={messageByChangeSizeCompany} method={button.onClick}>
                        <Button
                          disabled={button.disabled}
                          type="primary"
                        >
                          {
                            button.text
                          }
                        </Button>
                      </Confirm>
                      :
                      <Button
                        disabled={button.disabled}
                        type="primary"
                        onClick={button.onClick}
                      >
                        {
                          button.text
                        }
                      </Button>

                  }
                </Col>
              ))
            }
          </Row>
        </Form>
      </div>
    );
  }
}

const GeneralForm = Form.create()(General);

export default GeneralForm;
