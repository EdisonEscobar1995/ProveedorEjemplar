import { notification } from 'antd';
import {
  GET_MANAGER_TEAM_SURVEY_PROGRESS,
  GET_MANAGER_TEAM_SURVEY_SUCCESS,
  FINISH_MANAGER_TEAM_SURVEY_PROGRESS,
  FINISH_MANAGER_TEAM_SURVEY_SUCCESS,
  FILTER_MANAGER_TEAM_SURVEY,
  CHANGE_COMMENT_MANAGER,
  CHANGE_SCORE_MANAGER,
  REQUEST_FAILED,
} from './const';

import { getManagerTeamSurveyApi } from '../../api/call';
import saveManagerTeamAnswerApi from '../../api/managerTeamAnswer';
import { finishManagerTeamSurveyApi } from '../../api/supplier';
import { requestApi, sortByField } from '../../utils/action';
import setMessage from '../Generic/action';

const getDataManagerTeamSurveyProgress = () => ({
  type: GET_MANAGER_TEAM_SURVEY_PROGRESS,
});

const getDataManagerTeamSurveySuccess = data => ({
  type: GET_MANAGER_TEAM_SURVEY_SUCCESS,
  data,
});

const finishManagerTeamSurveyProgress = data => ({
  type: FINISH_MANAGER_TEAM_SURVEY_PROGRESS,
  data,
});

