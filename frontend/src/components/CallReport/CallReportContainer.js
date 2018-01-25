import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/CallReport/action';
import Filters from './Filters';
import CallReport from './CallReport';

class CallReportContainer extends Component {
  componentDidMount() {
    const year = '';
    this.props.getParticipantsByYear(year);
  }

  render() {
    return (
      <div>
        <Filters
          {...this.props}
        />
        <CallReport
          {...this.props}
        />
      </div>
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
