import {
  GET_DATA_AGREEMENT_PROGRESS,
  GET_DATA_AGREEMENT_SUCCESS,
  GET_DATA_AGREEMENT_FAILED,
  GET_DATA_SEARCH_AGREEMENT_SUCCESS,
} from './const';
import getDataAgreementApi, { getDataSearchAgreementApi } from '../../api/home';


function getDataAgreementProgress() {
  return {
    type: GET_DATA_AGREEMENT_PROGRESS,
  };
}

function getDataSearchAgreementSuccess({ contentsResult }) {
  return {
    type: GET_DATA_SEARCH_AGREEMENT_SUCCESS,
    contentsResult,
  };
}

function getDataAgreementSuccess({ contentsResult, categories, cities }) {
  return {
    type: GET_DATA_AGREEMENT_SUCCESS,
    contentsResult,
    categories,
    cities,
  };
}

function getDataAgreementFailed() {
  return {
    type: GET_DATA_AGREEMENT_FAILED,
  };
}

function getDataAgreement() {
  return (dispatch) => {
    dispatch(getDataAgreementProgress());
    getDataAgreementApi()
      .then((respose) => {
        const { resultData } = respose.data;
        dispatch(getDataAgreementSuccess(resultData));
      })
      .catch(() => {
        dispatch(getDataAgreementFailed());
      });
  };
}
function getDataSearchAgreement(clientData) {
  return (dispatch) => {
    dispatch(getDataAgreementProgress());
    getDataSearchAgreementApi(clientData)
      .then((respose) => {
        const { resultData } = respose.data;
        dispatch(getDataSearchAgreementSuccess(resultData));
      })
      .catch(() => {
        dispatch(getDataAgreementFailed());
      });
  };
}

export {
  getDataAgreement as default,
  getDataSearchAgreement,
};
