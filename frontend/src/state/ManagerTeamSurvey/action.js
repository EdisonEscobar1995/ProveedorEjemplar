import {
  GET_MANAGER_TEAM_SURVEY_PROGRESS,
  GET_MANAGER_TEAM_SURVEY_SUCCESS,
  FILTER_MANAGER_TEAM_SURVEY,
  CHANGE_ANSWER,
  // UPDATE_ERRORS,
  // UPDATE_SUPPLIERS,
  REQUEST_FAILED,
} from './const';

import { getManagerTeamSurveyApi } from '../../api/call';
import saveManagerTeamAnswerApi from '../../api/managerTeamAnswer';
// import { finishManagerTeamSurveyApi } from '../../api/supplier';
import { requestApi, sortByField } from '../../utils/action';
import { COMMENT, SCORE } from '../../utils/const';
// import setMessage from '../Generic/action';

const getDataManagerTeamSurveyProgress = () => ({
  type: GET_MANAGER_TEAM_SURVEY_PROGRESS,
});

const getDataManagerTeamSurveySuccess = data => ({
  type: GET_MANAGER_TEAM_SURVEY_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const filterManagerTeamSurvey = data => ({
  type: FILTER_MANAGER_TEAM_SURVEY,
  data,
});

const changeAnswer = (idSupplier, id, answer) => ({
  type: CHANGE_ANSWER,
  idSupplier,
  answer,
  new: !id,
});

// const updateErrors = data => ({
//   type: UPDATE_ERRORS,
//   data,
// });

// const updateSuppliers = (idSuppliers, idSuppliersByCall) => ({
//   type: UPDATE_SUPPLIERS,
//   idSuppliers,
//   idSuppliersByCall,
// });

const setAnswer = (idSupplier, value, answer, type) => (dispatch, getState) => {
  const storedComment = getState().managerTeamSurvey.data.suppliers.comment.value;
  const storedScore = getState().managerTeamSurvey.data.suppliers.score.value;
  if ((type === COMMENT && storedComment !== value) || (type === SCORE && storedScore !== value)) {
    requestApi(dispatch, getDataManagerTeamSurveyProgress, saveManagerTeamAnswerApi, answer)
      .then((response) => {
        dispatch(changeAnswer(idSupplier, answer.id, response.data.data));
      }).catch(() => {
        dispatch(changeAnswer(idSupplier, answer.id, null));
        dispatch(getFailedRequest());
      });
  }
};

const getManagerTeamSurvey = year => (dispatch) => {
  requestApi(dispatch, getDataManagerTeamSurveyProgress, getManagerTeamSurveyApi, year)
    .then((response) => {
      const { data } = response.data;
      data.suppliers = data.suppliers.map((supplier) => {
        const supplierByCall = data.suppliersByCall.find(
          element => element.idSupplier === supplier.id);

        const idSupplierByCall = supplierByCall.id;
        const idState = supplierByCall.idState;

        const answer = data.masters.ManagerTeamAnswer
          .find(element => element.idSupplierByCall === idSupplierByCall);
        const option = answer ?
          data.masters.EvaluationScale
            .find(element => element.id === answer.idEvaluationScale) : null;
        supplier.score = {
          defaultValue: {
            key: option ? option.id : null,
            name: option ? option.name : null,
          },
          value: option ? option.score : null,
          error: false,
        };

        supplier.comment = answer ? answer.comment : '';

        const state = data.masters.State.find(element => element.id === idState).shortName;
        const readOnly =
          (state !== 'NOT_STARTED_MANAGER_TEAM' && state !== 'MANAGER_TEAM');

        supplier.visible = true;
        supplier.readOnly = readOnly;
        return supplier;
      });
      data.masters.EvaluationScale = sortByField(data.masters.EvaluationScale, 'score');
      dispatch(getDataManagerTeamSurveySuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getManagerTeamSurvey,
  setAnswer,
  filterManagerTeamSurvey,
};
