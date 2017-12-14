import {
  GET_USER_CONTEXT_PROGRESS,
  GET_USER_CONTEXT_SUCCESS,
  REQUEST_FAILED,
} from './const';

import getUserContextApi from '../../api/user';
import requestApi from '../../utils/actionUtils';

const getUserContextProgress = () => ({
  type: GET_USER_CONTEXT_PROGRESS,
});

const getUserContextSuccess = data => ({
  type: GET_USER_CONTEXT_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getUserContext = () => (dispatch) => {
  requestApi(dispatch, getUserContextProgress, getUserContextApi)
    .then((response) => {
      const { data } = response.data;
      dispatch(getUserContextSuccess(data));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
};

export default getUserContext;
