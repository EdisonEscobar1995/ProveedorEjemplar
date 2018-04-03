import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/Menu/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import Menu from './Menu';

class MenuContainer extends Component {
  componentDidMount() {
    this.props.getMenu();
  }

  render() {
    const componentList = [
      {
        title: 'Configurar opciones de menú',
        component: Menu,
        columns: columnsData(this.props.masters),
        deleteMethod: this.props.deleteMenu,
        onChangeSearchMethod: this.props.changeSearchMenu,
        onSearchMethod: this.props.searchMenu,
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
    data: state.menu.data,
    searchValue: state.menu.searchValue,
    masters: state.menu.masters,
    loading: state.menu.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(MenuContainer);
