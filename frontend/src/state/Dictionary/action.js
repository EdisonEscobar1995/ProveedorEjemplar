import {
  GET_DICTIONARY_PROGRESS,
  GET_DICTIONARY_SUCCESS,
  SAVE_DICTIONARY,
  GET_FIELDS_SUCCESS,
  GET_VALUES_BY_MASTER,
  REQUEST_FAILED,
} from './const';

import {
  getAllTranslationApi,
  getMastersWithFieldsToTranslateApi,
  saveTranslationApi,
  getAllValuesByFieldApi,
} from '../../api/translation';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';

function getDictionaryProgress() {
  return {
    type: GET_DICTIONARY_PROGRESS,
  };
}

function getDictionarySuccess(data, masters, mastersFields) {
  return {
    type: GET_DICTIONARY_SUCCESS,
    data,
    masters,
    mastersFields,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataDictionary(id, data, remoteId) {
  return {
    type: SAVE_DICTIONARY,
    data,
    remoteId,
  };
}

function getDictionary() {
  return (dispatch) => {
    requestApi(dispatch, getDictionaryProgress, getAllTranslationApi)
      .then((responseAll) => {
        requestApi(dispatch, getDictionaryProgress, getMastersWithFieldsToTranslateApi)
          .then((response) => {
            const mastersFields = response.data.data;
            const masters = Object.keys(mastersFields)
              .map(master => ({
                id: master,
                name: master,
              }));
            const data = responseAll.data.data;
            dispatch(getDictionarySuccess(data, masters, mastersFields));
          });
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

const setFieldsSuccess = (fields, currentMaster) => ({
  type: GET_FIELDS_SUCCESS,
  fields,
  currentMaster,
});

const getFieldsByMaster = master => (dispatch, getState) => {
  const mastersFields = getState().dictionary.mastersFields;
  const fields = [];
  if (mastersFields[master]) {
    mastersFields[master].forEach((x) => {
      const field = {
        id: x,
        name: x,
      };
      fields.push(field);
    });
  }
  dispatch(setFieldsSuccess(fields, master));
};

const getValuesSuccess = values => ({
  type: GET_VALUES_BY_MASTER,
  values,
});

const getValuesByField = field => (dispatch, getState) => {
  const currentMaster = getState().dictionary.currentMaster;
  requestApi(dispatch, getDictionaryProgress, getAllValuesByFieldApi, currentMaster)
    .then((response) => {
      const data = response.data.data;
      const valuesByField = data.map(x => x[field]);
      dispatch(getValuesSuccess(valuesByField));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

function saveDictionary(clientData, remoteId, next) {
  clientData.active = clientData.active === 'Si';
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getDictionaryProgress, saveTranslationApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataDictionary(clientData.id, data, remoteId));
        dispatch(getDictionary());
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}


export {
  getDictionary,
  saveDictionary,
  getFieldsByMaster,
  getValuesByField,
  openModal,
  closeModal,
};

