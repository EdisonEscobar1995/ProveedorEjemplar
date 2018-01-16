import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/ModifiedSuppliers/action';
import Filters from './Filters';
import ModifiedSuppliers from './ModifiedSuppliers';

class ModifiedSuppliersContainer extends Component {
  componentDidMount() {
    const year = '';
    this.props.getModifiedSuppliers(year);
  }

  render() {
    return (
      <div>
        <Filters
          {...this.props}
        />
        <ModifiedSuppliers
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.modifiedSuppliers.data,
  loading: state.modifiedSuppliers.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(ModifiedSuppliersContainer);
