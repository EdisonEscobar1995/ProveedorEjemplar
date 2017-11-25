import React, { Component } from 'react';
import { Form, Select, Button, Row, Col } from 'antd';
import DinamicForm from '../shared/DinamicForm';
import { generalInfo, noParticipateInfo } from './dataPage';
import Field from './Field';
import SubTitle from '../shared/SubTitle';

const { Option } = Select;

class General extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.save(values);
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
    const { participateInCall, call } = this.props;
    const { lockedByModification } = call;
    const { getFieldDecorator, setFields } = this.props.form;
    let content = '';
    let buttons = [];
    if (participateInCall === true) {
      const fields = generalInfo(this.props);
      buttons = [
        {
          key: 1,
          text: 'Guardar',
          submit: false,
          onClick: this.saveDraft,
          disabled: lockedByModification,
        },
        {
          key: 2,
          text: 'Continuar',
          submit: true,
          disabled: lockedByModification,
        },
        {
          key: 3,
          text: 'Enviar',
          submit: true,
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
          submit: true,
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
    }
    return (
      <div>
        <Field label="Participa del programa ?">
          <Select
            disabled={lockedByModification}
            style={{ width: '100%' }}
            value={participateInCall ? 'si' : 'no'}
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
                  <Button
                    disabled={button.disabled}
                    type="primary"
                    onClick={button.onClick}
                    htmlType={button.submit ? 'submit' : 'button'}
                  >
                    {
                      button.text
                    }
                  </Button>
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
