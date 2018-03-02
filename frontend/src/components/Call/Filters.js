import React from 'react';
import DinamicForm from '../shared/DinamicForm';
import filterData from './filterData';

function Filters(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.filterCalledSuppliers(props.form.getFieldsValue());
  };

  const { Form } = props;
  const { getFieldDecorator, setFields } = props.form;
  const template = filterData();

  return (
    <Form onSubmit={handleSubmit}>
      <DinamicForm
        getFieldDecorator={getFieldDecorator}
        setFields={setFields}
        content={template}
      />
    </Form>
  );
}

export default Filters;
