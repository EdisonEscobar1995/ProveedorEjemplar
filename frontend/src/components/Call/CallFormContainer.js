import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';
import * as callAction from '../../state/Call/action';
import * as calledSuppliersAction from '../../state/CalledSuppliers/action';
import CallForm from './CallForm';
import Filters from './Filters';
import Suppliers from './Suppliers';

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
    }
  }

  render() {
    return (
      <div>
        <FormCallHoc
          {...this.props}
          Form={Form}
        />
        <FormFiltersHoc
          filterCalledSuppliers={this.props.filterCalledSuppliers}
          Form={Form}
        />
        <Suppliers
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editData: state.call.editData,
  loading: state.call.loading,
  calledSuppliers: state.calledSuppliers.data,
  loadingSuppliers: state.calledSuppliers.loading,
});

const mapDispatchToProps = {
  ...callAction,
  ...calledSuppliersAction,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CallFormContainer));
