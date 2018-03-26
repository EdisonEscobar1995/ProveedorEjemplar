import React from 'react';
import { Form, notification } from 'antd';
import DinamicForm from '../shared/DinamicForm';

function Generic(props) {
  const {
    formData, submitMethod, validate, form, remoteId, loadingModal,
  } = props;
  const { getFieldDecorator, setFields } = form;
  const template = formData(props);

  const openNotification = () => {
    notification.success({
      message: 'Operación exitosa',
      description: 'Documento guardado',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitMethod) {
      if (validate) {
        form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            submitMethod(values, remoteId, openNotification);
          }
        });
      } else {
        submitMethod(form.getFieldsValue(), remoteId, openNotification);
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
        dontFormatMessage
      />
    </Form>
  );
}

const GenericForm = Form.create()(Generic);

export default GenericForm;
