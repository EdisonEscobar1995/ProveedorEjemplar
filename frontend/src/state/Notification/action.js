import {
  GET_NOTIFICATION_PROGRESS,
  GET_NOTIFICATION_SUCCESS,
  REQUEST_FAILED,
  SAVE_NOTIFICATION,
  CLEAN_DATA,
  GET_NOTIFICATION_BY_ID_SUCCESS,
  UPDATE_NOTIFICATION_ATTACHMENT,
} from './const';

import { getNotificationApi, saveNotificationApi, getNotificationByIdApi } from '../../api/notification';
import { requestApi } from '../../utils/action';

function getNotificationProgress() {
  return {
    type: GET_NOTIFICATION_PROGRESS,
  };
}

function getNotificationSuccess(data) {
  return {
    type: GET_NOTIFICATION_SUCCESS,
    data,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

const saveDataNotification = () => ({
  type: SAVE_NOTIFICATION,
});

function getNotificationByIdSuccess(dataOption) {
  return {
    type: GET_NOTIFICATION_BY_ID_SUCCESS,
    dataOption,
  };
}

const cleanData = () => ({
  type: CLEAN_DATA,
});

function getNotificationById(id) {
  return (dispatch, getState) => {
    requestApi(dispatch, getNotificationProgress, getNotificationByIdApi, id)
      .then((response) => {
        const imagesData = getState().notification.data;
        const { data } = response.data;
        const option = imagesData.find(x => x.id === data.id);
        data.banner = option.banner;
        data.footer = option.footer;
        dispatch(getNotificationByIdSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function getNotification() {
  return (dispatch) => {
    requestApi(dispatch, getNotificationProgress, getNotificationApi)
      .then((response) => {
        const { data } = response.data;
        dispatch(getNotificationSuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

const saveNotification = (clientData, remoteId, next) => (dispatch, getState) => {
  const { dataOption } = getState().notification;
  clientData.idFooter = dataOption.idFooter;
  clientData.idBanner = dataOption.idBanner;
  clientData.withCopy = [];
  clientData.alias = dataOption.alias;
  clientData.name = dataOption.name;
  requestApi(dispatch, getNotificationProgress, saveNotificationApi, clientData)
    .then(() => {
      dispatch(saveDataNotification());
      dispatch(getNotificationById(clientData.id));
      if (next) {
        next();
      }
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const updateImages = (data, dataOption) => ({
  type: UPDATE_NOTIFICATION_ATTACHMENT,
  data,
  dataOption,
});

const updateAttachment = (dataImages, field, file) => (dispatch, getActualState) => {
  const { dataOption, data } = getActualState().notification;
  const notificationIndex = getActualState().notification.data
    .findIndex(x => x.id === dataOption.id);
  if (field === 'idBanner') {
    dataOption.banner = file[0].response.data;
    data[notificationIndex].banner = file[0].response.data;
  } else {
    dataOption.footer = file[0].response.data;
    data[notificationIndex].footer = file[0].response.data;
  }
  if (dataImages) {
    data[notificationIndex][field] = dataImages[0].id;
    dataOption[field] = dataImages[0].id;
  }
  dispatch(updateImages(data, dataOption));
};

const deleteAttachment = (idAttach, field) => (
  (dispatch, getActualState) => {
    const { dataOption, data } = getActualState().notification;
    const notificationIndex = getActualState().notification.data
      .findIndex(x => x.id === dataOption.id);
    if (idAttach) {
      data[notificationIndex][field] = '';
      if (field === 'idBanner') {
        data[notificationIndex].banner = {};
      } else {
        data[notificationIndex].footer = {};
      }
    }
    dispatch(updateImages(data));
  }
);

export {
  getNotification,
  saveNotification,
  getNotificationById,
  cleanData,
  updateAttachment,
  deleteAttachment,
};
