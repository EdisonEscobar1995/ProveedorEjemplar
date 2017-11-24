import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';
import * as actions from '../../state/Call/action';
import CallForm from './CallForm';

const FormCallHoc = Form.create()(CallForm);

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
    console.log(this.props);
    return (
      <FormCallHoc {...this.props} onSubmit={this.onSubmit} Form={Form} />
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
