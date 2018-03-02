import {
  GET_USER_CONTEXT_PROGRESS,
  GET_USER_CONTEXT_SUCCESS,
  TOGGLE_MODAL,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  visibleModal: false,
  component: null,
  loading: false,
};

function mainApp(state = initialState, action) {
  switch (action.type) {
    case GET_USER_CONTEXT_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USER_CONTEXT_SUCCESS: {
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
    case TOGGLE_MODAL:
      return {
        ...state,
        visibleModal: action.visibleModal,
        component: action.component,
      };
    default: {
      return state;
    }
  }
}

export default mainApp;
