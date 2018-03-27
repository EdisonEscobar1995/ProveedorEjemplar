import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/Access/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import Access from './Access';

class AccessContainer extends Component {
  componentDidMount() {
    this.props.getAccesses();
  }

  render() {
    const componentList = [
      {
        title: 'Accesos',
        component: Access,
        columns: columnsData,
        deleteMethod: this.props.deleteAccess,
        onChangeSearchMethod: this.props.changeSearchAccess,
        onSearchMethod: this.props.searchAccess,
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
    data: state.access.data,
    searchValue: state.access.searchValue,
    loading: state.access.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(AccessContainer);
