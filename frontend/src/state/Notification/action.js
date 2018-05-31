import {
  GET_NOTIFICATION_PROGRESS,
  GET_NOTIFICATION_SUCCESS,
  REQUEST_FAILED,
  SAVE_NOTIFICATION,
  CLEAN_DATA,
  GET_NOTIFICATION_BY_ID_SUCCESS,
  UPDATE_NOTIFICATION_ATTACHMENT,
  GET_USERS_BY_KEY_NOTIFICATION_SUCCESS,
  GET_USERS_NOTIFICATION_SUCCESS,
  GET_USERS_BY_KEY_NOTIFICATION_PROGRESS,
} from './const';

import { getNotificationApi, saveNotificationApi, getNotificationByIdApi } from '../../api/notification';
import { getUsersApi, getUsersByKeyApi } from '../../api/user';
import { requestApi } from '../../utils/action';
import setMessage from '../Generic/action';

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

const getUserSuccess = data => ({
  type: GET_USERS_NOTIFICATION_SUCCESS,
  data,
});

const getUsers = () => (dispatch) => {
  requestApi(dispatch, getNotificationProgress, getUsersApi)
    .then((response) => {
      const data = response.data.data.map(element => ({
        ...element,
        visible: true,
      }));
      dispatch(getUserSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

function getUsersByKeySuccess(data) {
  return {
    type: GET_USERS_BY_KEY_NOTIFICATION_SUCCESS,
    data,
  };
}

function getUsersBykeyProgress() {
  return {
    type: GET_USERS_BY_KEY_NOTIFICATION_PROGRESS,
  };
}

function getUsersByKey(value) {
  return (dispatch) => {
    requestApi(dispatch, getUsersBykeyProgress, getUsersByKeyApi, value)
      .then((response) => {
        const data = response.data.data.map(element => ({
          ...element,
          id: element.email === '' ? element.name : element.email,
        }));
        dispatch(getUsersByKeySuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

const saveNotification = (clientData, remoteId, next) => (dispatch, getState) => {
  const { dataOption } = getState().notification;
  const pattern = new RegExp(/^\s+$/);
  if (pattern.test(clientData.subject)) {
    dispatch(setMessage('El asunto no puede contener espacios solamente', 'info'));
    return;
  }
  clientData.idFooter = dataOption.idFooter;
  clientData.idBanner = dataOption.idBanner;
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
        data[notificationIndex].banner = {
          id: '',
          name: '',
          url: '',
        };
        dataOption.idBanner = '';
        dataOption.banner = {
          id: '',
          name: '',
          url: '',
        };
      } else {
        data[notificationIndex].footer = {
          id: '',
          name: '',
          url: '',
        };
        dataOption.idFooter = '';
        dataOption.footer = {
          id: '',
          name: '',
          url: '',
        };
      }
    }
    dispatch(updateImages(data, dataOption));
  }
);

export {
  getNotification,
  saveNotification,
  getNotificationById,
  cleanData,
  updateAttachment,
  deleteAttachment,
  getUsers,
  getUsersByKey,
};
