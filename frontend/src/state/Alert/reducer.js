import {
  GET_ALERT_PROGRESS,
  GET_ALERT_SUCCESS,
  SAVE_ALERT,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: [],
  searchValue: '',
  loading: false,
};

function alertApp(state = initialState, action) {
  switch (action.type) {
    case GET_ALERT_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ALERT_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case SAVE_ALERT: {
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
