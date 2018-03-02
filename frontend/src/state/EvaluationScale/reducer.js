import {
  GET_EVALUATION_SCALE_PROGRESS,
  GET_EVALUATION_SCALE_SUCCESS,
  REQUEST_FAILED,
  ADD_EVALUATION_SCALE,
  SAVE_EVALUATION_SCALE,
  DELETE_EVALUATION_SCALE,
} from './const';

const initialState = {
  data: [],
  actual: {},
  loading: false,
};

function evaluationScaleApp(state = initialState, action) {
  switch (action.type) {
    case GET_EVALUATION_SCALE_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_EVALUATION_SCALE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case ADD_EVALUATION_SCALE: {
      const newData = [...state.data];
      newData.splice(action.index + 1, 0, action.data);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case SAVE_EVALUATION_SCALE: {
      const newData = [...state.data];
      newData[action.index] = action.data;
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case DELETE_EVALUATION_SCALE: {
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

export default evaluationScaleApp;
