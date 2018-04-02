import React from 'react';
import { connect } from 'react-redux';
import menuData from './menuData';
import GenericForm from '../shared/GenericForm';

function Menu(props) {
  return (
    <GenericForm
      {...props}
      formData={menuData}
      submitMethod={props.saveManagerTeam}
      validate
    />
  );
}

const mapStateToProps = state => ({
  loadingModal: state.main.loadingModal,
  masters: state.menu.masters,
});

export default connect(mapStateToProps, null)(Menu);
