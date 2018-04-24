import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as actions from '../../state/GeneralAdministrator/action';
import dataForm from './dataForm';
import GenericForm from '../shared/GenericForm';
import H1 from '../shared/H1';

class GeneralAdministratorContainer extends Component {
  componentDidMount() {
    this.props.getAllGeneralAdministrators();
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <H1
          text="ADMINISTRACIÓN GENERAL"
        />
        <GenericForm
          {...this.props}
          formData={dataForm}
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.generalAdministrator.data,
  loading: state.generalAdministrator.loading,
});

export default connect(
  mapStateToProps,
  actions,
)(GeneralAdministratorContainer);

