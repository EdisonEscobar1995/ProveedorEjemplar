import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from '../../state/EndedEvaluator/action';
import EndedEvaluator from './EndedEvaluator';
import H1 from '../shared/H1';

class EndedEvaluatorContainer extends Component {
  componentDidMount() {
    this.props.getEndedEvaluator();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <H1
          text="Seleccionar proveedores que pasarán a evaluación por parte del comité técnico"
        />
        <EndedEvaluator
          {...this.props}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.endedEvaluator.data,
  loading: state.endedEvaluator.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(EndedEvaluatorContainer);
