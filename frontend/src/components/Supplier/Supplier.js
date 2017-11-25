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
        content: <GeneralForm next={this.next} save={this.save} {...this.props} />,
      },
      {
        name: 'Informacion Comercial',
        content: <ComercialForm next={this.next} save={this.save} {...this.props} />,
      },
    ];
    const mapDimensions = dimensions.map((dimension) => {
      const { call, getQuestionsByDimension, saveAnswer } = this.props;
      const { id, idSurvey } = call;
      return {
        name: dimension.name,
        content: <Question
          key={dimension.id}
          idDimension={dimension.id}
          idSurvey={idSurvey}
          idCall={id}
          criterions={dimension.criterions}
          getQuestionsByDimension={getQuestionsByDimension}
          saveAnswer={saveAnswer}
        />,
      };
    });
    return steps.concat(mapDimensions);
  }
  save = (values) => {
    if (this.props.participateInCall) {
      // this.props.next();
      const { call, supplier } = { ...this.props };
      let newSupplier = { ...supplier };
      newSupplier = Object.assign(newSupplier, values);
      call.participateInCall = true;
      this.props.saveDataCallSupplier(call, newSupplier);
    } else {
      values.participateInCall = false;
      values.lockedByModification = true;
      this.props.saveDataCallBySupplier(Object.assign(this.props.call, values));
    }
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

