import {
  GET_DICTIONARY_PROGRESS,
  GET_DICTIONARY_SUCCESS,
  SAVE_DICTIONARY,
  GET_FIELDS_SUCCESS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: [],
  masters: [],
  dataMaster: {},
  mastersFields: {},
  fields: [],
  currentMaster: '',
  loading: false,
};

function alertApp(state = initialState, action) {
  switch (action.type) {
    case GET_DICTIONARY_PROGRESS: {
      return {
        ...state,
        loading: true,
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
