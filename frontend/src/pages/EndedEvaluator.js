import React from 'react';
import SupplierSelectionContainer from '../components/SupplierSelection/SupplierSelectionContainer';
import { TECHNICAL_TEAM } from '../utils/const';

const titles = {
  title: 'Seleccionar proveedores que pasarán a evaluación por parte del comité técnico',
  approvalText: 'Pasan a evaluación de comité ténico',
  rejectionText: 'No pasan a evaluación de comité ténico',
  type: TECHNICAL_TEAM,
};

function EndedEvaluator() {
  return (
    <SupplierSelectionContainer {...titles} />
  );
}

export default EndedEvaluator;
