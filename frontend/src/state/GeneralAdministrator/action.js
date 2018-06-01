import {
  GET_DATA_GENERAL_ADMINISTRATOR_PROGRESS,
  GET_DATA_GENERAL_ADMINISTRATOR_SUCCESS,
  REQUEST_FAILED,
  UPDATE_ATTACHMENT,
  CLEAN_DATA,
  SAVE_DATA_PROGRESS,
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

const updateAttachment = (data, field, list) => (dispatch, getActualState) => {
  const newDocuments = list.filter(x => x.response);
  const images = getActualState().generalAdministrator.data;
  newDocuments.forEach((document) => {
    images.document.push(document.response.data);
  });
  if (data) {
    images[field] = data;
  }
  dispatch(updateImages(images));
};

const deleteAttachment = (idAttachment, field) => (
  (dispatch, getActualState) => {
    const data = getActualState().generalAdministrator.data;
    data[field] = data[field].filter(attach => attach !== idAttachment);
    data.document = data.document.filter(attach => attach.id !== idAttachment);
    dispatch(updateImages(data));
  }
);

const cleanFields = () => (dispatch) => {
  dispatch(cleanData());
};

const saveDataProgress = () => ({
  type: SAVE_DATA_PROGRESS,
});

const cleanStore = () => ({
  type: CLEAN_STORE,
});

const saveGeneralAdministrator = (clientData, remoteId, next) => (dispatch, getState) => {
  const dataState = getState().generalAdministrator.data;
  const {
    content,
    id,
    informationProgram,
    inputPoll,
    rotationTime,
    title,
    messageByChangeSizeCompany,
    uploadMaxFilesize,
  } = clientData;
  const clientDataNew = {
    ...dataState,
    content,
    id,
    images: dataState.images.length > 0 &&
      dataState.images[0].id ? dataState.images.map(x => x.id) : dataState.images,
    informationProgram,
    inputPoll,
    rotationTime,
    title,
    messageByChangeSizeCompany,
    uploadMaxFilesize,
  };
  requestApi(dispatch, saveDataProgress, saveGeneralAdministratorApi, clientDataNew)
    .then(() => {
      dispatch(getAllGeneralAdministrators());
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
