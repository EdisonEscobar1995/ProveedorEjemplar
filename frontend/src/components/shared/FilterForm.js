import React from 'react';
import DinamicForm from '../shared/DinamicForm';

function Filter(props) {
  const { getFields, Form } = props;
  const { getFieldDecorator, setFields } = props.form;
  const fields = getFields(props);
  return (
    <div>
      <Form>
        <DinamicForm
          getFieldDecorator={getFieldDecorator}
          setFields={setFields}
          content={fields}
        />
      </Form>
    </div>
  );
}

export default Filter;
