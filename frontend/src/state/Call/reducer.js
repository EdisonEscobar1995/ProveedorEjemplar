import {
  GET_DATA_CALL_PROGRESS,
  GET_DATA_CALL_SUCCESS,
  REQUEST_FAILED,
} from './const';
/* import {
  ADD_DATA,
  SAVE_DATA,
  EDIT_DATA,
  DELETE_DATA,
  CANCEL_DATA,
} from '../TableForm/const'; */

const initialState = {
  data: [],
  loading: false,
};

function sectorApp(state = initialState, action) {
  switch (action.type) {
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

export default sectorApp;
