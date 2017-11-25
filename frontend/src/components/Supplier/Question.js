import React, { Component } from 'react';
import { Table, Tooltip, Button, Input, Upload, Radio } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;
const { Column } = Table;

const SubtitleStyle = styled.h4`
  color: ${props => props.theme.color.info};
  padding: 15px 0;
  border-top: 1px ${props => props.theme.color.info} solid;
`;
const RadioStyle = styled(Radio)`
  white-space: normal;
  margin: 10px 0;
`;
const ColumnStyle = styled(Column)`
  vertical-align: top;
`;

const RadioGroup = Radio.Group;

class Question extends Component {
  componentDidMount() {
    const { idDimension, idSurvey, getQuestionsByDimension } = this.props;
    getQuestionsByDimension(idSurvey, idDimension);
  }
  onChange = (e, record) => {
    const idOptionSupplier = e.target.value;
    const { id, answer, idCriterion } = record; // idquestion
    const { idDimension, idSurvey, idCall, saveAnswer } = this.props;
    let actualAnswer = {};
    if (answer.length > 0) {
      actualAnswer = answer.filter(item => item.idQuestion === id)[0];
    }
    let sendAnswer = {
      idSupplierByCall: idCall,
      idSurvey,
      idQuestion: id,
      idOptionSupplier,
    };
    sendAnswer = Object.assign(actualAnswer, sendAnswer);
    saveAnswer(sendAnswer, idDimension, idCriterion);
  }
  getColumns = () => (
    [
      {
        title: 'Help',
        width: '5%',
        dataIndex: 'helpText',
        key: 'helpText',
        render: text => (
          <Tooltip placement="topRight" title={text}>
            <Button type="primary" shape="circle" icon="question" />
          </Tooltip>
        ),
      },
      {
        title: 'Pregunta',
        width: '50%',
        dataIndex: 'wording',
        key: 'wording',
      },
      {
        title: 'Respuesta del proveedor',
        width: '20%',
        dataIndex: 'options',
        key: 'options',
        render: (options, record) => {
          let value;
          if (record.answer.length > 0) {
            value = record.answer[0].idOptionSupplier;
          }
          return (<RadioGroup
            value={value}
            onChange={e => this.onChange(e, record)}
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
          </RadioGroup>);
        },
      },
      {
        title: 'Comentario',
        width: '20%',
        dataIndex: 'idCriterion',
        key: 'idCriterion',
        render: () => <TextArea />,
      },
      {
        title: 'Soporte',
        width: '5%',
        dataIndex: 'idDimension',
        key: 'idDimension',
        render: () => (
          <Upload>
            <a>
              Anexar
            </a>
          </Upload>
        ),
      },
    ]
  )
  render() {
    const { criterions } = this.props;
    const columns = this.getColumns();
    return (
      <div>
        {
          criterions.length > 0 ?

            criterions.map(criteria => (
              <div key={criteria.id}>
                <SubtitleStyle>{criteria.name}</SubtitleStyle>
                <Table
                  key={criteria.key}
                  pagination={false}
                  dataSource={criteria.questions}
                >
                  {
                    columns.map(column => (
                      (
                        <ColumnStyle
                          width={column.width}
                          title={column.title}
                          key={column.key}
                          dataIndex={column.dataIndex}
                          render={column.render}
                        />
                      )
                    ))
                  }
                </Table>
              </div>
            ))
            :
            (<h3>No hay preguntas para esta dimension</h3>)
        }

      </div>
    );
  }
}

export default Question;
