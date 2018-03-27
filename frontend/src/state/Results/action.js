import {
  GET_MASTERS_PROGRESS,
  GET_MASTERS_SUCCESS,
  GET_CRITERIONS_SUCCESS,
  GET_ITEMS_SUCCESS,
  CHANGE_TYPE,
  GET_RESULTS_SUCCESS,
  REQUEST_FAILED,
} from './const';

import getMasterApi from '../../api/master';
import { getResultsApi } from '../../api/call';
import getCriterionsByDimensionApi from '../../api/criterions';
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

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const changeType = value => ({
  type: CHANGE_TYPE,
  value,
});

const getMasters = () => (dispatch) => {
  requestApi(dispatch, getMastersProgress, getMasterApi, [
    'Call',
    'Supply',
    'Category',
    'CompanySize',
    'Supplier',
    'Dimension',
    'Service',
    'Country',
  ])
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
    requestApi(dispatch, getMastersProgress, getCriterionsByDimensionApi, idDimension)
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
        dispatch(getResultsSuccess());
        exportMethod(response.data.data);
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
  getFailedRequest,
};
