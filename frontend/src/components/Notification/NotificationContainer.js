import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import Notification from './Notification';
import H1 from '../shared/H1';
import * as actions from '../../state/Notification/action';

class NotificationContainer extends Component {
  componentDidMount() {
    this.props.getNotification();
    this.props.getUsers();
  }
  render() {
    if (this.props.loading === false) {
      return (
        <Fragment>
          <H1
            text="Administrar Notificaciones"
          />
          <Notification {...this.props} />
        </Fragment>
      );
    }
    return (
      <Spin spinning={this.props.loading}>
        <H1
          text="Administrar Notificaciones"
        />
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.notification.loading,
  data: state.notification.data,
  dataOption: state.notification.dataOption,
  users: state.notification.users,
});

export default connect(
  mapStateToProps,
  actions,
)(NotificationContainer);
