import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from '../../state/ModifiedSuppliers/action';
import formData from './formData';
import GenericForm from '../shared/GenericForm';
import ModifiedSuppliers from './ModifiedSuppliers';

class ModifiedSuppliersContainer extends Component {
  componentDidMount() {
    this.props.getModifiedSuppliers();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <GenericForm
          {...this.props}
          formData={formData}
        />
        <ModifiedSuppliers
          {...this.props}
        />
      </Spin>
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
