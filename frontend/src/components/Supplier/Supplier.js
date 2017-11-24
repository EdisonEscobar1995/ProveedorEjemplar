import React, { Component } from 'react';
import { Steps, Spin, Button } from 'antd';
import GeneralForm from './GeneralForm';
import ComercialForm from './ComercialForm';
import Question from './Question';

const { Step } = Steps;

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
        name: 'Informacion General',
        content: <GeneralForm next={this.next} {...this.props} />,
      },
      {
        name: 'Informacion Comercial',
        content: <ComercialForm next={this.next} {...this.props} />,
      },
    ];
    const mapDimensions = dimensions.map(dimension => (
      {
        name: dimension.name,
        content: <Question
          idDimension={dimension.id}
          idSurvey={this.props.call.idSurvey}
          criterions={dimension.criterions}
          getQuestionsByDimension={this.props.getQuestionsByDimension}
        />,
      }
    ));
    return steps.concat(mapDimensions);
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
        <Steps progressDot current={current}>
          {steps.map(item => <Step key={item.name} title={item.name} />)}
        </Steps>
        {
          this.state.current < steps.length - 1
          &&
          <Button type="primary" onClick={() => this.next()}>Next</Button>
        }
        {
          this.state.current > 0
          &&
          <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
            Previous
          </Button>
        }
        <div>{steps[this.state.current].content}</div>
      </Spin>
    );
  }
}

export default Supplier;

