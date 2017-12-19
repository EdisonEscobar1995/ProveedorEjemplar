import React, { Component } from 'react';
import { Table, Tooltip, Button, Input, Radio, Icon } from 'antd';
import styled from 'styled-components';
import Upload from '../shared/Upload';
import FormButtons from './FormButtons';
import ErrorTable from './ErrorTable';
import { baseUrl } from '../../utils/api';


const { TextArea } = Input;
const { Column } = Table;
const RadioGroup = Radio.Group;
const TableStyle = styled(Table)`
  .ant-table-body > table .ant-table-tbody > tr > td{
    word-break: break-word;
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
`;
const ParagraphStyle = styled.p`
  word-break: break-word;
  margin: ${props => props.theme.spaces.main} 0;
`;
const RadioStyle = styled(Radio) `
  white-space: normal;
  margin: 10px 0;
`;

class Question extends Component {
  componentDidMount() {
    const { idDimension, idSurvey, getQuestionsByDimension } = this.props;
    getQuestionsByDimension(idSurvey, idDimension);
  }
  onChange = (value, record, fieldName) => {
    if (value) {
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
        if (sendAnswer[fieldName]) {
          sendAnswer[fieldName].push(value);
        } else {
          sendAnswer[fieldName] = [value];
        }
      } else {
        sendAnswer[fieldName] = value;
      }
      saveAnswer(sendAnswer, idDimension, idCriterion);
    }
  }
  getAnswer = (record, fieldName) => {
    const actualAnswer = record.answer[0];
    let value;
    if (actualAnswer) {
      value = actualAnswer[fieldName];
    }
    return value;
  }
  getColumns = () => (
    [
      {
        title: 'Ayuda',
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
        title: 'Pregunta',
        width: '15%',
        dataIndex: 'wording',
        key: 'wording',
      },
      {
        title: 'Respuesta del proveedor',
        width: '30%',
        dataIndex: 'options',
        key: 'options',
        render: (options, record) => {
          let value;
          if (record.answer.length > 0) {
            value = record.answer[0].idOptionSupplier;
          }
          let { errors } = record;
          if (!errors) {
            errors = {};
          }
          let renderComponent;
          if (record.type === 'Cerrada') {
            renderComponent = (
              <RadioGroup
                disabled={this.props.disabled}
                value={value}
                onChange={e => this.onChange(e.target.value, record, 'idOptionSupplier')}
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
              this.props.disabled ?
                this.getAnswer(record, 'commentSupplier')
                :
                (
                  <TextArea
                    rows={10}
                    defaultValue={this.getAnswer(record, 'responseSupplier')}
                    onBlur={e => this.onChange(e.target.value, record, 'responseSupplier')}
                  />
                )
            );
          }
          return (
            <div>
              {
                renderComponent
              }
              <ErrorTable visible={errors.answers} text="Esta pregunta es obligatoria" />
            </div>
          );
        },
      },
      {
        title: 'Comentario',
        width: '30%',
        dataIndex: 'answer',
        key: 'commentSupplier',
        render: (text, record) =>
          (
            this.props.disabled ?
              this.getAnswer(record, 'commentSupplier')
              :
              <TextArea
                rows={10}
                defaultValue={this.getAnswer(record, 'commentSupplier')}
                onBlur={e => this.onChange(e.target.value, record, 'commentSupplier')}
              />
          ),
      },
      {
        title: 'Soporte',
        width: '20%',
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
                disabled={this.props.disabled}
                list={actualValue}
                multiple
                baseUrl={`${baseUrl}/Attachment?action=save`}
                uploadMaxFilesize={this.props.system.uploadMaxFilesize}
                uploadExtensions={this.props.system.uploadExtensions}
                onChange={(value, rowValue) => this.onChange(value, rowValue, 'attachment')}
                onRemove={this.onChange}
              />
              <ErrorTable visible={errors.attachments} text="Debe anexar un archivo" />
            </div>
          );
        },
      },
    ]
  )
  render() {
    const { criterions, system, disabled } = this.props;
    const columns = this.getColumns();
    let buttons = [];
    if (!disabled) {
      buttons = [
        {
          key: 1,
          text: 'Enviar',
          onClick: this.props.validateQuestions,
        },
      ];
    }
    return (
      <div>
        <ParagraphStyle>
          {
            system.inputPoll
          }
        </ParagraphStyle>
        {
          criterions.length > 0 ?
            criterions.map(criteria => (
              <div key={criteria.id}>
                <SectionStyle>
                  <Icon type="tag-o" />
                  <SubtitleStyle>{criteria.name}</SubtitleStyle>
                </SectionStyle>
                <TableStyle
                  key={criteria.key}
                  pagination={false}
                  dataSource={criteria.questions.filter(quiestion => quiestion.visible)}
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
            (<h3>No hay preguntas para esta dimension</h3>)
        }
        <FormButtons
          showConfirm
          messageConfirm="¿Está seguro de enviar la encuesta?"
          buttons={buttons}
        />
      </div>
    );
  }
}

export default Question;
