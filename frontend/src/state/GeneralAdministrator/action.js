import {
  GET_DATA_GENERAL_ADMINISTRATOR_PROGRESS,
  GET_DATA_GENERAL_ADMINISTRATOR_SUCCESS,
  REQUEST_FAILED,
  UPDATE_ATTACHMENT,
  CLEAN_DATA,
  SAVE_DATA_PROGRESS,
  SAVE_DATA_SUCCESS,
  CLEAN_STORE,
} from './const';

import { getGeneralAdministratorApi, saveGeneralAdministratorApi } from '../../api/generalAdministrator';
import { requestApi } from '../../utils/action';

const getDataGeneralAdministratorProgress = () => ({
  type: GET_DATA_GENERAL_ADMINISTRATOR_PROGRESS,
});

const getDataGeneralAdministratorSuccess = data => ({
  type: GET_DATA_GENERAL_ADMINISTRATOR_SUCCESS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const cleanData = () => ({
  type: CLEAN_DATA,
});

const updateImages = images => ({
  type: UPDATE_ATTACHMENT,
  images,
});

const getAllGeneralAdministrators = () => (dispatch) => {
  requestApi(dispatch, getDataGeneralAdministratorProgress, getGeneralAdministratorApi)
    .then((response) => {
      const { data } = response.data;
      dispatch(getDataGeneralAdministratorSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const updateAttachment = (data, field) => (dispatch, getActualState) => {
  const images = getActualState().generalAdministrator.data;
  if (data) {
    images[field] = data;
  }
  dispatch(updateImages(images));
};

const deleteAttachment = (idAttachment, field) => (
  (dispatch, getActualState) => {
    const data = getActualState().generalAdministrator.data;
    data[field] = data[field].filter(attach => attach !== idAttachment);
    dispatch(updateImages(data));
  }
);

const cleanFields = () => (dispatch) => {
  dispatch(cleanData());
};

const saveDataProgress = () => ({
  type: SAVE_DATA_PROGRESS,
});

const saveDataSuccess = data => ({
  type: SAVE_DATA_SUCCESS,
  data,
});

const cleanStore = () => ({
  type: CLEAN_STORE,
});

const saveGeneralAdministrator = (clientData, remoteId, next) => (dispatch, getState) => {
  const dataState = getState().generalAdministrator.data.images;
  const {
    content,
    id,
    informationProgram,
    inputPoll,
    rotationTime,
    title,
    uploadMaxFilesize,
  } = clientData;
  const clientDataNew = {
    ...dataState,
    content,
    id,
    images: dataState.images && dataState.images.map(x => x.id),
    informationProgram,
    inputPoll,
    rotationTime,
    title,
    uploadMaxFilesize,
  };
  requestApi(dispatch, saveDataProgress, saveGeneralAdministratorApi, clientDataNew)
    .then((response) => {
      const { data } = response.data;
      dispatch(saveDataSuccess(clientData.id, data, remoteId));
      if (next) {
        next();
      }
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getAllGeneralAdministrators,
  cleanFields,
  updateAttachment,
  deleteAttachment,
  saveGeneralAdministrator,
  cleanStore,
};
