import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/CompanyType/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import CompanyType from './CompanyType';

class CompanyTypeContainer extends Component {
  componentDidMount() {
    this.props.getCompanyType();
  }

  render() {
    const componentList = [
      {
        title: 'Configurar tipos de compañía',
        component: CompanyType,
        columns: columnsData(this.props.data),
        deleteMethod: this.props.deleteCompanyType,
        onChangeSearchMethod: this.props.changeSearchCompanyType,
        onSearchMethod: this.props.searchCompanyType,
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
    data: state.companyType.data,
    searchValue: state.companyType.searchValue,
    loading: state.companyType.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(CompanyTypeContainer);
