import React from 'react';
import SupplierSelectionContainer from '../components/SupplierSelection/SupplierSelectionContainer';
import { EVALUATOR } from '../utils/const';

const titles = {
  title: 'Seleccionar proveedores que pasarán a evaluación por parte del equipo evaluador',
  approvalText: 'Pasan a evaluación de equipo evaluador',
  rejectionText: 'No pasan a evaluación de equipo evaluador',
  type: EVALUATOR,
};

function EndedSupplier() {
  return (
    <SupplierSelectionContainer {...titles} />
  );
}

export default EndedSupplier;
