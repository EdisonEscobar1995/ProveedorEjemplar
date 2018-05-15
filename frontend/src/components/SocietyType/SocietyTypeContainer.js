import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/SocietyType/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import SocietyType from './SocietyType';

class SocietyTypeContainer extends Component {
  componentDidMount() {
    this.props.getSocietyType();
  }

  render() {
    const componentList = [
      {
        title: 'Configurar tipos de sociedad',
        component: SocietyType,
        columns: columnsData(this.props.data),
        deleteMethod: this.props.deleteSocietyType,
        onChangeSearchMethod: this.props.changeSearchSocietyType,
        onSearchMethod: this.props.searchSocietyType,
      },
    ];

    return (
      <GenericTable
        {...this.props}
        level={0}
        componentList={componentList}
        expandable={false}
        pagination
        withDelete
      />
    );
  }
}

const mapStateToProps = state => (
  {
    data: state.societyType.data,
    searchValue: state.societyType.searchValue,
    loading: state.societyType.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(SocietyTypeContainer);
