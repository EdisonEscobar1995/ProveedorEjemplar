import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/Call/action';
import Call from './Call';

function CallContainer() {
  return (
    <Call />
  );
}

const mapStateToProps = state => ({
  loading: state.call.loading,
  calls: state.call.data,
});

export default connect(
  mapStateToProps,
  actions,
)(CallContainer);
