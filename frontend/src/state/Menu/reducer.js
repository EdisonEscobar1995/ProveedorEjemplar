import {
  GET_MENU_PROGRESS,
  GET_MENU_SUCCESS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: [],
  loading: false,
};

function routesApp(state = initialState, action) {
  switch (action.type) {
    case GET_MENU_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MENU_SUCCESS: {
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

export default routesApp;
