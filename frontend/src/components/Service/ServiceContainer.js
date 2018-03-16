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
        onSearchMethod: this.props.searchService,
      },
      {
        title: 'Items',
        component: Item,
        columns: columnsData,
        deleteMethod: this.props.deleteItem,
        onSearchMethod: this.props.searchItem,
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
    loading: state.service.loading,
    data: state.service.data,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(ServiceContainer);
