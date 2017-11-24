import React, { Component } from 'react';
import { Table, Tooltip, Button, Input, Upload, Select } from 'antd';

const { Option } = Select;

const columns = [
  {
    title: 'Help',
    width: '20%',
    dataIndex: 'helpText',
    key: 'helpText',
    render: text => (
      <Tooltip placement="topRight" title={text}>
        <Button shape="circle" icon="question" />
      </Tooltip>
    ),
  },
  {
    title: 'Pregunta',
    width: '20%',
    dataIndex: 'wording',
    key: 'wording',
  },
  {
    title: 'Respuesta del proveedor',
    width: '20%',
    dataIndex: 'options',
    key: 'options',
    render: options => (
      <Select style={{ width: '100%' }}>
        {
          options.map(option => <Option key={option.id} value={option.id}>{option.wording}</Option>)
        }
      </Select>
    ),
  },
  {
    title: 'Comentario',
    width: '20%',
    dataIndex: 'idCriterion',
    key: 'idCriterion',
    render: () => <Input />,
  },
  {
    title: 'Soporte',
    width: '20%',
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
];

class Question extends Component {
  componentDidMount() {
    const { idDimension, idSurvey, getQuestionsByDimension } = this.props;
    getQuestionsByDimension(idSurvey, idDimension);
  }
  render() {
    const { criterions } = this.props;
    console.log(criterions);
    return (
      <div>
        {
          criterions.length > 0 ?

            criterions.map(criteria => (
              <div key={criteria.id}>
                <h4>{criteria.name}</h4>
                <Table
                  key={criteria.key}
                  pagination={false}
                  columns={columns}
                  dataSource={criteria.questions}
                />
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
