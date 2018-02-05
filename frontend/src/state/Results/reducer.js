import {
  GET_MASTERS_PROGRESS,
  GET_MASTERS_SUCCESS,
  GET_CRITERIONS_SUCCESS,
  GET_RESULTS_SUCCESS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  loading: false,
};

function resultsApp(state = initialState, action) {
  switch (action.type) {
    case GET_MASTERS_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MASTERS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case GET_CRITERIONS_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          Criterion: action.criterions,
        },
        loading: false,
      };
    }
    case GET_RESULTS_SUCCESS: {
      return {
        ...state,
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
