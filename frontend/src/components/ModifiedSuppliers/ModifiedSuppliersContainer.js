import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import * as actions from '../../state/ModifiedSuppliers/action';
import Filters from './Filters';
import ModifiedSuppliers from './ModifiedSuppliers';

const FormCallHoc = Form.create()(Filters);

class ModifiedSuppliersContainer extends Component {
  componentDidMount() {
    const year = '';
    this.props.getModifiedSuppliers(year);
  }

  render() {
    return (
      <div>
        <FormCallHoc
          {...this.props}
          Form={Form}
        />
        <ModifiedSuppliers
          {...this.props}
        />
      </div>
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
