import React from 'react';
import DinamicForm from '../shared/DinamicForm';

function Filter(props) {
  const { Form, fieldsData, handleSubmit } = props;
  const { getFieldDecorator, setFields } = props.form;
  const fields = fieldsData(props);
  return (
    <Form onSubmit={handleSubmit}>
      <DinamicForm
        getFieldDecorator={getFieldDecorator}
        setFields={setFields}
        content={fields}
      />
    </Form>
  );
}

export default Filter;
