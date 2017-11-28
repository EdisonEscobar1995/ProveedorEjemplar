import React, { Component } from 'react';
import { connect } from 'react-redux';
import Supplier from './Supplier';
import {
  getDataSupplier,
  getDataCategoryBySuply,
  getDataSubCategoryByCategory,
  getDataDepartmentsByCountry,
  getDataCitiesByDepartment,
  getDimensionsBySurvey,
  getQuestionsByDimension,
  saveDataCallBySupplier,
  saveDataCallSupplier,
  changeParticipate,
  updateAttachment,
  deleteAttachment,
  updateChangeIdCompanySize,
  saveAnswer,
  addDataCustomer,
  saveDataCustomer,
  editDataCustomer,
  deleteDataCustomer,
  cancelDataCustomer,
} from '../../state/Supplier/action';

class SupplierContainer extends Component {
  componentDidMount() {
    this.props.getDataSupplier();
  }
  render() {
    return (
      <Supplier
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  supplier: state.supplier.supplier,
  changeIdCompanySize: state.supplier.changeIdCompanySize,
  call: state.supplier.call,
  participateInCall: state.supplier.participateInCall,
  supplies: state.supplier.supply,
  categories: state.supplier.categories,
  subcategories: state.supplier.subcategories,
  companyTypes: state.supplier.companyTypes,
  companySizes: state.supplier.companySizes,
  societyTypes: state.supplier.societyTypes,
  countries: state.supplier.countries,
  departments: state.supplier.departments,
  cities: state.supplier.cities,
  dimensions: state.supplier.dimensions,
  loading: state.supplier.loading,
  principalCustomer: state.supplier.principalCustomer,
  sectors: state.supplier.sectors,
  system: state.supplier.system,
  error: state.supplier.error,
});

const mapDispatchToProps = dispatch => ({
  getDataSupplier: () => {
    dispatch(getDataSupplier());
  },
  getDataCategoryBySuply: (data) => {
    dispatch(getDataCategoryBySuply(data));
  },
  getDataSubCategoryByCategory: (data) => {
    dispatch(getDataSubCategoryByCategory(data));
  },
  getDataDepartmentsByCountry: (data) => {
    dispatch(getDataDepartmentsByCountry(data));
  },
  getDataCitiesByDepartment: (data) => {
    dispatch(getDataCitiesByDepartment(data));
  },
  getDimensionsBySurvey: (idSurvey) => {
    dispatch(getDimensionsBySurvey(idSurvey));
  },
  getQuestionsByDimension: (idSurvey, idDimension) => {
    dispatch(getQuestionsByDimension(idSurvey, idDimension));
  },
  saveDataCallBySupplier: (data) => {
    dispatch(saveDataCallBySupplier(data));
  },
  saveDataCallSupplier: (call, supplier) => {
    dispatch(saveDataCallSupplier(call, supplier));
  },
  saveAnswer: (answer, idDimension, idCriterion) => {
    dispatch(saveAnswer(answer, idDimension, idCriterion));
  },
  updateAttachment: (data, field) => {
    dispatch(updateAttachment(data, field));
  },
  deleteAttachment: (idAtttachment, field) => {
    dispatch(deleteAttachment(idAtttachment, field));
  },
  changeParticipate: (participateInCall) => {
    dispatch(changeParticipate(participateInCall));
  },
  updateChangeIdCompanySize: (idCompanySize) => {
    dispatch(updateChangeIdCompanySize(idCompanySize));
  },
  addData: (data) => {
    dispatch(addDataCustomer(data));
  },
  saveData: (data, index) => {
    dispatch(saveDataCustomer(data, index));
  },
  editData: (index) => {
    dispatch(editDataCustomer(index));
  },
  deleteData: (data, index) => {
    dispatch(deleteDataCustomer(data, index));
  },
  cancelData: (index) => {
    dispatch(cancelDataCustomer(index));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupplierContainer);
