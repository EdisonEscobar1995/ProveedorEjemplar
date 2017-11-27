import {
  GET_DATA_MODIFIED_SUPPLIERS_PROGRESS,
  GET_DATA_MODIFIED_SUPPLIERS_SUCCESS,
  SET_COMPANY_SIZE,
  UNLOCK_SUPPLIER_SUCCESS,
  REQUEST_FAILED,
} from './const';

import { getModifiedSuppliersApi, unlockSupplierApi } from '../../api/supplier';
import requestApi from '../../utils/actionUtils';
import setMessage from '../Generic/action';

const getDataModifiedSuppliersProgress = () => ({
  type: GET_DATA_MODIFIED_SUPPLIERS_PROGRESS,
});

const getDataModifiedSuppliersSuccess = data => ({
  type: GET_DATA_MODIFIED_SUPPLIERS_SUCCESS,
  data,
});

const unlockSupplierSuccess = data => ({
  type: UNLOCK_SUPPLIER_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const setCompanySize = data => ({
  type: SET_COMPANY_SIZE,
  data,
});

const getModifiedSuppliers = year => (dispatch) => {
  requestApi(dispatch, getDataModifiedSuppliersProgress, getModifiedSuppliersApi, year)
    .then((response) => {
      const { data } = response.data;
      dispatch(getDataModifiedSuppliersSuccess(data));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
};

const unlockSupplier = supplierByCall => (dispatch) => {
  requestApi(dispatch, getDataModifiedSuppliersProgress, unlockSupplierApi, supplierByCall)
    .then((response) => {
      if (response.status) {
        dispatch(setMessage('El proveedor ha sido notificado', 'success'));
        const { data } = response.data;
        dispatch(unlockSupplierSuccess(data));
      } else if (response.message === 'SURVEY_DOES_NOT_EXIST') {
        dispatch(setMessage('No existe una encuesta para el tipo de suministro y tamaño de encuesta seleccionada', 'error'));
      }
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
};

export {
  getModifiedSuppliers,
  getFailedRequest,
  setCompanySize,
  unlockSupplier,
  /*
  addData,
  editData,
  cancelData, 
  */
};
