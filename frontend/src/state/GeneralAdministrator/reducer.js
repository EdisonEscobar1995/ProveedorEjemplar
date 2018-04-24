import {
  GET_DATA_GENERAL_ADMINISTRATOR_PROGRESS,
  GET_DATA_GENERAL_ADMINISTRATOR_SUCCESS,
  REQUEST_FAILED,
  CLEAR_EDIT,
} from './const';

const initialState = {
  data: [],
  editData: {},
  loading: false,
};

function generalAdministratorApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_GENERAL_ADMINISTRATOR_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_GENERAL_ADMINISTRATOR_SUCCESS: {
      return {
        ...state,
        data: action.data,
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

export default generalAdministratorApp;
