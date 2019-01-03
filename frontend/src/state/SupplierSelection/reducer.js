import {
  GET_SUPPLIER_SELECTION_PROGRESS,
  GET_SUPPLIER_SELECTION_SUCCESS,
  CHECK_SUPPLIER,
  UPDATE_SUPPLIER_SELECTION,
  REQUEST_FAILED,
  RESET_DATA,
} from './const';

const initialState = {
  data: [],
  loading: false,
};

function resultsApp(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLIER_SELECTION_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_SUPPLIER_SELECTION_SUCCESS: {
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
    case UPDATE_SUPPLIER_SELECTION: {
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
    case RESET_DATA: {
      return {
        ...state,
        data: [],
      };
    }
    default: {
      return state;
    }
  }
}

export default resultsApp;
