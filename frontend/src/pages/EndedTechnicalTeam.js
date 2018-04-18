import React from 'react';
import SupplierSelectionContainer from '../components/SupplierSelection/SupplierSelectionContainer';
import { MANAGER_TEAM } from '../utils/const';

const titles = {
  title: 'Seleccionar proveedores que pasarán a evaluación por parte del comité gerencial',
  approvalText: 'Pasan a evaluación de comité gerencial',
  rejectionText: 'No pasan a evaluación de comité gerencial',
  type: MANAGER_TEAM,
};

function EndedTechnicalTeam() {
  return (
    <SupplierSelectionContainer {...titles} />
  );
}

export default EndedTechnicalTeam;
