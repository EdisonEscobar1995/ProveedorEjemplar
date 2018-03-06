import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/User/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import User from './User';

class UserContainer extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const componentList = [
      {
        title: 'Usuarios',
        component: User,
        columns: columnsData(this.props.masters),
        deleteMethod: this.props.deleteUser,
      },
    ];

    return (
      <GenericTable
        {...this.props}
        level={0}
        parentId=""
        componentList={componentList}
        expandable={false}
        pagination
      />
    );
  }
}

const mapStateToProps = state => (
  {
    loading: state.user.loading,
    data: state.user.data,
    masters: state.user.masters,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(UserContainer);
