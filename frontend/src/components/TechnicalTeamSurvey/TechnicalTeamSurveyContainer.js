import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from '../../state/TechnicalTeamSurvey/action';
import formData from './formData';
import GenericForm from '../shared/GenericForm';
import TechnicalTeamSurvey from './TechnicalTeamSurvey';
import H1 from '../shared/H1';

class TechnicalTeamSurveyContainer extends Component {
  componentDidMount() {
    this.props.getTechnicalTeamSurvey();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <H1
          text="Calificación comité técnico"
        />
        <GenericForm
          {...this.props}
          formData={formData}
        />
        <TechnicalTeamSurvey
          {...this.props}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.technicalTeamSurvey.data,
  loading: state.technicalTeamSurvey.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(TechnicalTeamSurveyContainer);
