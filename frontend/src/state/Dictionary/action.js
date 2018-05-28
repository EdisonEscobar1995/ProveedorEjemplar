import {
  GET_DICTIONARY_PROGRESS,
  GET_DICTIONARY_SUCCESS,
  SAVE_DICTIONARY,
  GET_FIELDS_SUCCESS,
  REQUEST_FAILED,
} from './const';

import { getAllTranslationApi, getMastersWithFieldsToTranslateApi, saveTranslationApi } from '../../api/translation';
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

const setFieldsSuccess = fields => ({
  type: GET_FIELDS_SUCCESS,
  fields,
});

const getFieldsByMaster = master => (dispatch, getState) => {
  const mastersFields = getState().dictionary.mastersFields;
  const fields = {
    id: mastersFields[master],
    name: mastersFields[master],
  };
  dispatch(setFieldsSuccess(fields));
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
  openModal,
  closeModal,
};

