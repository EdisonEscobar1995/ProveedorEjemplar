import {
  GET_ENDED_EVALUATOR_PROGRESS,
  GET_ENDED_EVALUATOR_SUCCESS,
  CHECK_SUPPLIER,
  UPDATE_ENDED_EVALUATOR,
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
    case CHECK_SUPPLIER: {
      return {
        ...state,
        data: state.data.map(item => (
          item.idSupplier === action.idSupplier ? {
            ...item,
            checked: action.checked,
          } : item
        )),
      };
    }
    case UPDATE_ENDED_EVALUATOR: {
      return {
        ...state,
        data: state.data.filter(item => action.data.indexOf(item.idSupplierByCall) < 0),
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
