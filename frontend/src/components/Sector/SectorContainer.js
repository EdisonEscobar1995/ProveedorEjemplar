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
    loading: state.sector.loading,
    data: state.sector.data,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(SectorContainer);
