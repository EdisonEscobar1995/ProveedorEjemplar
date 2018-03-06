import {
  GET_USER_PROGRESS,
  GET_USER_SUCCESS,
  REQUEST_FAILED,
  ADD_USER,
  SAVE_USER,
  DELETE_USER,
} from './const';

const initialState = {
  data: [],
  masters: {},
  actual: {},
  loading: false,
};

function userApp(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.data,
        masters: action.masters,
        loading: false,
      };
    }
    case ADD_USER: {
      const newData = [...state.data];
      newData.splice(action.index + 1, 0, action.data);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case SAVE_USER: {
      const newData = [...state.data];
      newData[action.index] = action.data;
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case DELETE_USER: {
      const newData = [...state.data];
      newData.splice(action.index, 1);
      return {
        ...state,
        data: newData,
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

export default userApp;
