import React, { Component } from 'react';
import { Form, Select, Button, Row, Col } from 'antd';
import DinamicForm from './DinamicForm';
import { generalInfo, noParticipateInfo } from './dataPage';
import Field from './Field';
import SubTitle from '../shared/SubTitle';

const { Option } = Select;

class General extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.participateInCall) {
          // this.props.next();
          const { call, supplier } = { ...this.props };
          let newSupplier = { ...supplier };
          newSupplier = Object.assign(newSupplier, values);
          call.participateInCall = true;
          this.props.saveDataCallSupplier(call, newSupplier);
        } else {
          values.participateInCall = false;
          values.lockedByModification = true;
          this.props.saveDataCallBySupplier(Object.assign(this.props.call, values));
        }
      }
    });
  }
  handleChange= (participateInCall) => {
    this.props.changeParticipate(participateInCall === 'si');
  }
  render() {
    const { participateInCall, call } = this.props;
    const { lockedByModification } = call;
    const { getFieldDecorator } = this.props.form;
    let content = '';
    let buttons = [];
    if (participateInCall === true) {
      const fields = generalInfo(this.props);
      buttons = [
        {
          key: 1,
          text: 'Guardar',
          disabled: lockedByModification,
        },
        {
          key: 2,
          text: 'Continuar',
          disabled: lockedByModification,
        },
        {
          key: 3,
          text: 'Enviar',
          disabled: lockedByModification,
        },
      ];
      content = (
        <DinamicForm
          getFieldDecorator={getFieldDecorator}
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
        },
      ];
      content = (
        <DinamicForm
          getFieldDecorator={getFieldDecorator}
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
                    htmlType="submit"
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
