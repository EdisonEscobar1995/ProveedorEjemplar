import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/ModifiedSuppliers/action';
import ModifiedSuppliers from './ModifiedSuppliers';

class ModifiedSuppliersContainer extends Component {
  componentDidMount() {
    this.props.getAllModifiedSuppliers();
  }

  render() {
    return (
      <ModifiedSuppliers
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.modifiedSuppliers.loading,
  data: state.modifiedSuppliers.data,
});

export default connect(
  mapStateToProps,
  actions,
)(ModifiedSuppliersContainer);
