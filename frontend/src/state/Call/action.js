import {
  GET_SUPPLIERS_BY_CALL_PROGRESS,
  GET_SUPPLIERS_BY_CALL_SUCCESS,
  REQUEST_SUPPLIERS_FAILED,
  FILTER_SUPPLIERS,
  GET_DATA_CALL_PROGRESS,
  GET_DATA_CALL_SUCCESS,
  GET_CALL_SUCCESS,
  GET_CALL_PROGRESS,
  CLEAR_EDIT,
  REQUEST_FAILED,
} from './const';

import { getCallApi, getCallByIdApi, saveCallApi, getSuppliersByCallApi } from '../../api/call';
import requestApi from '../../utils/actionUtils';

const getDataCallProgress = () => ({
  type: GET_DATA_CALL_PROGRESS,
});

const getDataCallSuccess = data => ({
  type: GET_DATA_CALL_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getAllCalls = () => (dispatch) => {
  requestApi(dispatch, getDataCallProgress, getCallApi)
    .then((respose) => {
      const { data } = respose.data;
      dispatch(getDataCallSuccess(data));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
};

const getCallProgress = () => ({
  type: GET_CALL_PROGRESS,
});

const getCallSuccess = data => ({
  type: GET_CALL_SUCCESS,
  data,
});

const getCall = id => (dispatch) => {
  requestApi(dispatch, getCallProgress, getCallByIdApi, id)
    .then((respose) => {
      const { data } = respose.data;
      dispatch(getCallSuccess(data));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
};

const clearDataEdit = () => ({
  type: CLEAR_EDIT,
});

const filterSuppliers = data => ({
  type: FILTER_SUPPLIERS,
  data,
});

const getSuppliersByCallProgress = () => ({
  type: GET_SUPPLIERS_BY_CALL_PROGRESS,
});

const getSuppliersByCallSuccess = data => ({
  type: GET_SUPPLIERS_BY_CALL_SUCCESS,
  data,
});

const getSuppliersFailedRequest = () => ({
  type: REQUEST_SUPPLIERS_FAILED,
});

const getSuppliersByCall = id => (dispatch) => {
  requestApi(dispatch, getSuppliersByCallProgress, getSuppliersByCallApi, id)
    .then((respose) => {
      const { data } = respose.data;
      dispatch(getSuppliersByCallSuccess(data));
    }).catch((err) => {
      dispatch(getSuppliersFailedRequest(err));
    });
};

function saveCall() {
  return saveCallApi();
}

export {
  getAllCalls,
  getCall,
  clearDataEdit,
  saveCall as saveData,
  getSuppliersByCall,
  filterSuppliers,
};
