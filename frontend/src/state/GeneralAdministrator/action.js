import {
  GET_DATA_GENERAL_ADMINISTRATOR_PROGRESS,
  GET_DATA_GENERAL_ADMINISTRATOR_SUCCESS,
  REQUEST_FAILED,
  CLEAR_EDIT,
} from './const';

import getGeneralAdministratorApi from '../../api/generalAdministrator';
import { requestApi } from '../../utils/action';

const getDataGeneralAdministratorProgress = () => ({
  type: GET_DATA_GENERAL_ADMINISTRATOR_PROGRESS,
});

const getDataGeneralAdministratorSuccess = data => ({
  type: GET_DATA_GENERAL_ADMINISTRATOR_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getAllGeneralAdministrators = () => (dispatch) => {
  requestApi(dispatch, getDataGeneralAdministratorProgress, getGeneralAdministratorApi)
    .then((response) => {
      const { data } = response.data;
      dispatch(getDataGeneralAdministratorSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const clearDataEdit = () => ({
  type: CLEAR_EDIT,
});

// function saveGeneralAdministrator() {
//   return saveGeneralAdministratorApi();
// }

export {
  getAllGeneralAdministrators,
  clearDataEdit,
  // saveGeneralAdministrator as saveData,
};
