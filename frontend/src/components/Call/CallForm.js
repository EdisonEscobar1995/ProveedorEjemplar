import React, { PureComponent } from 'react';
import { Form, Spin } from 'antd';
import generalInfo from './dataForm';
import DinamicForm from '../shared/DinamicForm';

class CallForm extends PureComponent {
  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const fields = generalInfo(this.props.editData);

    return (
      <Spin spinning={loading}>
        <Form>
          <DinamicForm
            getFieldDecorator={getFieldDecorator}
            content={fields}
          />
        </Form>
      </Spin>
    );
  }
}

export default Form.create()(CallForm);
