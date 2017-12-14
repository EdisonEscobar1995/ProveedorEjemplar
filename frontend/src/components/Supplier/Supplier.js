import React, { Component } from 'react';
import { Steps, Spin, Progress, notification } from 'antd';
import styled from 'styled-components';
import GeneralForm from './GeneralForm';
import ComercialForm from './ComercialForm';
import Question from './Question';
import StepLink from './StepLink';
import SurveyText from './SurveyText';

const { Step } = Steps;

const StepCustomStyle = styled.span`
  padding: 0px 15px;
  background: ${props => props.theme.color.primary};
  border-radius: 50%;
`;

class Supplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  getSteps = (dimensions) => {
    const steps = [
      {
        name: 'Información General',
        content: <GeneralForm next={this.next} save={this.save} {...this.props} />,
        stepContent: (
          <StepLink onClick={() => this.changePage(0)}>
            <StepCustomStyle />
          </StepLink>
        ),
      },
    ];
    if (this.props.participateInCall === 'true') {
      steps.push(
        {
          name: 'Información Comercial',
          content: <ComercialForm next={this.next} save={this.save} {...this.props} />,
          stepContent: (
            <StepLink onClick={() => this.changePage(1)}>
              <StepCustomStyle />
            </StepLink>
          ),
        },
      );
    }
    const mapDimensions = dimensions.map((dimension, index) => {
      const { call, getQuestionsByDimension, saveAnswer, system, readOnly } = this.props;
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
          getQuestionsByDimension={getQuestionsByDimension}
          saveAnswer={saveAnswer}
          disabled={readOnly}
          validateQuestions={this.validateQuestions}
        />,
        stepContent: this.getProgress(dimension.id, index),
      };
    });
    return steps.concat(mapDimensions);
  }
  getProgress = (dimensionId, index) => {
    const percent = this.calculatePercent(dimensionId);
    let status = 'exception';
    if (percent === 100) {
      status = 'success';
    } else if (percent > 49) {
      status = 'active';
    }
    return (
      <StepLink onClick={() => this.changePage(index + 2)}>
        <Progress
          type="circle"
          percent={percent}
          status={status}
          width={40}
          format={value => (value === 0 ? '?' : value)}
        />
      </StepLink>
    );
  }
  getSupplierValues = (values) => {
    const { supplier } = { ...this.props };
    let newSupplier = { ...supplier };
    newSupplier = Object.assign(newSupplier, values);
    return newSupplier;
  }
  changePage = (index) => {
    const current = index;
    this.setState({ current });
  }
  save = (values, action) => {
    if (!this.props.changeIdCompanySize && this.props.participateInCall === 'true') {
      const { call } = { ...this.props };
      const newSupplier = this.getSupplierValues(values);
      call.participateInCall = 'true';
      this.props.saveDataCallSupplier(call, newSupplier);
      if (action === 'send') {
        this.next();
      }
    } else if (this.props.participateInCall === 'false') {
      values.participateInCall = 'false';
      values.lockedByModification = true;
      this.props.saveDataCallBySupplier(Object.assign(this.props.call, values));
    } else {
      const { call } = { ...this.props };
      const newSupplier = this.getSupplierValues(values);
      call.lockedByModification = true;
      call.participateInCall = 'true';
      this.props.saveDataCallSupplier(call, newSupplier);
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
              if (question.answer.length > 0) {
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
    notification.open({
      message: 'Alerta',
      description: 'Aun tiene dimensiones sin diligenciar',
    });
  };
  calculatePercent = (idDimension) => {
    let totalQuestions = 0;
    let responsedQuestion = 0;
    let total;
    const actualDimension = this.props.dimensions.find(dimension => dimension.id === idDimension);
    if (actualDimension.criterions.length > 0) {
      actualDimension.criterions.forEach((criteria) => {
        criteria.questions.forEach((question) => {
          if (question.required) {
            totalQuestions += 1;
            if (question.answer.length > 0) {
              responsedQuestion += 1;
            }
          }
        });
      });
      if (totalQuestions !== 0) {
        total = (responsedQuestion * 100) / totalQuestions;
      } else {
        total = 100;
      }
    } else {
      total = 0;
    }
    return Math.round(total);
  }
  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { loading, dimensions } = this.props;
    const { current } = this.state;
    const steps = this.getSteps(dimensions);
    return (
      <Spin spinning={loading}>
        <SurveyText />
        <Steps current={current}>
          {steps.map(item =>
            (
              <Step key={item.name} icon={item.stepContent} title={item.name} />
            ),
          )}
        </Steps>
        <div>{steps[this.state.current].content}</div>
      </Spin>
    );
  }
}

export default Supplier;

