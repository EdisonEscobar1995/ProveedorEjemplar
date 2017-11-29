import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';
import * as actions from '../../state/Call/action';
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
      this.props.getSuppliersByCall(id);
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
          {...this.props}
          handleFilter={this.handleFilter}
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
  data: state.call.suppliersData,
  loadingSuppliers: state.call.loadingSuppliers,
});

export default withRouter(connect(
  mapStateToProps,
  actions,
)(CallFormContainer));
