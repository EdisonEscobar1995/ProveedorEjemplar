import {
  GET_SUPPLIER_SELECTION_PROGRESS,
  GET_SUPPLIER_SELECTION_SUCCESS,
  CHECK_SUPPLIER,
  UPDATE_SUPPLIER_SELECTION,
  REQUEST_FAILED,
} from './const';

import { getSupplierSelectionApi } from '../../api/call';
import { sendApprovalsApi, sendRejectionsApi } from '../../api/supplier';
import { requestApi, sortByField } from '../../utils/action';
import { MANAGER_TEAM } from '../../utils/const';

const getSupplierSelectionProgress = () => ({
  type: GET_SUPPLIER_SELECTION_PROGRESS,
});

const getSupplierSelectionSuccess = data => ({
  type: GET_SUPPLIER_SELECTION_SUCCESS,
  data,
});

const updateSupplierSelection = data => ({
  type: UPDATE_SUPPLIER_SELECTION,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getSupplierSelection = type => (
  (dispatch) => {
    requestApi(dispatch, getSupplierSelectionProgress, getSupplierSelectionApi, type)
      .then((response) => {
        let data;
        if (type === MANAGER_TEAM) {
          data = sortByField(response.data.data, 'totalScoreInService', true);
        } else {
          data = sortByField(response.data.data, 'totalScoreOfEvaluator', true);
        }
        dispatch(getSupplierSelectionSuccess(data));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

const checkSupplier = (idSupplier, checked) => ({
  type: CHECK_SUPPLIER,
  idSupplier,
  checked,
});

const sendApprovals = (list, type, next) => (
  (dispatch) => {
    requestApi(
      dispatch, getSupplierSelectionProgress, sendApprovalsApi,
      { idSuppliersByCall: list, stage: type })
      .then(() => {
        dispatch(updateSupplierSelection(list));
        next(list);
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

const sendRejections = (list, type, next) => (
  (dispatch) => {
    requestApi(
      dispatch, getSupplierSelectionProgress, sendRejectionsApi,
      { idSuppliersByCall: list, stage: type })
      .then(() => {
        dispatch(updateSupplierSelection(list));
        next(list);
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

export {
  getSupplierSelection,
  getFailedRequest,
  checkSupplier,
  sendApprovals,
  sendRejections,
};