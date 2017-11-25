import {
  GET_DATA_MODIFIED_SUPPLIERS_PROGRESS,
  GET_DATA_MODIFIED_SUPPLIERS_SUCCESS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: [],
  loading: false,
};

function modifiedSuppliersApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_MODIFIED_SUPPLIERS_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_MODIFIED_SUPPLIERS_SUCCESS: {
      return {
        ...state,
        data: action.data,
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

export default modifiedSuppliersApp;
