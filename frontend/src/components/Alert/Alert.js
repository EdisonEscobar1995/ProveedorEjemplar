import React from 'react';
import { connect } from 'react-redux';
import AlertData from './AlertData';
import GenericForm from '../shared/GenericForm';

function Alert(props) {
  return (
    <GenericForm
      {...props}
      formData={AlertData}
      submitMethod={props.saveAlert}
      validate
    />
  );
}

const mapStateToProps = state => ({
  loadingModal: state.main.loadingModal,
});

export default connect(mapStateToProps, null)(Alert);
