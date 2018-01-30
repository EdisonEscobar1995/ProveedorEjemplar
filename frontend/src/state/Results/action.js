import {
  GET_MASTERS_PROGRESS,
  GET_MASTERS_SUCCESS,
  GET_CRITERIONS_SUCCESS,
  GET_RESULTS_SUCCESS,
  REQUEST_FAILED,
} from './const';

import getMasterApi from '../../api/master';
import { getResultsApi } from '../../api/call';
import getCriterionsByDimensionApi from '../../api/criterions';
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

const getResultsSuccess = results => ({
  type: GET_RESULTS_SUCCESS,
  results,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getMasters = () => (dispatch) => {
  requestApi(dispatch, getMastersProgress, getMasterApi, [
    'Call',
    'Supply',
    'Category',
    'CompanySize',
    'Supplier',
    'Dimension',
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

const getResults = data => (
  (dispatch) => {
    requestApi(dispatch, getMastersProgress, getResultsApi, data)
      .then((response) => {
        dispatch(getResultsSuccess(response.data));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

export {
  getMasters,
  getCriterionsByDimension,
  getResults,
  getFailedRequest,
};
