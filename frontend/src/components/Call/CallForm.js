import React, { PureComponent } from 'react';
import moment from 'moment';
import { Spin, notification } from 'antd';
import generalInfo from './dataForm';
import DinamicForm from '../shared/DinamicForm';

class CallForm extends PureComponent {
  openNotification = () => {
    notification.success({
      message: 'Operación exitosa',
      description: 'Documento guardado',
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { saveData, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (moment(values.dateToFinishCall).format('YYYY') === values.year) {
          const data = {
            id: values.id ? values.id : null,
            dateToFinishCall: moment(values.dateToFinishCall).format('YYYY/MM/DD'),
            deadlineToMakeSurvey: values.deadlineToMakeSurvey ? (values.deadlineToMakeSurvey).format('YYYY/MM/DD') : null,
            deadlineToMakeSurveyEvaluator:
            values.deadlineToMakeSurveyEvaluator ? moment(values.deadlineToMakeSurveyEvaluator).format('YYYY/MM/DD') : null,
            deadlineToMakeSurveyManagerTeam:
            values.deadlineToMakeSurveyManagerTeam ? moment(values.deadlineToMakeSurveyManagerTeam).format('YYYY/MM/DD') : null,
            deadlineToMakeSurveyTechnicalTeam:
            values.deadlineToMakeSurveyTechnicalTeam ? moment(values.deadlineToMakeSurveyTechnicalTeam).format('YYYY/MM/DD') : null,
            year: values.year,
          };
          saveData(data, this.openNotification);
        } else {
          form.setFields({
            dateToFinishCall: {
              errors: [new Error('La fecha de cierre de la convocatoria debe pertenecer al año seleccionado')],
            },
          });
        }
      }
    });
  };

  changeDateToFinishCall = (date) => {
    const { form, changeDisabled } = this.props;
    if (date && date.isValid) {
      changeDisabled();
      form.setFields({
        deadlineToMakeSurvey: {
          value: undefined,
        },
        deadlineToMakeSurveyTechnicalTeam: {
          value: undefined,
        },
        deadlineToMakeSurveyEvaluator: {
          value: undefined,
        },
        deadlineToMakeSurveyManagerTeam: {
          value: undefined,
        },
      });
    }
  }

  validateCallDate = (rule, value, cb) => {
    const { form } = this.props;
    const callYear = moment(form.getFieldValue('dateToFinishCall'));
    const dateChoose = moment(value);
    if (!value) {
      return cb();
    }
    if (callYear.diff(dateChoose, 'days') >= 0) {
      return cb();
    }
    return cb(true);
  }

  render() {
    const { loading, Form, disabled } = this.props;
    const { getFieldDecorator } = this.props.form;
    const fields =
      generalInfo(
        this.props.editData,
        this.changeDateToFinishCall,
        disabled,
        this.validateCallDate,
      );

    return (
      <Spin spinning={loading}>
        <Form onSubmit={this.handleSubmit}>
          <DinamicForm
            getFieldDecorator={getFieldDecorator}
            content={fields}
          />
        </Form>
      </Spin>
    );
  }
}

export default CallForm;
