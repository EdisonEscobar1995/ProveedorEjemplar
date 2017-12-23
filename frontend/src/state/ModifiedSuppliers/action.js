import {
  GET_DATA_MODIFIED_SUPPLIERS_PROGRESS,
  GET_DATA_MODIFIED_SUPPLIERS_SUCCESS,
  FILTER_MODIFIED_SUPPLIERS,
  SET_COMPANY_SIZE,
  UNLOCK_SUPPLIER_SUCCESS,
  REQUEST_FAILED,
} from './const';

import { getModifiedSuppliersApi, unlockSupplierApi } from '../../api/supplier';
import { requestApi } from '../../utils/action';
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
      const { data } = response.data;
      let { suppliers } = data;
      const { suppliersByCall } = data;
      suppliers = suppliers.map((item) => {
        item.dateLocked = suppliersByCall
          .find(element => element.idSupplier === item.id).dateLocked;
        return item;
      });

      suppliers = suppliers
        .sort((first, second) => {
          let result = 1;
          const dateFirst = first.dateLocked.replace(/\//g, '');
          const dateSecond = second.dateLocked.replase(/\//g, '');

          if (dateFirst < dateSecond) {
            result = -1;
          }

          return result;
        })
        .map((item) => {
          item.visible = true;
          return item;
        });
      data.suppliers = suppliers;
      dispatch(getDataModifiedSuppliersSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const unlockSupplier = supplierByCall => (dispatch) => {
  requestApi(dispatch, getDataModifiedSuppliersProgress, unlockSupplierApi, supplierByCall)
    .then((response) => {
      dispatch(setMessage('El proveedor ha sido notificado', 'success'));
      const { data } = response.data;
      dispatch(unlockSupplierSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getModifiedSuppliers,
  getFailedRequest,
  filterModifiedSuppliers,
  setCompanySize,
  unlockSupplier,
};
