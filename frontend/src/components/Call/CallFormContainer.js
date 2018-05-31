import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';
import * as callAction from '../../state/Call/action';
import * as calledSuppliersAction from '../../state/CalledSuppliers/action';
import CallForm from './CallForm';
import Filters from './Filters';
import SuppliersContainer from './SuppliersContainer';

const FormCallHoc = Form.create()(CallForm);
const FormFiltersHoc = Form.create()(Filters);

class CallFormContainer extends Component {
  componentDidMount() {
    const { match: { params: { id = null } } } = this.props;
    if (id && typeof id === 'string') {
      this.props.getCall(id);
      this.props.getCalledSuppliers(id);
    } else {
      this.props.clearDataEdit();
      this.props.clearDataCalledSuppliers();
    }
    this.props.getMasters();
  }

  render() {
    return (
      <div>
        <FormCallHoc
          {...this.props}
          Form={Form}
        />
        <hr />
        <FormFiltersHoc
          filterCalledSuppliers={this.props.filterCalledSuppliers}
          Form={Form}
        />
        <SuppliersContainer
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editData: state.call.editData,
  loading: state.call.loading || state.calledSuppliers.loading,
  disabled: state.call.disabled,
  disabledByDate: state.call.disabledByDate,
  calledSuppliers: state.calledSuppliers.data,
  mastersToList: state.calledSuppliers.mastersToList,
  loadingSuppliers: state.calledSuppliers.loadingSuppliers,
});

const mapDispatchToProps = {
  ...callAction,
  ...calledSuppliersAction,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CallFormContainer));
