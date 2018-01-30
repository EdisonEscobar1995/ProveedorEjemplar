import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Form } from 'antd';
import * as actions from '../../state/CallReport/action';
import Filters from './Filters';
import CallReport from './CallReport';

const FormFiltersHoc = Form.create()(Filters);

const participateInCall = (value) => {
  switch (value) {
    case 'true':
      return 'Si';
    case 'false':
      return 'No';
    default:
      return 'Sin respuesta';
  }
};

class CallReportContainer extends Component {
  componentDidMount() {
    this.props.getParticipantsByYear();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <FormFiltersHoc
          {...this.props}
          Form={Form}
          participateInCall={participateInCall}
        />
        <CallReport
          {...this.props}
          participateInCall={participateInCall}
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
