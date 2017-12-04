import {
  GET_DATA_MODIFIED_SUPPLIERS_PROGRESS,
  GET_DATA_MODIFIED_SUPPLIERS_SUCCESS,
  FILTER_MODIFIED_SUPPLIERS,
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

const filterModifiedSuppliers = data => ({
  type: FILTER_MODIFIED_SUPPLIERS,
  data,
});

const getModifiedSuppliers = year => (dispatch) => {
  requestApi(dispatch, getDataModifiedSuppliersProgress, getModifiedSuppliersApi, year)
    .then((response) => {
      response.data.data.suppliers = response.data.data.suppliers.map((item) => {
        item.visible = true;
        return item;
      });
      const { data } = response.data;
      dispatch(getDataModifiedSuppliersSuccess(data));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
};

const unlockSupplier = supplierByCall => (dispatch) => {
  requestApi(dispatch, getDataModifiedSuppliersProgress, unlockSupplierApi, supplierByCall)
    .then((response) => {
      dispatch(setMessage('El proveedor ha sido notificado', 'success'));
      const { data } = response.data;
      dispatch(unlockSupplierSuccess(data));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
};

export {
  getModifiedSuppliers,
  getFailedRequest,
  filterModifiedSuppliers,
  setCompanySize,
  unlockSupplier,
};
