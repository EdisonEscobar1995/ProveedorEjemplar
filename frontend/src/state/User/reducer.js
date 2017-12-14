import {
  GET_USER_CONTEXT_PROGRESS,
  GET_USER_CONTEXT_SUCCESS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  loading: false,
};

function userApp(state = initialState, action) {
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
    default: {
      return state;
    }
  }
}

export default userApp;
