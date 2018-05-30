import {
  GET_DICTIONARY_PROGRESS,
  GET_DICTIONARY_SUCCESS,
  SAVE_DICTIONARY,
  GET_FIELDS_SUCCESS,
  GET_VALUES_BY_MASTER,
  GET_TRANSLATION_BY_SPANISH_TEXT,
  CLEAN_DATA_MASTER,
  CLEAN_DATA_FIELD,
  CLEAN_DATA_TEXT,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: [],
  masters: [],
  dataMaster: {},
  mastersFields: {},
  fields: [],
  spanishText: [],
  currentMaster: '',
  field: '',
  id: '',
  translate: undefined,
  loading: false,
};

function alertApp(state = initialState, action) {
  switch (action.type) {
    case CLEAN_DATA_MASTER: {
      return {
        ...state,
        fields: [],
        spanishText: [],
        translate: undefined,
        loading: false,
      };
    }
    case CLEAN_DATA_FIELD: {
      return {
        ...state,
        spanishText: [],
        translate: undefined,
      };
    }
    case CLEAN_DATA_TEXT: {
      return {
        ...state,
        translate: undefined,
      };
    }
    case GET_DICTIONARY_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_TRANSLATION_BY_SPANISH_TEXT: {
      return {
        ...state,
        translate: action.translate,
        id: action.id,
        entityId: action.entityId,
        loading: false,
      };
    }
    case GET_VALUES_BY_MASTER: {
      return {
        ...state,
        spanishText: action.values,
        field: action.field,
        loading: false,
      };
    }
    case GET_DICTIONARY_SUCCESS: {
      return {
        ...state,
        data: action.data,
        masters: action.masters,
        mastersFields: action.mastersFields,
        loading: false,
      };
    }
    case GET_FIELDS_SUCCESS: {
      return {
        ...state,
        fields: action.fields,
        currentMaster: action.currentMaster,
        loading: false,
      };
    }
    case SAVE_DICTIONARY: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case REQUEST_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}

export default alertApp;
