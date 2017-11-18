import {
  GET_DATA_SUPPLIER_PROGRESS,
  GET_DATA_SUPPLIER_SUCCESS,
  GET_DATA_SUPPLIER_FAILED,
} from './const';
import getDataSuppliertApi from '../../api/supplier';


function getDataSupplierProgress() {
  return {
    type: GET_DATA_SUPPLIER_PROGRESS,
  };
}

function getDataSupplierSuccess(data) {
  return {
    type: GET_DATA_SUPPLIER_SUCCESS,
    data,
  };
}

function getDataSupplierFailed() {
  return {
    type: GET_DATA_SUPPLIER_FAILED,
  };
}

function getDataSupplier() {
  return (dispatch) => {
    dispatch(getDataSupplierProgress());
    getDataSuppliertApi()
      .then((respose) => {
        const { data } = respose.data;
        dispatch(getDataSupplierSuccess(data));
      })
      .catch(() => {
        dispatch(getDataSupplierFailed());
      });
  };
}

export {
  getDataSupplier as default,
};
