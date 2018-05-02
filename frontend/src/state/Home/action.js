import {
  GET_DATA_GENERAL_PROGRESS,
  GET_DATA_GENERAL_SUCCESS,
  GET_DATA_STATISTICAL_PROGRESS,
  GET_DATA_STATISTICAL_SUCCESS,
  GET_DATA_CURRENT_PROGRESS,
  GET_DATA_CURRENT_SUCCESS,
  REQUEST_FAILED,
} from './const';

import { getGeneralAdministratorApi } from '../../api/generalAdministrator';
import { getStatisticalProgressApi, identifyCurrentStageApi } from '../../api/call';
import { requestApi } from '../../utils/action';

const getDataGeneralAdministratorProgress = () => ({
  type: GET_DATA_GENERAL_PROGRESS,
});

const getDataStatisticalProgress = () => ({
  type: GET_DATA_STATISTICAL_PROGRESS,
});

const getDataCurrentProgress = () => ({
  type: GET_DATA_CURRENT_PROGRESS,
});

const getDataGeneralAdministratorSuccess = data => ({
  type: GET_DATA_GENERAL_SUCCESS,
  data,
});

const getDataCurrentSuccess = dataCurrent => ({
  type: GET_DATA_CURRENT_SUCCESS,
  dataCurrent,
});

const getDataStatisticalSuccess = statisticalData => ({
  type: GET_DATA_STATISTICAL_SUCCESS,
  statisticalData,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getAllGeneralData = () => (dispatch) => {
  requestApi(dispatch, getDataGeneralAdministratorProgress, getGeneralAdministratorApi)
    .then((response) => {
      const { data } = response.data;
      dispatch(getDataGeneralAdministratorSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const getStatisticalData = (filter = null) => (dispatch) => {
  requestApi(dispatch, getDataStatisticalProgress, getStatisticalProgressApi, filter)
    .then((response) => {
      const { data } = response.data;
      dispatch(getDataStatisticalSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const getCurrentData = () => (dispatch) => {
  requestApi(dispatch, getDataCurrentProgress, identifyCurrentStageApi)
    .then((response) => {
      const { data } = response.data;
      dispatch(getDataCurrentSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getAllGeneralData,
  getFailedRequest,
  getStatisticalData,
  getCurrentData,
};
