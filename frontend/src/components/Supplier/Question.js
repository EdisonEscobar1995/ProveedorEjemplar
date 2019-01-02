import React, { Component, Fragment } from 'react';
import { Table, Tooltip, Button, Input, Radio, Icon } from 'antd';
import styled from 'styled-components';
import Upload from '../shared/Upload';
import FormattedMessage from '../shared/FormattedMessage';
import SubTitle from '../shared/SubTitle';
import FormButtons from './FormButtons';
import ErrorTable from './ErrorTable';
import { baseUrl } from '../../utils/api';
import message from '../shared/message';

const { TextArea } = Input;
const { Column } = Table;
const RadioGroup = Radio.Group;
const TableStyle = styled(Table)`
  .ant-table-body > table .ant-table-tbody > tr > td{
    word-break: inherit;
  }
`;

const SubtitleStyle = styled.h4`
  display: inline-block;
  color: inherit;
  margin: 0 10px;
`;
const SectionStyle = styled.div`
  padding: 15px;
  opacity: 0.6;
  background: ${props => props.theme.color.primary};
  color: ${props => props.theme.color.normal};
  display: flex;
  justify-content: space-between;
`;
const RadioStyle = styled(Radio) `
  white-space: normal;
  margin: 10px 0;
`;

class Question extends Component {
  onChange = (value, record, fieldName, action) => {
    const { id, answer, idCriterion } = record;
    const { idDimension, idSurvey, idCall, saveAnswer } = this.props;
    let actualAnswer = {};
    if (answer.length > 0) {
      actualAnswer = answer.find(item => item.idQuestion === id);
    }
    let sendAnswer = {
      idSupplierByCall: idCall,
      idSurvey,
      idQuestion: id,
    };
    const copy = { ...actualAnswer };
    sendAnswer = Object.assign(copy, sendAnswer);
    if (fieldName === 'attachment') {
      if (action === 'delete') {
        sendAnswer[fieldName] = sendAnswer[fieldName].filter(attach => attach.id !== value);
      } else {
        sendAnswer[fieldName] = value;
      }
    } else {
      sendAnswer[fieldName] = value;
    }
    saveAnswer(sendAnswer, idDimension, idCriterion);
  }
  getAnswer = (record, fieldName) => {
    const actualAnswer = record.answer[0];
    let value;
    if (actualAnswer) {
      value = actualAnswer[fieldName];
    }
    return value;
  }
  getAnswerComponent = (options, record, rol) => {
    const { rules } = this.props;
    let disabled;
    if (record.disabled) {
      disabled = true;
    } else {
      disabled = rol === 'SUPPLIER' ? rules.supplier.readOnly : rules.evaluator.readOnly;
    }
    const optionFieldName = rol === 'SUPPLIER' ? 'idOptionSupplier' : 'idOptionEvaluator';
    const responseFieldName = rol === 'SUPPLIER' ? 'responseSupplier' : 'responseEvaluator';
    let { errors } = record;
    if (!errors) {
      errors = {};
    }
    let value;
    if (record.answer.length > 0) {
      value = record.answer[0][optionFieldName];
    }
    let renderComponent;
    if (record.type === 'Cerrada') {
      renderComponent = (
        <RadioGroup
          disabled={disabled}
          value={value}
          onChange={(e) => {
            if (e.target.value) {
              this.onChange(e.target.value, record, optionFieldName);
            }
          }}
        >
          {
            options.map(option => (
              <RadioStyle
                key={option.id}
                value={option.id}
              >
                {option.wording}
              </RadioStyle>
            ),
            )
          }
        </RadioGroup>
      );
    } else {
      renderComponent = (
        disabled ?
          this.getAnswer(record, responseFieldName)
          :
          (
            <TextArea
              rows={10}
              defaultValue={this.getAnswer(record, responseFieldName)}
              onBlur={e => this.onChange(e.target.value, record, responseFieldName)}
            />
          )
      );
    }
    return (
      <div>
        {
          renderComponent
        }
        <ErrorTable visible={errors.answers} text="Survey.requiredQuestion" />
      </div>
    );
  }
  getCommentComponent = (text, record, rol) => {
    const { rules } = this.props;
    let disabled;
    if (record.disabled) {
      disabled = true;
    } else {
      disabled = rol === 'SUPPLIER' ? rules.supplier.readOnly : rules.evaluator.readOnly;
    }
    const fieldName = rol === 'SUPPLIER' ? 'commentSupplier' : 'commentEvaluator';
    return (
      disabled ?
        this.getAnswer(record, fieldName)
        :
        <TextArea
          rows={10}
          defaultValue={this.getAnswer(record, fieldName)}
          onBlur={e => this.onChange(e.target.value, record, fieldName)}
        />
    );
  }
  getColumns = () => {
    const { rules, stateData } = this.props;
    let columns = [
      {
        title: <FormattedMessage id="Table.help" />,
        width: '5%',
        dataIndex: 'helpText',
        key: 'helpText',
        render: text => (
          text ?
            <Tooltip placement="topRight" title={text}>
              <Button type="primary" shape="circle" icon="question" />
            </Tooltip>
            :
            ''
        ),
      },
      {
        title: <FormattedMessage id="Table.question" />,
        width: '15%',
        dataIndex: 'wording',
        key: 'wording',
      },
      {
        title: <FormattedMessage id="Table.providerAnswer" />,
        width: rules.evaluator.show ? '15%' : '30%',
        dataIndex: 'options',
        key: 'options',
        render: (options, record) => {
          if (rules.evaluator.show) {
            let answer = '';
            if (record.answer.length > 0) {
              if (record.type === 'Cerrada') {
                if (record.answer[0].idOptionSupplier !== '') {
                  answer = options.find(option => (
                    option.id === record.answer[0].idOptionSupplier
                  )).wording;
                }
              } else {
                answer = record.answer[0].responseSupplier;
              }
            }
            return answer;
          }
          return this.getAnswerComponent(options, record, 'SUPPLIER');
        },
      },
      {
        title: <FormattedMessage id="Table.providerComment" />,
        width: rules.evaluator.show ? '10%' : '30%',
        dataIndex: 'answer',
        key: 'commentSupplier',
        render: (text, record) => {
          if (rules.evaluator.show) {
            let comment = '';
            if (record.answer.length > 0) {
              comment = record.answer[0].commentSupplier;
            }
            if (comment !== '') {
              return (
                <Tooltip placement="top" title={comment}>
                  <Button
                    shape="circle"
                    icon="message"
                  />
                </Tooltip>
              );
            }
            return null;
          }
          return this.getCommentComponent(text, record, 'SUPPLIER');
        },
      },
      {
        title: <FormattedMessage id="Table.support" />,
        width: rules.evaluator.show ? '15%' : '20%',
        dataIndex: 'answer',
        key: 'attachment',
        render: (text, record) => {
          let actualValue = this.getAnswer(record, 'attachment');
          if (!actualValue) {
            actualValue = [];
          }
          let { errors } = record;
          if (!errors) {
            errors = {};
          }
          return (
            <div>
              <Upload
                datakey={record}
                disabled={this.props.rules.supplier.readOnly}
                list={actualValue}
                baseUrl={`${baseUrl}/Attachment?action=save`}
                uploadMaxFilesize={this.props.system.uploadMaxFilesize}
                uploadExtensions={this.props.system.uploadExtensions}
                onChange={(value, rowValue) => {
                  if (value) {
                    this.onChange(value, rowValue, 'attachment');
                  }
                }}
                onRemove={(value, rowValue) => {
                  if (value) {
                    this.onChange(value, rowValue, 'attachment', 'delete');
                  }
                }}
              />
              <ErrorTable visible={errors.attachments} text="Survey.requiredAttachment" />
            </div>
          );
        },
      },
    ];
    if (stateData.shortName === 'NOT_STARTED' || stateData.shortName === 'SUPPLIER') {
      columns.splice(2, 0, {
        title: <FormattedMessage id="Table.previousAnswer" />,
        width: '15%',
        dataIndex: 'previousAnswer',
        key: 'previousAnswer',
        render: (options, record) => {
          if (record.answer.length > 0) {
            return record.answer[0].previousAnswer;
          }
          return null;
        },
      });
    }
    if (rules.evaluator.show) {
      columns = columns.concat({
        title: <FormattedMessage id="Table.evaluatorAnswer" />,
        width: '20%',
        dataIndex: 'options',
        key: 'optionsEvaluator',
        render: (options, record) => this.getAnswerComponent(options, record, 'EVALUATOR'),
      },
      {
        title: <FormattedMessage id="Table.evaluatorComment" />,
        width: '20%',
        dataIndex: 'answer',
        key: 'commentEvaluator',
        render: (text, record) => this.getCommentComponent(text, record, 'EVALUATOR'),
      });
    }
    return columns;
  }
  openNotification = () => {
    message({ text: 'Validation.verifyDimensions', type: 'info' });
  };
  render() {
    const { criterions, rules, callData, next } = this.props;
    const disabled = rules.supplier.readOnly && rules.evaluator.readOnly;
    const columns = this.getColumns();

    const date = new Date();
    let month = `0${date.getMonth() + 1}`;
    month = month.substring(month.length - 2, month.length);
    let day = `0${date.getDate()}`;
    day = day.substring(day.length - 2, day.length);
    const today = parseFloat(`${date.getFullYear()}${month}${day}`, 10);
    let { deadlineToMakeSurveyManagerTeam } = callData;
    deadlineToMakeSurveyManagerTeam = parseFloat(deadlineToMakeSurveyManagerTeam.replace(/\//g, ''), 10);

    let buttons = [];
    if (!disabled) {
      buttons = [
        {
          key: 3,
          text: 'Button.continue',
          buttoncolor: 'buttonSecond',
          onClick: next,
        },
        {
          key: 1,
          text: 'Button.send',
          buttoncolor: 'buttonThird',
          onClick: () => this.props.validateQuestions(this.openNotification),
          showConfirm: true,
          messageConfirm: 'Survey.confirm',
        },
      ];
    }
    return (
      <div style={{ width: '90vw' }}>
        {
          criterions.length > 0 ?
            criterions.map(criteria => (
              <div key={criteria.id}>
                <SectionStyle>
                  <div>
                    <Icon type="tag-o" />
                    <SubtitleStyle>{criteria.name}</SubtitleStyle>
                  </div>
                  <div>
                    {
                      today >= deadlineToMakeSurveyManagerTeam &&
                      <Fragment>
                        <FormattedMessage id="Table.criteriaScore" />
                        {
                          criteria.score && `: ${criteria.score}%`
                        }
                      </Fragment>
                    }
                  </div>
                </SectionStyle>
                <TableStyle
                  key={criteria.key}
                  pagination={false}
                  dataSource={criteria.questions.filter(quiestion => quiestion.visible)}
                  size="middle"
                >
                  {
                    columns.map(column => (
                      (
                        <Column
                          width={column.width}
                          title={column.title}
                          key={column.key}
                          dataIndex={column.dataIndex}
                          render={column.render}
                        />
                      )
                    ))
                  }
                </TableStyle>
              </div>
            ))
            :
            (
              <SubTitle text="Table.noFound" />
            )
        }
        <FormButtons
          buttons={buttons}
        />
      </div>
    );
  }
}

export default Question;
