import {
  GET_ENDED_EVALUATOR_PROGRESS,
  GET_ENDED_EVALUATOR_SUCCESS,
  REQUEST_FAILED,
} from './const';

import { getEndedEvaluatorApi } from '../../api/call';
import { requestApi } from '../../utils/action';

const getEndedEvaluatorProgress = () => ({
  type: GET_ENDED_EVALUATOR_PROGRESS,
});

const getEndedEvaluatorSuccess = data => ({
  type: GET_ENDED_EVALUATOR_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getEndedEvaluator = () => (
  (dispatch) => {
    requestApi(dispatch, getEndedEvaluatorProgress, getEndedEvaluatorApi)
      .then((response) => {
        const { data } = response.data;
        dispatch(getEndedEvaluatorSuccess(data));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

export {
  getEndedEvaluator,
  getFailedRequest,
};
