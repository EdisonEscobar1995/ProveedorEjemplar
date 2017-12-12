import {
  GET_MENU_PROGRESS,
  GET_MENU_SUCCESS,
  REQUEST_FAILED,
} from './const';

import getMenuByRolApi from '../../api/menu';
import requestApi from '../../utils/actionUtils';

const getMenuByRolProgress = () => ({
  type: GET_MENU_PROGRESS,
});

const getMenuByRolSuccess = data => ({
  type: GET_MENU_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getMenuByRol = () => (dispatch) => {
  requestApi(dispatch, getMenuByRolProgress, getMenuByRolApi)
    .then((response) => {
      const { data } = response.data;
      dispatch(getMenuByRolSuccess(data));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
};

export default getMenuByRol;
