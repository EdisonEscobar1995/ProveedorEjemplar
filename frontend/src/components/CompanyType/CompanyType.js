import React from 'react';
import { connect } from 'react-redux';
import CompanyTypeData from './CompanyTypeData';
import GenericForm from '../shared/GenericForm';

function CompanyType(props) {
  return (
    <GenericForm
      {...props}
      formData={CompanyTypeData}
      submitMethod={props.saveCompanyType}
      validate
    />
  );
}

const mapStateToProps = state => ({
  loadingModal: state.main.loadingModal,
});

export default connect(mapStateToProps, null)(CompanyType);
