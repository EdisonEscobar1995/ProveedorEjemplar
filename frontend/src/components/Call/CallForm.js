import React, { PureComponent } from 'react';
import { Button, Spin } from 'antd';
import generalInfo from './dataForm';
import DinamicForm from '../shared/DinamicForm';

class CallForm extends PureComponent {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { loading, Form } = this.props;
    const { getFieldDecorator } = this.props.form;
    const fields = generalInfo(this.props.editData);

    return (
      <Spin spinning={loading}>
        <Form onSubmit={this.onSubmit}>
          <DinamicForm
            getFieldDecorator={getFieldDecorator}
            content={fields}
          />
          <Button type="primary" htmlType="submit">Guardar</Button>
        </Form>
      </Spin>
    );
  }
}

export default CallForm;
