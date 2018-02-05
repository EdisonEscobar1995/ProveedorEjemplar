import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Form } from 'antd';
import * as actions from '../../state/ModifiedSuppliers/action';
import Filters from './Filters';
import ModifiedSuppliers from './ModifiedSuppliers';

const FormFiltersHoc = Form.create()(Filters);

class ModifiedSuppliersContainer extends Component {
  componentDidMount() {
    this.props.getModifiedSuppliers();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <FormFiltersHoc
          {...this.props}
          Form={Form}
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
