import {
  GET_ALERT_PROGRESS,
  GET_ALERT_SUCCESS,
  SAVE_ALERT,
  REQUEST_FAILED,
} from './const';

import { getAlertApi, saveAlertApi } from '../../api/alert';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';

function getAlertProgress() {
  return {
    type: GET_ALERT_PROGRESS,
  };
}

function getAlertSuccess(data) {
  return {
    type: GET_ALERT_SUCCESS,
    data,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataAlert(id, data, remoteId) {
  return {
    type: SAVE_ALERT,
    data,
    remoteId,
  };
}


function getAlert() {
  return (dispatch) => {
    requestApi(dispatch, getAlertProgress, getAlertApi)
      .then((response) => {
        const data = response.data.data
          .map(element => ({
            ...element,
            visible: true,
          }));
        dispatch(getAlertSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveAlert(clientData, remoteId, next) {
  clientData.active = clientData.active === 'Si';
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getAlertProgress, saveAlertApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataAlert(clientData.id, data, remoteId));
        dispatch(getAlert());
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}


export {
  getAlert,
  saveAlert,
  openModal,
  closeModal,
};

