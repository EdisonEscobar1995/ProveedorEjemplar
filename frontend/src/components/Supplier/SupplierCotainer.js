import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Supplier from './Supplier';
import {
  getDataSupplier,
  getDataCategoryBySuply,
  getDataSubCategoryByCategory,
  getDataDepartmentsByCountry,
  getDataCitiesByDepartment,
  getDimensionsBySurvey,
  saveDataCallBySupplier,
  saveDataCallSupplier,
  changeParticipate,
  changeAcceptedPolicy,
  updateAttachment,
  deleteAttachment,
  updateChangeIdCompanySize,
  saveAnswer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  addContact,
  updateContact,
  deleteContact,
  validateQuestions,
  setNumberOfDirectEmployees,
  setNumberOfSubContratedEmployees,
  setSector,
  setExport,
  cleanStore,
} from '../../state/Supplier/action';

class SupplierContainer extends Component {
  componentDidMount() {
    const { match: { params: { idSupplier = null, idSupplierByCall = null } } } = this.props;
    this.props.getDataSupplier(idSupplier, idSupplierByCall);
  }
  componentWillUnmount() {
    this.props.cleanStore();
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
  rules: state.supplier.rules,
  participateInCall: state.supplier.participateInCall,
  acceptedPolicy: state.supplier.acceptedPolicy,
  supplies: state.supplier.supply,
  categories: state.supplier.categories,
  subcategories: state.supplier.subcategories,
  companyTypes: state.supplier.companyTypes,
  companySizes: state.supplier.companySizes,
  societyTypes: state.supplier.societyTypes,
  countries: state.supplier.countries,
  departments: state.supplier.departments,
  cities: state.supplier.cities,
  callData: state.supplier.callData,
  stateData: state.supplier.stateData,
  dimensions: state.supplier.dimensions,
  loading: state.supplier.loading,
  loadingDimensions: state.supplier.loadingDimensions,
  loadedDimensions: state.supplier.loadedDimensions,
  principalCustomer: state.supplier.principalCustomer,
  contactNutresaGroup: state.supplier.contactNutresaGroup,
  sectors: state.supplier.sectors,
  system: state.supplier.system,
  error: state.supplier.error,
});

const mapDispatchToProps = dispatch => ({
  getDataSupplier: (idSupplier, idSupplierByCall) => {
    dispatch(getDataSupplier(idSupplier, idSupplierByCall));
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
  getDimensionsBySurvey: (idSurvey, id) => {
    dispatch(getDimensionsBySurvey(idSurvey, id));
  },
  saveDataCallBySupplier: (data) => {
    dispatch(saveDataCallBySupplier(data));
  },
  saveDataCallSupplier: (supplier) => {
    dispatch(saveDataCallSupplier(supplier));
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
  changeAcceptedPolicy: (acceptedPolicy) => {
    dispatch(changeAcceptedPolicy(acceptedPolicy));
  },
  updateChangeIdCompanySize: (idCompanySize) => {
    dispatch(updateChangeIdCompanySize(idCompanySize));
  },
  addCustomer: (data, index) => {
    dispatch(addCustomer(data, index));
  },
  updateCustomer: (value, record, fielName) => {
    dispatch(updateCustomer(value, record, fielName));
  },
  deleteCustomer: (data, index) => {
    dispatch(deleteCustomer(data, index));
  },
  addContact: (data, index) => {
    dispatch(addContact(data, index));
  },
  updateContact: (value, record, fielName) => {
    dispatch(updateContact(value, record, fielName));
  },
  deleteContact: (data, index) => {
    dispatch(deleteContact(data, index));
  },
  validateQuestions: (onFail) => {
    dispatch(validateQuestions(onFail));
  },
  setNumberOfDirectEmployees: (value) => {
    dispatch(setNumberOfDirectEmployees(value));
  },
  setNumberOfSubContratedEmployees: (value) => {
    dispatch(setNumberOfSubContratedEmployees(value));
  },
  setSector: (value) => {
    dispatch(setSector(value));
  },
  setExport: (value) => {
    dispatch(setExport(value));
  },
  cleanStore: () => {
    dispatch(cleanStore());
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupplierContainer));
