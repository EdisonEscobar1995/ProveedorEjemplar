import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import * as SurveyAdmonAction from '../../state/SurveyAdmon/action';
import SurveyAdmonForm from './SurveyAdmonForm';
import H1 from '../shared/H1';

class SurveyAdmonFormContainer extends Component {
  componentDidMount() {
    this.props.getAllDataSurveyAdmon();
  }

  render() {
    const { loading } = this.props;
    if (loading === false) {
      return (
        <Spin spinning={loading}>
          <H1
            text="ADMINISTRAR ENCUESTA"
          />
          <SurveyAdmonForm
            {...this.props}
          />
        </Spin>
      );
    }
    return (
      <Spin spinning={loading}>
        <H1
          text="ADMINISTRAR ENCUESTA"
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  supply: state.surveyAdmon.supply,
  companySize: state.surveyAdmon.companySize,
  loading: state.surveyAdmon.loading,
});

const mapDispatchToProps = {
  ...SurveyAdmonAction,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurveyAdmonFormContainer));
