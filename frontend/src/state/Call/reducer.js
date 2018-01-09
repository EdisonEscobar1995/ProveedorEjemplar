import {
  GET_DATA_CALL_PROGRESS,
  GET_DATA_CALL_SUCCESS,
  GET_CALL_PROGRESS,
  GET_CALL_SUCCESS,
  REQUEST_FAILED,
  CLEAR_EDIT,
} from './const';

const initialState = {
  data: [],
  editData: {},
  loading: false,
};

function callApp(state = initialState, action) {
  switch (action.type) {
    case GET_CALL_PROGRESS:
    case GET_DATA_CALL_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_CALL_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case GET_CALL_SUCCESS: {
      return {
        ...state,
        editData: action.data,
        loading: false,
      };
    }
    case CLEAR_EDIT: {
      return {
        ...state,
        editData: {},
      };
    }
    case REQUEST_FAILED:
    {
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

export default callApp;
