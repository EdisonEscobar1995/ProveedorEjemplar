import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/Sector/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import Sector from './Sector';

class SectorContainer extends Component {
  componentDidMount() {
    this.props.getSectors();
  }

  render() {
    const componentList = [
      {
        title: 'Sectores',
        component: Sector,
        columns: columnsData,
        deleteMethod: this.props.deleteSector,
        onChangeSearchMethod: this.props.changeSearchSector,
        onSearchMethod: this.props.searchSector,
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
    data: state.sector.data,
    searchValue: state.sector.searchValue,
    loading: state.sector.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(SectorContainer);
