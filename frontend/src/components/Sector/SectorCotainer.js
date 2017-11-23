import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sector from './Sector';
import { getAllSector, addData, saveData, editData, deleteData, cancelData } from '../../state/Sector/action';

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
    dispatch(addData(data));
  },
  saveData: (data, index) => {
    dispatch(saveData(data, index));
  },
  editData: (index) => {
    dispatch(editData(index));
  },
  deleteData: (data, index) => {
    dispatch(deleteData(data, index));
  },
  cancelData: (index) => {
    dispatch(cancelData(index));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectorContainer);
