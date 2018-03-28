import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from '../../state/ManagerTeamSurvey/action';
import formData from './formData';
import GenericForm from '../shared/GenericForm';
import ManagerTeamSurvey from './ManagerTeamSurvey';
import H1 from '../shared/H1';

class ManagerTeamSurveyContainer extends Component {
  componentDidMount() {
    this.props.getManagerTeamSurvey();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <H1
          text="Calificación comité gerencial"
        />
        <GenericForm
          {...this.props}
          formData={formData}
        />
        <ManagerTeamSurvey
          {...this.props}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.managerTeamSurvey.data,
  loading: state.managerTeamSurvey.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(ManagerTeamSurveyContainer);
