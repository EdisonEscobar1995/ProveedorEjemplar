import React, { Component } from 'react';
import { connect } from 'react-redux';
import Supplier from './Supplier';
import getDataSupplier from '../../state/Supplier/action';

class SupplierContainer extends Component {
  componentDidMount() {
    this.props.getDataSupplier();
  }
  render() {
    return (
      <Supplier
        supplier={this.props.supplier}
        categories={this.props.categories}
        companyTypes={this.props.companyTypes}
        societyTypes={this.props.societyTypes}
        loading={this.props.loading}
        error={this.props.error}
      />
    );
  }
}

const mapStateToProps = state => ({
  supplier: state.supplier.supplier,
  categories: state.supplier.categories,
  companyTypes: state.supplier.companyTypes,
  societyTypes: state.supplier.societyTypes,
  loading: state.supplier.loading,
  error: state.supplier.error,
});

const mapDispatchToProps = dispatch => ({
  getDataSupplier: () => {
    dispatch(getDataSupplier());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupplierContainer);
