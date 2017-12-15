import React, { Component } from 'react';
import { Tabs, Spin, Progress, notification } from 'antd';
import styled from 'styled-components';
import GeneralForm from './GeneralForm';
import ComercialForm from './ComercialForm';
import Question from './Question';
import SurveyText from './SurveyText';

const TabPane = Tabs.TabPane;

const TitleStyle = styled.span`
  margin-left: 10px;
`;

const ContentStyle = styled.div`
  padding: 7px 0 12px 0;
`;

const TabsStyle = styled(Tabs)`
  .ant-tabs-bar {
    .ant-tabs-tab{
      margin-right: 20px;
      background-color: ${props => props.theme.color.back};
      color: ${props => props.theme.color.info};
      &:before {
        content: " ";
        width: 0;
        height: 0;
        left: -18px;
        border-left: 18px solid transparent;
        border-top: 28px solid ${props => props.theme.color.back};
        border-bottom: 28px solid ${props => props.theme.color.back};
        position: absolute;
        top: 0;
      }
      &:after {
        content: " ";
        width: 0;
        right: -18px;
        height: 0;
        border-left: 18px solid ${props => props.theme.color.back};
        border-top: 28px solid transparent;
        border-bottom: 28px solid transparent;
        position: absolute;
        top: 0;
      }
    }
    .ant-tabs-tab-active{
      background-color: ${props => props.theme.color.primary};
      color: ${props => props.theme.color.normal};
      &:before {
        content: " ";
        width: 0;
        height: 0;
        left: -18px;
        border-left: 18px solid transparent;
        border-top: 28px solid ${props => props.theme.color.primary};
        border-bottom: 28px solid ${props => props.theme.color.primary};
        position: absolute;
        top: 0;
      }
      &:after {
        content: " ";
        width: 0;
        right: -18px;
        height: 0;
        border-left: 18px solid ${props => props.theme.color.primary};
        border-top: 28px solid transparent;
        border-bottom: 28px solid transparent;
        position: absolute;
        top: 0;
      }
    }
  }
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
        stepContent: <ContentStyle>Información General</ContentStyle>,
      },
    ];
    if (this.props.participateInCall === 'true') {
      steps.push(
        {
          name: 'Información Comercial',
          content: <ComercialForm next={this.next} save={this.save} {...this.props} />,
          stepContent: <ContentStyle>Información Comercial</ContentStyle>,
        },
      );
    }
    const mapDimensions = dimensions.map((dimension) => {
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
        stepContent: this.getProgress(dimension.id, dimension.name),
      };
    });
    return steps.concat(mapDimensions);
  }
  getProgress = (dimensionId, name) => {
    const percent = this.calculatePercent(dimensionId);
    let status = 'exception';
    if (percent === 100) {
      status = 'success';
    } else if (percent > 49) {
      status = 'active';
    }
    return (
      <div>
        <Progress
          type="circle"
          percent={percent}
          status={status}
          width={40}
          format={value => (value === 0 ? '?' : value)}
        />
        <TitleStyle>{name}</TitleStyle>
      </div>
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
      this.props.saveDataCallBySupplier(Object.assign(this.props.call, values));
    } else {
      const { call } = { ...this.props };
      const newSupplier = this.getSupplierValues(values);
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
    let totalResponses = 0;
    let total;
    const actualDimension = this.props.dimensions.find(dimension => dimension.id === idDimension);
    if (actualDimension.criterions.length > 0) {
      actualDimension.criterions.forEach((criteria) => {
        criteria.questions.forEach((question) => {
          const isAnswered = question.answer.length > 0;
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
        <TabsStyle defaultActiveKey={current.toString()} animated={false}>
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

