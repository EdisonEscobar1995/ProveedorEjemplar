import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from '../../state/Results/action';
import formData from './formData';
import GenericForm from '../shared/GenericForm';
import { SUPPLIER_AND_EVALUATOR, TECHNICAL_AND_MANAGER } from '../../utils/const';
import exportSupplierAndEvaluator from './exportSupplierAndEvaluator';
import exportTechnicalAndManager from './exportTechnicalAndManager';

class ResultsContainer extends Component {
  componentDidMount() {
    this.props.getMasters();
  }

  handleResults = (values) => {
    if (values.type === SUPPLIER_AND_EVALUATOR) {
      this.props.getResults(values, exportSupplierAndEvaluator);
    } else if (values.type === TECHNICAL_AND_MANAGER) {
      this.props.getResults(values, exportTechnicalAndManager);
    }
  };

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <GenericForm
          {...this.props}
          formData={formData}
          submitMethod={this.handleResults}
          validate
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.results.data,
  type: state.results.type,
  loading: state.results.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(ResultsContainer);
