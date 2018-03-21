import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/Service/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import Service from './Service';
import Item from './Item';

class ServiceContainer extends Component {
  componentDidMount() {
    this.props.getServices();
  }

  render() {
    const componentList = [
      {
        title: 'Servicios',
        component: Service,
        columns: columnsData,
        deleteMethod: this.props.deleteService,
        onExpandMethod: this.props.getItemByService,
        onCollapseMethod: this.props.collapseService,
        onChangeSearchMethod: this.props.changeSearchService,
        onSearchMethod: this.props.searchService,
      },
      {
        title: 'Items',
        component: Item,
        columns: columnsData,
        deleteMethod: this.props.deleteItem,
        onChangeSearchMethod: this.props.changeSearchItem,
        onSearchMethod: this.props.searchItem,
      },
    ];

    return (
      <GenericTable
        {...this.props}
        level={0}
        componentList={componentList}
        expandable
        pagination
      />
    );
  }
}

const mapStateToProps = state => (
  {
    data: state.service.data,
    searchValue: state.service.searchValue,
    loading: state.service.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(ServiceContainer);
