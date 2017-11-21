import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sector from './Sector';
import { getAllSector, saveSector, deleteSector } from '../../state/Sector/action';

class SectorContainer extends Component {
  componentDidMount() {
    this.props.getAllSector();
  }
  render() {
    const colummns = [
      {
        title: 'Nombre',
        key: 'name',
      },
    ];
    return (
      <Sector
        colummns={colummns}
        loading={this.props.loading}
        data={this.props.data}
        actual={this.props.actual}
        saveData={this.props.saveSector}
        deleteData={this.props.deleteSector}
      />
    );
  }
}


const mapStateToProps = state => (
  {
    loading: state.sector.loading,
    data: state.sector.data,
    actual: state.sector.actual,
  }
);

const mapDispatchToProps = dispatch => ({
  getAllSector: () => {
    dispatch(getAllSector());
  },
  saveSector: (data) => {
    dispatch(saveSector(data));
  },
  deleteSector: (data) => {
    dispatch(deleteSector(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectorContainer);
