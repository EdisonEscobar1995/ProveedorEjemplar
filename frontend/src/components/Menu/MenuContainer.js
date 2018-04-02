import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/Menu/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import MenuTeam from './Menu';

class MenuContainer extends Component {
  componentDidMount() {
    this.props.getMenuTeam();
  }

  render() {
    const componentList = [
      {
        title: 'Configurar opciones de menú',
        component: MenuTeam,
        columns: columnsData(this.props.masters),
        deleteMethod: this.props.deleteMenuTeam,
        onChangeSearchMethod: this.props.changeSearchMenuTeam,
        onSearchMethod: this.props.searchMenuTeam,
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
    data: state.menuTeam.data,
    searchValue: state.menuTeam.searchValue,
    masters: state.menuTeam.masters,
    loading: state.menuTeam.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(MenuContainer);
