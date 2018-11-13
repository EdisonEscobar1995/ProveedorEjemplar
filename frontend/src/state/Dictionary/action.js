import {
  GET_DICTIONARY_PROGRESS,
  GET_DICTIONARY_SUCCESS,
  GET_FIELDS_SUCCESS,
  GET_VALUES_BY_MASTER,
  GET_TRANSLATION_BY_SPANISH_TEXT,
  CLEAN_DATA_MASTER,
  CLEAN_DATA_FIELD,
  CLEAN_DATA_TEXT,
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
import setMessage from '../Generic/action';

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

const cleanDataMaster = () => ({
  type: CLEAN_DATA_MASTER,
});

const getFieldsByMaster = master => (dispatch, getState) => {
  try {
    const mastersFields = getState().dictionary.mastersFields;
    dispatch(cleanDataMaster());
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
  } catch (error) {
    dispatch(getFailedRequest());
  }
};

const cleanDataSpanishText = () => ({
  type: CLEAN_DATA_TEXT,
});

const getTranslationBySpanishTextSuccess = (translate, id, entityId) => ({
  type: GET_TRANSLATION_BY_SPANISH_TEXT,
  translate,
  id,
  entityId,
});

const getTranslationBySpanishText = value => (dispatch, getState) => {
  try {
    const data = getState().dictionary.data;
    const field = getState().dictionary.field;
    dispatch(cleanDataSpanishText());
    const translationObject = data
      .find(x => x.entityId === value && x.name === field);
    let translate = '';
    let id = '';
    let entityId;
    if (translationObject) {
      translate = translationObject.value;
      id = translationObject.id;
      entityId = translationObject.entityId;
    } else {
      entityId = value;
    }
    dispatch(getTranslationBySpanishTextSuccess(translate, id, entityId));
  } catch (error) {
    dispatch(getFailedRequest());
  }
};

const getValuesSuccess = (values, field) => ({
  type: GET_VALUES_BY_MASTER,
  values,
  field,
});

const cleanDataField = () => ({
  type: CLEAN_DATA_FIELD,
});

const getValuesByField = field => (dispatch, getState) => {
  const currentMaster = getState().dictionary.currentMaster;
  dispatch(cleanDataField());
  requestApi(dispatch, getDictionaryProgress, getAllValuesByFieldApi, currentMaster)
    .then((response) => {
      const data = response.data.data;
      const valuesByField =
      data
        .filter(x => x[field] !== '')
        .map(x => ({
          id: x.id,
          name: x[field],
        }));
      dispatch(getValuesSuccess(valuesByField, field));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const saveDataDictionarySuccess = () => ({
  type: CLEAN_DATA_MASTER,
});

function saveDictionary(clientData, remoteId, next) {
  return (dispatch, getState) => {
    const pattern = new RegExp(/^\s+$/);
    if (pattern.test(clientData.value)) {
      dispatch(setMessage('La traducción no puede contener espacios solamente', 'info'));
      return;
    }
    const dataStore = getState().dictionary;
    const dataObject = {
      id: dataStore.id,
      language: clientData.language,
      entity: clientData.entity,
      entityId: dataStore.entityId,
      name: clientData.name,
      value: clientData.value,
    };
    dispatch(closeModal());
    requestApi(dispatch, getDictionaryProgress, saveTranslationApi, dataObject)
      .then(() => {
        dispatch(saveDataDictionarySuccess());
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
  cleanDataMaster,
  getValuesByField,
  getTranslationBySpanishText,
  openModal,
  closeModal,
};

