import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from '../../state/SupplierSelection/action';
import SupplierSelection from './SupplierSelection';
import H1 from '../shared/H1';

class SupplierSelectionContainer extends Component {
  componentDidMount() {
    this.props.getSuppliesSpecials();
    this.props.getSupplierSelection(this.props.type);
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <H1
          text={this.props.title}
        />
        <SupplierSelection
          {...this.props}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.supplierSelection.data,
  suppliesSpecialsdata: state.supplierSelection.suppliesSpecials,
  loading: state.supplierSelection.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(SupplierSelectionContainer);
