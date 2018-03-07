import {
  GET_TECHNICAL_TEAM_SURVEY_PROGRESS,
  GET_TECHNICAL_TEAM_SURVEY_SUCCESS,
  FILTER_TECHNICAL_TEAM_SURVEY,
  REQUEST_FAILED,
} from './const';

import { getTechnicalTeamSurveyApi } from '../../api/call';
import { requestApi, sortByField } from '../../utils/action';

const getDataTechnicalTeamSurveyProgress = () => ({
  type: GET_TECHNICAL_TEAM_SURVEY_PROGRESS,
});

const getDataTechnicalTeamSurveySuccess = data => ({
  type: GET_TECHNICAL_TEAM_SURVEY_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const filterTechnicalTeamSurvey = data => ({
  type: FILTER_TECHNICAL_TEAM_SURVEY,
  data,
});

const getTechnicalTeamSurvey = year => (dispatch) => {
  requestApi(dispatch, getDataTechnicalTeamSurveyProgress, getTechnicalTeamSurveyApi, year)
    .then((response) => {
      const { data } = response.data;
      data.suppliers = sortByField(data.suppliers, 'name').map((item) => {
        item.visible = true;
        return item;
      });
      dispatch(getDataTechnicalTeamSurveySuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getTechnicalTeamSurvey,
  getFailedRequest,
  filterTechnicalTeamSurvey,
};
