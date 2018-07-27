import React from 'react';
import { connect } from 'react-redux';
import CompanySizeData from './CompanySizeData';
import GenericForm from '../shared/GenericForm';

function CompanySize(props) {
  return (
    <GenericForm
      {...props}
      formData={CompanySizeData}
      submitMethod={props.saveCompanySize}
      validate
    />
  );
}

const mapStateToProps = state => ({
  loadingModal: state.main.loadingModal,
});

export default connect(mapStateToProps, null)(CompanySize);
