import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from '../../state/Surveys/action';
import formData from './formData';
import GenericForm from '../shared/GenericForm';
import Surveys from './Surveys';

class SurveysContainer extends Component {
  componentDidMount() {
    this.props.getSurveys();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <GenericForm
          {...this.props}
          formData={formData}
        />
        <Surveys
          {...this.props}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.surveys.data,
  loading: state.surveys.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(SurveysContainer);
