import {
  GET_MASTERS_PROGRESS,
  GET_MASTERS_SUCCESS,
  GET_CRITERIONS_SUCCESS,
  GET_ITEMS_SUCCESS,
  CHANGE_TYPE,
  GET_RESULTS_SUCCESS,
  GET_MANAGER_REPORT_SUCCESS,
  RESET_QUESTIONS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  type: '',
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
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          Item: action.items,
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
    case GET_MANAGER_REPORT_SUCCESS: {
      return {
        ...state,
        loading: false,
        questions: action.questions,
      };
    }
    case RESET_QUESTIONS: {
      return {
        ...state,
        questions: [],
      };
    }
    case CHANGE_TYPE: {
      return {
        ...state,
        data: {
          ...state.data,
          Criterion: [],
          Item: [],
        },
        type: action.value,
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
