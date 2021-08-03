import {
  GET_MASTERS_PROGRESS,
  GET_MASTERS_SUCCESS,
  GET_CRITERIONS_SUCCESS,
  GET_ITEMS_SUCCESS,
  CHANGE_TYPE,
  GET_RESULTS_SUCCESS,
  GET_MANAGER_REPORT_SUCCESS,
  RESET_QUESTIONS,
  REQUEST_FAILED,
} from './const';

import getMasterApi from '../../api/master';
import { getResultsApi, getManagerReportApi } from '../../api/call';
import { getAllCriterionsByDimensionApi } from '../../api/criterions';
import getItemsByServiceApi from '../../api/items';
import { requestApi, sortByField } from '../../utils/action';

const getMastersProgress = () => ({
  type: GET_MASTERS_PROGRESS,
});

const getMastersSuccess = data => ({
  type: GET_MASTERS_SUCCESS,
  data,
});

const getCriterionsByDimensionSuccess = criterions => ({
  type: GET_CRITERIONS_SUCCESS,
  criterions,
});

const getItemsByServiceSuccess = items => ({
  type: GET_ITEMS_SUCCESS,
  items,
});

const getResultsSuccess = () => ({
  type: GET_RESULTS_SUCCESS,
});

const getManagerReportSuccess = questions => ({
  type: GET_MANAGER_REPORT_SUCCESS,
  questions,
});

const resetQuestions = () => ({
  type: RESET_QUESTIONS,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const changeType = value => ({
  type: CHANGE_TYPE,
  value,
});

const getMasters = (from = '') => (dispatch) => {
  const masters = [
    'Call',
    'Supply',
    'Category',
    'CompanySize',
    'Dimension',
    'Service',
    'Country',
  ];
  if (from === '') {
    masters.push('Supplier');
  }
  requestApi(dispatch, getMastersProgress, getMasterApi, masters)
    .then((response) => {
      const { data } = response.data;
      data.Call = sortByField(response.data.data.Call, 'year', true);
      dispatch(getMastersSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const getCriterionsByDimension = idDimension => (
  (dispatch) => {
    requestApi(dispatch, getMastersProgress, getAllCriterionsByDimensionApi, idDimension)
      .then((response) => {
        const criterions = sortByField(response.data.data, 'name');
        dispatch(getCriterionsByDimensionSuccess(criterions));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

const getItemsByService = idService => (
  (dispatch) => {
    requestApi(dispatch, getMastersProgress, getItemsByServiceApi, idService)
      .then((response) => {
        const items = sortByField(response.data.data, 'name');
        dispatch(getItemsByServiceSuccess(items));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

const getResults = (data, exportMethod = () => {}) => (
  (dispatch) => {
    requestApi(dispatch, getMastersProgress, getResultsApi, data)
      .then((response) => {
        exportMethod(response.data.data);
        dispatch(getResultsSuccess());
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

const getManagerReport = data => (
  (dispatch) => {
    requestApi(dispatch, getMastersProgress, getManagerReportApi, data)
      .then((response) => {
        dispatch(getManagerReportSuccess(response.data.data));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

export {
  getMasters,
  getCriterionsByDimension,
  getItemsByService,
  changeType,
  getResults,
  getManagerReport,
  resetQuestions,
  getFailedRequest,
};
