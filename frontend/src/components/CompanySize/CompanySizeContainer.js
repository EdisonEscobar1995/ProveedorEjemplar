import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../state/CompanySize/action';
import GenericTable from '../shared/GenericTable';
import columnsData from './columnsData';
import CompanySize from './CompanySize';

class CompanySizeContainer extends Component {
  componentDidMount() {
    this.props.getCompanySize();
  }

  render() {
    const componentList = [
      {
        title: 'Configurar tamaño de compañía',
        component: CompanySize,
        columns: columnsData(this.props.data),
        deleteMethod: this.props.deleteCompanySize,
        onChangeSearchMethod: this.props.changeSearchCompanySize,
        onSearchMethod: this.props.searchCompanySize,
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
    data: state.companySize.data,
    searchValue: state.companySize.searchValue,
    loading: state.companySize.loading,
  }
);

export default connect(
  mapStateToProps,
  actions,
)(CompanySizeContainer);
