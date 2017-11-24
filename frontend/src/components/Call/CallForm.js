import React from 'react';
import { Form } from 'antd';
import generalInfo from './dataForm';
import DinamicForm from '../shared/DinamicForm';

function CallForm(props) {
  const { getFieldDecorator } = props.form;
  const fields = generalInfo(props);

  return (
    <Form>
      <DinamicForm
        getFieldDecorator={getFieldDecorator}
        content={fields}
      />
    </Form>
  );
}

export default Form.create()(CallForm);
