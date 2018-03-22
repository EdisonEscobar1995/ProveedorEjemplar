import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from '../../state/CallReport/action';
import formData from './formData';
import GenericForm from '../shared/GenericForm';
import CallReport from './CallReport';

class CallReportContainer extends Component {
  componentDidMount() {
    this.props.getParticipantsByYear();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <GenericForm
          {...this.props}
          formData={formData}
        />
        <CallReport
          {...this.props}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.callReport.data,
  loading: state.callReport.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(CallReportContainer);
