import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/Call/action';
import CallForm from './CallForm';

class CallFormContainer extends Component {
  componentDidMount() {
    // this.props.getAllCalls();
  }

  render() {
    return (
      <CallForm {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.call.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(CallFormContainer);
