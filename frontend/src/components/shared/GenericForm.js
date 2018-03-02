import React from 'react';
import { Form } from 'antd';
import DinamicForm from '../shared/DinamicForm';

function Generic(props) {
  const { formData, submitMethod, validate, form, index } = props;
  const { getFieldDecorator, setFields } = form;
  const template = formData(props);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitMethod) {
      if (validate) {
        form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            submitMethod(values, index);
          }
        });
      } else {
        submitMethod(form.getFieldsValue(), index);
      }
    }
  };

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

const GenericForm = Form.create()(Generic);

export default GenericForm;
