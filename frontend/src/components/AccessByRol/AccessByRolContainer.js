import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/AccessByRol/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import AccessByRol from './AccessByRol';

class AccessByRolContainer extends Component {
  componentDidMount() {
    this.props.getAccessByRol();
  }

  render() {
    const componentList = [
      {
        title: 'Accesos por rol',
        component: AccessByRol,
        columns: columnsData(this.props.masters),
        deleteMethod: this.props.deleteAccessByRol,
        onChangeSearchMethod: this.props.changeSearchAccessByRol,
        onSearchMethod: this.props.searchAccessByRol,
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
    data: state.accessByRol.data,
    searchValue: state.accessByRol.searchValue,
    masters: state.accessByRol.masters,
    loading: state.accessByRol.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(AccessByRolContainer);
