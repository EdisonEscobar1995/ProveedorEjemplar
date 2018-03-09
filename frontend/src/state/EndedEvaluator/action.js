import {
  GET_ENDED_EVALUATOR_PROGRESS,
  GET_ENDED_EVALUATOR_SUCCESS,
  CHECK_SUPPLIER,
  UPDATE_ENDED_EVALUATOR,
  REQUEST_FAILED,
} from './const';

import { getEndedEvaluatorApi } from '../../api/call';
import { sendApprovalsApi, sendRejectionsApi } from '../../api/supplier';
import { requestApi, sortByField } from '../../utils/action';

const getEndedEvaluatorProgress = () => ({
  type: GET_ENDED_EVALUATOR_PROGRESS,
});

const getEndedEvaluatorSuccess = data => ({
  type: GET_ENDED_EVALUATOR_SUCCESS,
  data,
});

const updateEndedEvaluator = data => ({
  type: UPDATE_ENDED_EVALUATOR,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getEndedEvaluator = () => (
  (dispatch) => {
    requestApi(dispatch, getEndedEvaluatorProgress, getEndedEvaluatorApi)
      .then((response) => {
        const data = sortByField(response.data.data, 'totalScoreOfEvaluator', true);
        dispatch(getEndedEvaluatorSuccess(data));
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

const sendApprovals = (list, next) => (
  (dispatch) => {
    requestApi(dispatch, getEndedEvaluatorProgress, sendApprovalsApi, { idSuppliersByCall: list })
      .then(() => {
        dispatch(updateEndedEvaluator(list));
        next(list);
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

const sendRejections = (list, next) => (
  (dispatch) => {
    requestApi(dispatch, getEndedEvaluatorProgress, sendRejectionsApi, { idSuppliersByCall: list })
      .then(() => {
        dispatch(updateEndedEvaluator(list));
        next(list);
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

export {
  getEndedEvaluator,
  getFailedRequest,
  checkSupplier,
  sendApprovals,
  sendRejections,
};
