import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import * as SurveyAdmonAction from '../../state/SurveyAdmon/action';
import SurveyAdmonForm from './SurveyAdmonForm';
import H1 from '../shared/H1';

class SurveyAdmonFormContainer extends Component {
  componentDidMount() {
    const { match: { params: { id = null } } } = this.props;
    if (id && typeof id === 'string') {
      this.props.getSurveyAdmon(id);
    } else {
      this.props.getAddSurveyAdmon();
    }
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
  editData: state.surveyAdmon.editData,
  dimension: state.surveyAdmon.dimension,
  criterion: state.surveyAdmon.criterion,
  SurveyAdmons: state.surveyAdmon.SurveyAdmons,
  items: state.surveyAdmon.items,
  options: state.surveyAdmon.options,
  loading: state.surveyAdmon.loading,
});

const mapDispatchToProps = {
  ...SurveyAdmonAction,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SurveyAdmonFormContainer));
