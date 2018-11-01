import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Card } from 'antd';
import styled from 'styled-components';
import * as actions from '../../state/Results/action';
import formData from './formData';
import GenericForm from '../shared/GenericForm';

const ProgressBar = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  margin: 5px 0;
  
  .barBox {
    position: relative;
    width: 100%;
  }

  .percent {
    flex-basis: 50px;
    text-align: right;
    padding-right: 10px;
    align-self: center;
  }

  .barText{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;
  }

  .bar {
    position: absolute;
    height: 40px;
    align-items: center;
  }

  .barLight {
    width: 100%;
  }
  
  .barOddLight {
    background: #f8e8f0;
  }

  .barOddDark {
    background: #e8c0c8;
  }

  .barEvenLight {
    background: #f0f8f8;
  }

  .barEvenDark {
    background: #c8e0e8;
  }
`;

class ResultsContainer extends Component {
  componentDidMount() {
    this.props.getMasters();
  }

  handleResults = (values) => {
    this.props.getManagerReport(values);
  };

  render() {
    const { questions } = this.props;
    return (
      <Spin spinning={this.props.loading}>
        <GenericForm
          {...this.props}
          formData={formData}
          submitMethod={this.handleResults}
          validate
        />
        <div style={{ marginTop: 20 }}>
          {questions && questions.map((question, questionIndex) => (
            <Card key={question.id} style={{ padding: 20 }}>
              <p><strong>{question.wording}</strong></p>
              <p>{`${parseInt(question.answersCount, 10)} de ${question.suppliersCount} personas respondieron a esta pregunta`}</p>
              {question.options.map(option => (
                <ProgressBar key={option.id}>
                  <div className="percent">{option.percent}%</div>
                  <div className="barBox">
                    <div className={`bar barLight ${questionIndex % 2 === 0 ? 'barOddLight' : 'barEvenLight'}`} />
                    <div className={`bar ${questionIndex % 2 === 0 ? 'barOddDark' : 'barEvenDark'}`} style={{ width: `${option.percent}%` }} />
                    <div className="bar barText">
                      <span>{option.name}</span>
                      <span>{`${option.count} respuesta${option.count === 1 ? '' : 's'}`}</span>
                    </div>
                  </div>
                </ProgressBar>
              ))}
            </Card>
          ))}
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.results.data,
  questions: state.results.questions,
  loading: state.results.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(ResultsContainer);
