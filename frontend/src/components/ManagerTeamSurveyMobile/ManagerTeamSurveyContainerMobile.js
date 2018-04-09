import React, { Component } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../state/ManagerTeamSurvey/action';
import ManagerTeamSurveyMobile from './ManagerTeamSurveyMobile';
import formData from './formData';
import GenericForm from '../shared/GenericForm';

const H3 = styled.h3`
  color: ${props => props.theme.color.primary};
  margin-bottom: ${props => props.theme.spaces.main};
  font-weight: bold;
  text-align: center;
`;

const Linea = styled.div`
  border: 1px solid #37907c7a;
`;

class ManagerTeamSurveyMobileContainer extends Component {
  componentDidMount() {
    this.props.getManagerTeamSurvey();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <H3>CALIFICACIÓN COMITÉ GERENCIAL</H3>
        <Linea />
        <GenericForm
          {...this.props}
          formData={formData}
        />
        <ManagerTeamSurveyMobile
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
)(ManagerTeamSurveyMobileContainer);
