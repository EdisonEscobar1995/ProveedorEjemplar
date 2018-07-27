import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import GeneralAdministrator from './GeneralAdministrator';
import H1 from '../shared/H1';
import {
  getAllGeneralAdministrators,
  cleanFields,
  updateAttachment,
  deleteAttachment,
  saveGeneralAdministrator,
  cleanStore,
} from '../../state/GeneralAdministrator/action';

class GeneralAdministratorContainer extends Component {
  componentDidMount() {
    this.props.getAllGeneralAdministrators();
  }

  render() {
    if (this.props.loading === false) {
      return (
        <Fragment>
          <H1
            text="ADMINISTRACIÓN GENERAL"
          />
          <GeneralAdministrator {...this.props} />
        </Fragment>
      );
    }
    return (
      <Spin spinning={this.props.loading}>
        <H1
          text="ADMINISTRACIÓN GENERAL"
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  data: state.generalAdministrator.data,
  loading: state.generalAdministrator.loading,
});

const mapDispatchToProps = dispatch => ({
  getAllGeneralAdministrators: () => {
    dispatch(getAllGeneralAdministrators());
  },
  cleanFields: () => {
    dispatch(cleanFields());
  },
  updateAttachment: (data, field, list) => {
    dispatch(updateAttachment(data, field, list));
  },
  deleteAttachment: (data, field) => {
    dispatch(deleteAttachment(data, field));
  },
  saveGeneralAdministrator: (clientData, remoteId, next) => {
    dispatch(saveGeneralAdministrator(clientData, remoteId, next));
  },
  cleanStore: () => {
    dispatch(cleanStore());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneralAdministratorContainer);

