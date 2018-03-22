import React, { Component } from 'react';
import { Tabs, Spin, Progress } from 'antd';
import GeneralForm from './GeneralForm';
import Question from './Question';
import SurveyText from './SurveyText';
import validateFields from './validateFields';
import message from '../shared/message';
import Title from '../shared/Title';
import { ContentStyle, TabsStyle } from '../../utils/style';

const TabPane = Tabs.TabPane;

class Supplier extends Component {
  static formatSupplier(supplier) {
    const newSupplier = { ...supplier };
    newSupplier.principalCustomer.map((item) => {
      let number = parseInt(item.percentageOfParticipationInSales, 10);
      if (isNaN(number)) {
        number = -1;
      }
      item.percentageOfParticipationInSales = number;
      return item;
    });
    return newSupplier;
  }
  componentWillMount() {
    this.setState({
      current: 0,
    });
  }
  getSteps = () => {
    const dimensions = this.props.dimensions;
    const steps = [
      {
        content: (
          <GeneralForm
            ref={(form) => { this.generalForm = form; }}
            next={this.next}
            save={this.save}
            {...this.props}
          />
        ),
        stepContent: (
          <ContentStyle>
            <Title text="Survey.generalInfo" translate />
          </ContentStyle>
        ),
      },
    ];
    if (this.props.participateInCall === 'true') {
      const {
        loadedDimensions,
        loadingDimensions,
        loading,
        error,
      } = this.props;
      if (dimensions.length === 0 &&
        !loading && !loadingDimensions && !error && !loadedDimensions) {
        const { call, getDimensionsBySurvey } = this.props;
        const { idSurvey, id } = call;
        getDimensionsBySurvey(idSurvey, id);
      }
    }
    const mapDimensions = dimensions.map((dimension) => {
      const { call, saveAnswer, system, rules } = this.props;
      const { id, idSurvey } = call;
      return {
        name: dimension.name,
        content: <Question
          key={dimension.id}
          idDimension={dimension.id}
          idSurvey={idSurvey}
          idCall={id}
          system={system}
          criterions={dimension.criterions}
          saveAnswer={saveAnswer}
          rules={rules}
          validateQuestions={this.validateQuestions}
          next={this.next}
        />,
        stepContent: this.getProgress(dimension.id, dimension.name),
      };
    });
    return steps.concat(mapDimensions);
  }
  getProgress = (dimensionId, name) => {
    const percent = this.calculatePercent(dimensionId);
    const status = 'success';
    return (
      <div>
        <Progress
          strokeWidth={10}
          type="circle"
          percent={percent}
          status={status}
          width={38}
          format={value => (value === 0 ? '?' : `${value}%`)}
        />
        <Title text={name} />
      </div>
    );
  }
  getSupplierValues = (values) => {
    const { supplier } = { ...this.props };
    let newSupplier = { ...supplier };
    newSupplier = Object.assign(newSupplier, values);
    newSupplier = Supplier.formatSupplier(newSupplier);
    return newSupplier;
  }
  changePage = (index) => {
    const actual = this.state.current;
    const current = parseInt(index, 10);
    if (actual === 0 && !this.props.rules.supplier.readOnly) {
      this.generalForm.validateFieldsAndScroll(validateFields, (err) => {
        if (!err) {
          this.save(this.generalForm.getFieldsValue(), 'send');
          this.setState({ current });
        }
      });
    } else {
      this.setState({ current });
    }
  }
  save = (values, action) => {
    if (!this.props.changeIdCompanySize && this.props.participateInCall === 'true') {
      const newSupplier = this.getSupplierValues(values);
      this.props.saveDataCallSupplier(newSupplier);
      if (action === 'send') {
        this.next();
      }
    } else if (this.props.participateInCall === 'false') {
      values.participateInCall = 'false';
      this.props.saveDataCallBySupplier(Object.assign(this.props.call, values));
    } else {
      const newSupplier = this.getSupplierValues(values);
      this.props.saveDataCallSupplier(newSupplier);
    }
  }
  validateQuestions = () => {
    const dimesions = [...this.props.dimensions];
    let send = true;
    dimesions.forEach((dimension) => {
      if (dimension.criterions.length === 0) {
        send = send && false;
      } else {
        dimension.criterions.forEach((criteria) => {
          criteria.questions.forEach((question) => {
            let errors = {};
            if (question.visible && question.required) {
              if (this.isAnswered(question)) {
                if (question.requireAttachment) {
                  question.answer.forEach((answer) => {
                    if (answer.attachment) {
                      if (answer.attachment.length === 0) {
                        send = send && false;
                        errors = {
                          attachments: true,
                        };
                      }
                    } else {
                      send = send && false;
                      errors = {
                        attachments: true,
                      };
                    }
                  });
                }
              } else {
                send = send && false;
                errors = {
                  answers: true,
                };
                if (question.requireAttachment) {
                  errors.attachments = true;
                }
              }
            }
            question.errors = errors;
          });
        });
      }
    });

    if (send) {
      this.props.finishSurvey();
    } else {
      this.openNotification();
    }

    this.props.reloadDimensions(dimesions);
  }
  openNotification = () => {
    message({ text: 'Validation.verifyDimensions', type: 'info' });
  };

  calculatePercent = (idDimension) => {
    let totalQuestions = 0;
    let responsedQuestion = 0;
    let totalResponses = 0;
    let total;
    const actualDimension = this.props.dimensions.find(dimension => dimension.id === idDimension);
    if (actualDimension.criterions.length > 0) {
      actualDimension.criterions.forEach((criteria) => {
        criteria.questions.forEach((question) => {
          const isAnswered = this.isAnswered(question);
          if (question.visible && question.required) {
            totalQuestions += 1;
            if (isAnswered) {
              responsedQuestion += 1;
            }
          }
          if (isAnswered) {
            totalResponses += 1;
          }
        });
      });
      if (totalQuestions > 0) {
        total = (responsedQuestion * 100) / totalQuestions;
      } else if (totalResponses > 0) {
        total = 100;
      } else {
        total = 0;
      }
    } else {
      total = 0;
    }
    return Math.round(total);
  }

  isAnswered = (question) => {
    const { stateData, rules } = this.props;
    let optionFieldName = 'idOptionSupplier';
    let responseFieldName = 'responseSupplier';
    if ((stateData.shortName === 'NOT_STARTED_EVALUATOR' ||
    stateData.shortName === 'EVALUATOR') && rules.evaluator.show) {
      optionFieldName = 'idOptionEvaluator';
      responseFieldName = 'responseEvaluator';
    }
    return question.answer.length > 0 &&
    (question.answer[0][optionFieldName] || question.answer[0][responseFieldName]);
  };

  next = () => {
    window.scrollTo(0, 0);
    const { current } = this.state;
    const { dimensions } = this.props;
    let nextCurrent = current + 1;
    if (dimensions.length + 1 === current + 1) {
      nextCurrent = 0;
    }
    this.setState({ current: nextCurrent });
  }
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { loading, loadingDimensions } = this.props;
    const { current } = this.state;
    const steps = this.getSteps();
    return (
      <Spin spinning={loading}>
        <SurveyText />
        <TabsStyle
          tabBarExtraContent={<Spin spinning={loadingDimensions} />}
          activeKey={current.toString()}
          animated={false}
          onTabClick={this.changePage}
        >
          {steps.map((item, index) => {
            const key = index.toString();
            return (
              <TabPane tab={item.stepContent} key={key}>{item.content}</TabPane>
            );
          },
          )}
        </TabsStyle>
      </Spin>
    );
  }
}

export default Supplier;

