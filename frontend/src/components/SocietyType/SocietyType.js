import React from 'react';
import { connect } from 'react-redux';
import SocietyTypeData from './SocietyTypeData';
import GenericForm from '../shared/GenericForm';

function SocietyType(props) {
  return (
    <GenericForm
      {...props}
      formData={SocietyTypeData}
      submitMethod={props.saveSocietyType}
      validate
    />
  );
}

const mapStateToProps = state => ({
  loadingModal: state.main.loadingModal,
});

export default connect(mapStateToProps, null)(SocietyType);
