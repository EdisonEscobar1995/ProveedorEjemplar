import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../state/Call/action';
import CallForm from './CallForm';

class CallFormContainer extends Component {
  componentDidMount() {
    const { match: { params: { id = null } } } = this.props;
    if (id && typeof id === 'string') {
      this.props.getCall(id);
    } else {
      this.props.clearDataEdit();
    }
  }

  render() {
    return (
      <CallForm {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  editData: state.call.editData,
  loading: state.call.loading,
});

export default withRouter(connect(
  mapStateToProps,
  actions,
)(CallFormContainer));
