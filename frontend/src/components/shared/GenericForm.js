import React from 'react';
import { Form, notification } from 'antd';
import DinamicForm from '../shared/DinamicForm';

function Generic(props) {
  const {
    formData, submitMethod, validate, form, index, loadingModal,
  } = props;
  const { getFieldDecorator, setFields } = form;
  const template = formData(props);

  const openNotification = () => {
    notification.open({
      message: 'Operación exitosa',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitMethod) {
      if (validate) {
        form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            submitMethod(values, index, openNotification);
          }
        });
      } else {
        submitMethod(form.getFieldsValue(), index, openNotification);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <DinamicForm
        getFieldDecorator={getFieldDecorator}
        setFields={setFields}
        content={template}
        loadingModal={loadingModal}
      />
    </Form>
  );
}

const GenericForm = Form.create()(Generic);

export default GenericForm;
