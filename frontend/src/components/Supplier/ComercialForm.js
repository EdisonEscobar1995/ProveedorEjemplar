import React, { Component } from 'react';
import { Form, Button } from 'antd';
import DinamicForm from '../shared/DinamicForm';
import TableForm from '../shared/TableForm';
import { comercialInfo } from './dataPage';


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
        this.props.save(values);
      }
    });
  }
  render() {
    const { customers, addData, editData, deleteData, cancelData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const fields = comercialInfo(this.props);
    const colummns = [
      {
        title: 'Nombre',
        key: 'name',
      },
      {
        title: 'Participacion en ventas',
        key: 'salesParticipation',
        type: 'number',
      },
    ];
    return (
      <div>
        <TableForm
          data={customers}
          colummns={colummns}
          addData={addData}
          editData={editData}
          deleteData={deleteData}
          cancelData={cancelData}
          loading={false}
        />
        <Form onSubmit={this.handleSubmit}>
          <DinamicForm
            getFieldDecorator={getFieldDecorator}
            content={fields}
          />
          <Button
            type="primary"
            htmlType="submit"
          >
            Enviar
          </Button>
        </Form>
      </div>
    );
  }
}
const ComercialForm = Form.create()(Comercial);

export default ComercialForm;
