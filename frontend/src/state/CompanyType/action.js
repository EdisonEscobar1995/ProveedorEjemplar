import {
  GET_COMPANY_TYPE_PROGRESS,
  GET_COMPANY_TYPE_SUCCESS,
  REQUEST_FAILED,
  ADD_COMPANY_TYPE,
  UPDATE_COMPANY_TYPE,
  DELETE_COMPANY_TYPE,
  SEARCH_COMPANY_TYPE,
  CHANGE_SEARCH_COMPANY_TYPE,
} from './const';

import { getDataCompanyTypesApi, saveDataCompanyTypeApi, deleteDataCompanyTypeApi } from '../../api/companyType';
import { openModal, closeModal } from '../Main/action';
import { requestApi, sortByField } from '../../utils/action';
import blankSpaces from '../../utils/blankSpaces';

function getCompanyTypeProgress() {
  return {
    type: GET_COMPANY_TYPE_PROGRESS,
  };
}

function getCompanyTypeSuccess(data) {
  return {
    type: GET_COMPANY_TYPE_SUCCESS,
    data,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataCompanyType(id, data, remoteId) {
  return {
    type: id ? UPDATE_COMPANY_TYPE : ADD_COMPANY_TYPE,
    data,
    remoteId,
  };
}

function deleteDataCompanyType(data) {
  return {
    type: DELETE_COMPANY_TYPE,
    data,
  };
}

function searchCompanyType(value) {
  return {
    type: SEARCH_COMPANY_TYPE,
    value,
  };
}

function changeSearchCompanyType(value) {
  return {
    type: CHANGE_SEARCH_COMPANY_TYPE,
    value,
  };
}

function getCompanyType() {
  return (dispatch) => {
    requestApi(dispatch, getCompanyTypeProgress, getDataCompanyTypesApi)
      .then((response) => {
        const data =
        sortByField(response.data.data, 'name')
          .map(element => ({
            ...element,
            visible: true,
          }));
        dispatch(getCompanyTypeSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveCompanyType(clientData, remoteId, next) {
  return (dispatch) => {
    if (!blankSpaces(dispatch, clientData.name)) {
      return;
    }
    clientData.name = clientData.name.trim();
    dispatch(closeModal());
    requestApi(dispatch, getCompanyTypeProgress, saveDataCompanyTypeApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataCompanyType(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteCompanyType(clientData) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getCompanyTypeProgress, deleteDataCompanyTypeApi, clientData)
      .then(() => {
        dispatch(deleteDataCompanyType(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getCompanyType,
  saveCompanyType,
  deleteCompanyType,
  searchCompanyType,
  changeSearchCompanyType,
  openModal,
  closeModal,
};

