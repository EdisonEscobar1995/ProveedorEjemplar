import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sector from './Sector';
import { getAllSector, addDataSector, editDataSector, deleteDataSector, cancelDataSector, saveDataSector } from '../../state/Sector/action';

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
        {...this.props}
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

const mapDispatchToProps = dispatch => ({
  getAllSector: () => {
    dispatch(getAllSector());
  },
  addData: (data) => {
    dispatch(addDataSector(data));
  },
  saveData: (data, index) => {
    dispatch(saveDataSector(data, index));
  },
  editData: (index) => {
    dispatch(editDataSector(index));
  },
  deleteData: (data, index) => {
    dispatch(deleteDataSector(data, index));
  },
  cancelData: (index) => {
    dispatch(cancelDataSector(index));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectorContainer);
