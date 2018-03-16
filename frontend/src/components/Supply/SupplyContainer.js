import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/Supply/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import Supply from './Supply';
import Category from './Category';
import Subcategory from './Subcategory';

class SupplyContainer extends Component {
  componentDidMount() {
    this.props.getSupplies();
  }

  render() {
    const componentList = [
      {
        title: 'Suministros',
        component: Supply,
        columns: columnsData,
        deleteMethod: this.props.deleteSupply,
        onExpandMethod: this.props.getCategoryBySupply,
        onCollapseMethod: this.props.collapseSupply,
        onSearchMethod: this.props.searchSupply,
      },
      {
        title: 'Categorias',
        component: Category,
        columns: columnsData,
        deleteMethod: this.props.deleteCategory,
        onExpandMethod: this.props.getSubcategoryByCategory,
        onCollapseMethod: this.props.collapseCategory,
        onSearchMethod: this.props.searchCategory,
      },
      {
        title: 'Subcategorias',
        component: Subcategory,
        columns: columnsData,
        deleteMethod: this.props.deleteSubcategory,
        onSearchMethod: this.props.searchSubcategory,
      },
    ];

    return (
      <GenericTable
        {...this.props}
        level={0}
        parentId=""
        componentList={componentList}
        expandable
        pagination
      />
    );
  }
}

const mapStateToProps = state => (
  {
    loading: state.supply.loading,
    data: state.supply.data,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(SupplyContainer);
