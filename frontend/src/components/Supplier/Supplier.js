import React, { Component } from 'react';
import { Steps, Spin, Button } from 'antd';
import GeneralForm from './GeneralForm';
import ComercialForm from './ComercialForm';

const { Step } = Steps;

class Supplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
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
    const { loading } = this.props;
    const { current } = this.state;
    const steps = [
      {
        title: 'Informacion General',
        content: <GeneralForm next={this.next} {...this.props} />,
      },
      {
        title: 'Informacion Comercial',
        content: <ComercialForm next={this.next} />,
      },
      {
        title: 'Investigacion, desarrollo e innovacion',
        content: <h1>Investigacion, desarrollo e innovacion</h1>,
      },
      {
        title: 'Principios de abastecimiento sostenioble',
        content: <h1>Principios de abastecimiento sostenioble</h1>,
      },
    ];
    return (
      <Spin spinning={loading}>
        <Steps progressDot current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
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

