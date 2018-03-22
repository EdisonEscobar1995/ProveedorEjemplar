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
        onChangeSearchMethod: this.props.changeSearchUser,
        onSearchMethod: this.props.searchUser,
      },
    ];

    return (
      <GenericTable
        {...this.props}
        level={0}
        componentList={componentList}
        expandable={false}
        pagination
      />
    );
  }
}

const mapStateToProps = state => (
  {
    data: state.user.data,
    searchValue: state.user.searchValue,
    masters: state.user.masters,
    loading: state.user.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(UserContainer);
