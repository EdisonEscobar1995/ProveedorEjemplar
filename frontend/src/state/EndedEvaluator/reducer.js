import {
  GET_ENDED_EVALUATOR_PROGRESS,
  GET_ENDED_EVALUATOR_SUCCESS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: [],
  loading: false,
};

function resultsApp(state = initialState, action) {
  switch (action.type) {
    case GET_ENDED_EVALUATOR_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ENDED_EVALUATOR_SUCCESS: {
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

export default resultsApp;
