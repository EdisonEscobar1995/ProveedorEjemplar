import React from 'react';
import { connect } from 'react-redux';
import getDataSector from '../state/Sector/action';
import SectorContainer from '../components/Sector/SectorCotainer';

function Sector({ getDataAgreement }) {
  getDataAgreement();
  return (
    <SectorContainer />
  );
}
const mapDispatchToProps = dispatch => ({
  getDataAgreement: () => {
    dispatch(getDataSector());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Sector);
