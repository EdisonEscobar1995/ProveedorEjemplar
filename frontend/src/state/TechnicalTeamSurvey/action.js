import {
  GET_TECHNICAL_TEAM_SURVEY_PROGRESS,
  GET_TECHNICAL_TEAM_SURVEY_SUCCESS,
  FILTER_TECHNICAL_TEAM_SURVEY,
  CALCULATE_TOTAL,
  CHANGE_SCORE,
  CHANGE_COMMENT,
  UPDATE_ERRORS,
  UPDATE_SUPPLIERS,
  REQUEST_FAILED,
} from './const';

import { getTechnicalTeamSurveyApi } from '../../api/call';
import { saveTechnicalTeamAnswerApi, saveTechnicalTeamCommentApi } from '../../api/technicalTeamAnswer';
import { finishTechnicalTeamSurveyApi } from '../../api/supplier';
import { requestApi, sortByField } from '../../utils/action';
import setMessage from '../Generic/action';

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

const calculateTotal = () => ({
  type: CALCULATE_TOTAL,
});

const changeScore = (idSupplier, id, answer, value) => ({
  type: CHANGE_SCORE,
  idSupplier,
  answer,
  value,
  new: !id,
});

const changeComment = (idSupplier, id, comment, value) => ({
  type: CHANGE_COMMENT,
  idSupplier,
  comment,
  value,
  new: !id,
});

const updateErrors = data => ({
  type: UPDATE_ERRORS,
  data,
});

const updateSuppliers = (idSuppliers, idSuppliersByCall) => ({
  type: UPDATE_SUPPLIERS,
  idSuppliers,
  idSuppliersByCall,
});

const setScore = (idSupplier, value, answer) => (dispatch) => {
  requestApi(dispatch, getDataTechnicalTeamSurveyProgress, saveTechnicalTeamAnswerApi, answer)
    .then((response) => {
      dispatch(changeScore(idSupplier, answer.id, response.data.data, value));
      dispatch(calculateTotal());
    }).catch(() => {
      dispatch(changeScore(idSupplier, answer, null));
      dispatch(getFailedRequest());
    });
};

const setComment = (idSupplier, value, comment) => (dispatch, getState) => {
  const storedValue = getState().technicalTeamSurvey.data.suppliers.find(
    element => element.id === idSupplier).comments.find(
    element => element.idService === comment.idService).value;
  if (storedValue !== value) {
    requestApi(dispatch, getDataTechnicalTeamSurveyProgress, saveTechnicalTeamCommentApi, comment)
      .then((response) => {
        dispatch(changeComment(idSupplier, comment.id, response.data.data, value));
      }).catch(() => {
        dispatch(changeComment(idSupplier, comment, null));
        dispatch(getFailedRequest());
      });
  }
};

const getTechnicalTeamSurvey = year => (dispatch) => {
  requestApi(dispatch, getDataTechnicalTeamSurveyProgress, getTechnicalTeamSurveyApi, year)
    .then((response) => {
      const { data } = response.data;
      data.suppliers = data.suppliers.map((supplier) => {
        const supplierByCall = data.suppliersByCall.find(
          element => element.idSupplier === supplier.id);

        const idSupplierByCall = supplierByCall.id;
        const idState = supplierByCall.idState;

        const items = data.masters.Item.map((item) => {
          const answer = data.masters.TechnicalTeamAnswer
            .find(element =>
              element.idItem === item.id && element.idSupplierByCall === idSupplierByCall);
          const option = answer ?
            data.masters.EvaluationScale
              .find(element => element.id === answer.idEvaluationScale) : null;
          return {
            id: item.id,
            idService: item.idService,
            defaultValue: {
              key: option ? option.id : null,
              name: option ? option.name : null,
            },
            value: option ? option.score : null,
            error: false,
          };
        });

        const comments = [];
        const totals = [];
        data.masters.Service.forEach((service) => {
          const comment = data.masters.TechnicalTeamComment.find(element =>
            element.idSupplierByCall === idSupplierByCall && element.idService === service.id);
          comments.push({
            idService: service.id,
            value: comment ? comment.comment : '',
          });
          totals.push({
            idService: service.id,
            value: null,
          });
        });

        const state = data.masters.State.find(element => element.id === idState).shortName;
        const readOnly =
          (state !== 'NOT_STARTED_TECHNICAL_TEAM' && state !== 'TECHNICAL_TEAM') ||
          (supplierByCall.whoEvaluateOfTechnicalTeam !== '' &&
          supplierByCall.whoEvaluateOfTechnicalTeam !== data.masters.User[0].name);

        const required = !readOnly &&
          supplierByCall.whoEvaluateOfTechnicalTeam === data.masters.User[0].name;

        supplier.visible = true;
        supplier.readOnly = readOnly;
        supplier.required = required;
        supplier.items = items;
        supplier.comments = comments;
        supplier.totals = totals;
        supplier.total = null;
        return supplier;
      });
      data.masters.Service.push({
        id: 'total',
        name: 'Resumen total',
      });
      data.masters.Service.forEach((service, index) => {
        if (service.id !== 'total') {
          data.masters.Item = data.masters.Item.concat([
            {
              idService: service.id,
              id: `comment${index.toString()}`,
              type: 'comment',
              name: 'Comentarios',
            },
            {
              idService: service.id,
              id: `subtotal${index.toString()}`,
              idServiceForTotal: service.id,
              type: 'subtotal',
              name: 'Total',
            },
          ]);
        }
        data.masters.Item.push({
          idService: 'total',
          id: `total${index.toString()}`,
          idServiceForTotal: service.id,
          type: index < data.masters.Service.length - 1 ? 'subtotal' : 'total',
          name: index < data.masters.Service.length - 1 ? service.name : 'Total general',
        });
      });
      data.masters.EvaluationScale = sortByField(data.masters.EvaluationScale, 'score');
      dispatch(getDataTechnicalTeamSurveySuccess(data));
      dispatch(calculateTotal());
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const finishTechnicalTeamSurvey = () => (dispatch, getState) => {
  const { suppliers, suppliersByCall } = getState().technicalTeamSurvey.data;
  const idSuppliersByCall = [];
  const idSuppliers = [];
  const updatedErrors = suppliers.map((supplier) => {
    const updatedError = {
      ...supplier,
      items: supplier.items.map(item => ({
        ...item,
        error: supplier.visible && supplier.required && !item.value,
      })),
    };
    if (supplier.visible && !supplier.readOnly) {
      if (supplier.items.filter(item => item.value).length === supplier.items.length) {
        idSuppliersByCall.push(
          suppliersByCall.find(element => element.idSupplier === supplier.id).id);
        idSuppliers.push(supplier.id);
      }
    }
    return updatedError;
  });

  if (suppliers.filter(element => element.required).length === idSuppliersByCall.length) {
    requestApi(dispatch, getDataTechnicalTeamSurveyProgress, finishTechnicalTeamSurveyApi,
      { idSuppliersByCall })
      .then(() => {
        dispatch(updateErrors(updatedErrors));
        dispatch(updateSuppliers(idSuppliers, idSuppliersByCall));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  } else {
    dispatch(updateErrors(updatedErrors));
    setMessage('Algunos proveedores no han sido calificados completamente', 'error');
  }
};

export {
  getTechnicalTeamSurvey,
  getFailedRequest,
  filterTechnicalTeamSurvey,
  setScore,
  setComment,
  finishTechnicalTeamSurvey,
};
