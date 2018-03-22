import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from '../../state/Pendings/action';
import formData from './formData';
import GenericForm from '../shared/GenericForm';
import Pendings from './Pendings';

class PendingsContainer extends Component {
  componentDidMount() {
    this.props.getPendings();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <GenericForm
          {...this.props}
          formData={formData}
        />
        <Pendings
          {...this.props}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.pendings.data,
  loading: state.pendings.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(PendingsContainer);
