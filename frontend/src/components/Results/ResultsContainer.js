import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from '../../state/Results/action';
import formData from './formData';
import GenericForm from '../shared/GenericForm';

class ResultsContainer extends Component {
  componentDidMount() {
    this.props.getMasters();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <GenericForm
          {...this.props}
          formData={formData}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.results.data,
  loading: state.results.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(ResultsContainer);