const finishManagerTeamSurveySuccess = () => ({
  type: FINISH_MANAGER_TEAM_SURVEY_SUCCESS,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const filterManagerTeamSurvey = data => ({
  type: FILTER_MANAGER_TEAM_SURVEY,
  data,
});

const changeScore = (idSupplier, id, score, value) => ({
  type: CHANGE_SCORE_MANAGER,
  idSupplier,
  score,
  value,
  new: !id,
});

const changeComment = (idSupplier, id, comment, value) => ({
  type: CHANGE_COMMENT_MANAGER,
  idSupplier,
  comment,
  value,
  new: !id,
});

const openNotificationWithIcon = (type) => {
  let messageToShow = '';
  let descriptionToShow = '';

  switch (type) {
    case 'success':
      messageToShow = 'Guardado exitoso';
      descriptionToShow = 'Respuesta guardada.';
      break;
    case 'error':
    default:
      messageToShow = 'Error guardando';
      descriptionToShow = 'La respuesta no pudo ser guardada';
      break;
  }

  notification[type]({
    message: messageToShow,
    description: descriptionToShow,
  });
};


const setScore = (idSupplier, value, answer) => (dispatch) => {
  requestApi(dispatch, getDataManagerTeamSurveyProgress, saveManagerTeamAnswerApi, answer)
    .then((response) => {
      dispatch(changeScore(idSupplier, answer.id, response.data.data, value));
      openNotificationWithIcon('success');
    }).catch(() => {
      dispatch(changeScore(idSupplier, answer.id, answer, null));
      dispatch(getFailedRequest());
    });
};

const setComment = (idSupplier, value, answer) => (dispatch, getState) => {
  const storedComment = getState()
    .managerTeamSurvey.data.suppliers.find(element => element.id === idSupplier).comment.value;
  if (storedComment !== value) {
    requestApi(dispatch, getDataManagerTeamSurveyProgress, saveManagerTeamAnswerApi, answer)
      .then((response) => {
        dispatch(changeComment(idSupplier, answer.id, response.data.data, value));
        openNotificationWithIcon('success');
      }).catch(() => {
        dispatch(changeComment(idSupplier, answer.id, answer, null));
        dispatch(getFailedRequest());
      });
  }
};

const getManagerTeamSurvey = year => (dispatch) => {
  requestApi(dispatch, getDataManagerTeamSurveyProgress, getManagerTeamSurveyApi, year)
    .then((response) => {
      const { data, rules } = response.data;
      let rol;
      let supplierAux = [...data.suppliers];
      supplierAux = supplierAux.map((supplier) => {
        const idState = data.suppliersByCall.find(
          element => element.idSupplier === supplier.id).idState;
        const state = data.masters.State.find(element => element.id === idState).shortName;
        let readOnly =
          (state !== 'NOT_STARTED_MANAGER_TEAM' && state !== 'MANAGER_TEAM');
        data.masters.User[0].idRols.forEach((idRol) => {
          rol = data.masters.Rol
            .find(element => element.id === idRol).shortName;
          if (rol !== 'MANAGER_TEAM') {
            readOnly = rules.liberator.readOnly;
          }
        });
        supplier.score = {
          defaultValue: {
            key: null,
            name: null,
          },
          value: null,
          error: false,
        };
        supplier.comment = { value: '', error: false };
        supplier.visible = true;
        supplier.whoEvaluate = null;
        supplier.idState = idState;
        supplier.readOnly = readOnly;
        return supplier;
      });
      let idx = 0;
      data.masters.ManagerTeamAnswer.forEach((managerAnswer) => {
        const supplierByCall = data.suppliersByCall
          .find(call => call.id === managerAnswer.idSupplierByCall);
        const idSupplier = supplierByCall.idSupplier;
        const idSupplierByCall = supplierByCall.id;
        const idState = supplierByCall.idState;

        const supplier =
          Object.assign({}, data.suppliers.find(element => element.id === idSupplier));
        const index = supplierAux
          .indexOf(data.suppliers.find(element => element.id === idSupplier));
        if (index !== -1) {
          supplierAux.splice(index, 1);
        }
        const answers = data.masters.ManagerTeamAnswer
          .filter(element => element.idSupplierByCall === idSupplierByCall);
        idx = idx >= answers.length ? 0 : idx;
        const answer = answers[idx];
        idx += 1;
        const option = answer ?
          data.masters.EvaluationScale
            .find(element => element.id === answer.idEvaluationScale) : null;

        const state = data.masters.State.find(element => element.id === idState).shortName;
        let readOnly =
          (state !== 'NOT_STARTED_MANAGER_TEAM' && state !== 'MANAGER_TEAM');
        data.masters.User[0].idRols.forEach((idRol) => {
          rol = data.masters.Rol
            .find(element => element.id === idRol).shortName;
          if (rol !== 'MANAGER_TEAM') {
            readOnly = rules.liberator.readOnly;
          }
        });

        supplier.score = {
          defaultValue: {
            key: option ? option.id : null,
            name: option ? option.name : null,
          },
          value: option ? option.score : null,
          error: false,
        };
        supplier.comment = { value: answer ? answer.comment : '', error: false };
        supplier.visible = true;
        supplier.readOnly = readOnly;
        supplier.idState = idState;
        supplier.whoEvaluate = answer.whoEvaluate;
        supplierAux.push(supplier);
      });
      data.suppliers = supplierAux;
      data.finishVisible = rol === 'LIBERATOR' || rol === 'ADMINISTRATOR';
      data.yearCall = year !== undefined ? year : data.years[0];
      data.masters.EvaluationScale = sortByField(data.masters.EvaluationScale, 'score');
      dispatch(getDataManagerTeamSurveySuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const finishManagerTeamSurvey = () => (dispatch) => {
  requestApi(dispatch, finishManagerTeamSurveyProgress, finishManagerTeamSurveyApi)
    .then((response) => {
      const message = parseInt(response.data.notice, 10) !== 1
        ? `Se han finalizado las respuestas de ${response.data.notice} proveedores.`
        : `Se ha finalizado la respuesta de ${response.data.notice} proveedor.`;
      dispatch(finishManagerTeamSurveySuccess());
      dispatch(setMessage(message, 'success'));
      dispatch(getManagerTeamSurvey());
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getManagerTeamSurvey,
  setScore,
  setComment,
  filterManagerTeamSurvey,
  finishManagerTeamSurvey,
};
