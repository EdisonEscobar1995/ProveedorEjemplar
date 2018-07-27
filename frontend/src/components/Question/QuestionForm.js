import React, { Component } from 'react';
import { Spin, notification, Form } from 'antd';
import generalInfo from './dataForm';
import DinamicForm from '../shared/DinamicForm';

class QuestionForm extends Component {
  openNotification = () => {
    notification.success({
      message: 'Operación exitosa',
      description: 'Documento guardado',
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { saveData, form } = this.props;
    const This = this;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        saveData(values, This.openNotification);
      }
    });
  };

  render() {
    const { loading } = this.props;
    const { getFieldDecorator, setFields } = this.props.form;
    const fields = generalInfo({ ...this.props });
    return (
      <Spin spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <DinamicForm
            getFieldDecorator={getFieldDecorator}
            setFields={setFields}
            content={fields}
            dontFormatMessage
          />
        </Form>
      </Spin>
    );
  }
}

export default Form.create()(QuestionForm);
