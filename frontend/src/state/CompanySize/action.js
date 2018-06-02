import {
  GET_COMPANY_SIZE_PROGRESS,
  GET_COMPANY_SIZE_SUCCESS,
  REQUEST_FAILED,
  ADD_COMPANY_SIZE,
  UPDATE_COMPANY_SIZE,
  DELETE_COMPANY_SIZE,
  SEARCH_COMPANY_SIZE,
  CHANGE_SEARCH_COMPANY_SIZE,
} from './const';

import { getDataCompanySizeApi, saveDataCompanySizeApi, deleteDataCompanyTypeApi } from '../../api/companySize';
import { openModal, closeModal } from '../Main/action';
import { requestApi, sortByField } from '../../utils/action';
import blankSpaces from '../../utils/blankSpaces';

function getCompanySizeProgress() {
  return {
    type: GET_COMPANY_SIZE_PROGRESS,
  };
}

function getCompanySizeSuccess(data) {
  return {
    type: GET_COMPANY_SIZE_SUCCESS,
    data,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataCompanySize(id, data, remoteId) {
  return {
    type: id ? UPDATE_COMPANY_SIZE : ADD_COMPANY_SIZE,
    data,
    remoteId,
  };
}

function deleteDataCompanySize(data) {
  return {
    type: DELETE_COMPANY_SIZE,
    data,
  };
}

function searchCompanySize(value) {
  return {
    type: SEARCH_COMPANY_SIZE,
    value,
  };
}

function changeSearchCompanySize(value) {
  return {
    type: CHANGE_SEARCH_COMPANY_SIZE,
    value,
  };
}

function getCompanySize() {
  return (dispatch) => {
    requestApi(dispatch, getCompanySizeProgress, getDataCompanySizeApi)
      .then((response) => {
        const data = sortByField(response.data.data, 'name')
          .map(element => ({
            ...element,
            visible: true,
          }));
        dispatch(getCompanySizeSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveCompanySize(clientData, remoteId, next) {
  return (dispatch) => {
    if (!blankSpaces(dispatch, clientData.name)) {
      return;
    }
    clientData.name = clientData.name.trim();
    dispatch(closeModal());
    requestApi(dispatch, getCompanySizeProgress, saveDataCompanySizeApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataCompanySize(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteCompanySize(clientData) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getCompanySizeProgress, deleteDataCompanyTypeApi, clientData)
      .then(() => {
        dispatch(deleteDataCompanySize(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getCompanySize,
  saveCompanySize,
  deleteCompanySize,
  searchCompanySize,
  changeSearchCompanySize,
  openModal,
  closeModal,
};

