import {
  GET_DATA_SURVEYS_PROGRESS,
  GET_DATA_SURVEYS_SUCCESS,
  FILTER_SURVEYS,
  REQUEST_FAILED,
} from './const';

import { getSurveysApi } from '../../api/supplier';
import { requestApi, sortByField } from '../../utils/action';

const getDataSurveysProgress = () => ({
  type: GET_DATA_SURVEYS_PROGRESS,
});

const getDataSurveysSuccess = data => ({
  type: GET_DATA_SURVEYS_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const filterSurveys = data => ({
  type: FILTER_SURVEYS,
  data,
});

const getSurveys = year => (dispatch) => {
  requestApi(dispatch, getDataSurveysProgress, getSurveysApi, year)
    .then((response) => {
      const { data } = response.data;
      data.suppliers = sortByField(data.suppliers, 'name').map((item) => {
        item.visible = true;
        return item;
      });
      dispatch(getDataSurveysSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getSurveys,
  getFailedRequest,
  filterSurveys,
};
