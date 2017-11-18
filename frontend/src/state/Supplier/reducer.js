import {
  GET_DATA_SUPPLIER_PROGRESS,
  GET_DATA_SUPPLIER_SUCCESS,
  GET_DATA_SUPPLIER_FAILED,
  SAVE_DATA_SUPPLIER_FAILED,
} from './const';

const initialState = {
  supplier: {},
  categories: [],
  loading: false,
};

function supplierApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_SUPPLIER_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_SUPPLIER_SUCCESS: {
      return {
        ...state,
        supplier: action.supplier,
        categories: action.categories,
        companyTypes: action.companyTypes,
        societyTypes: action.societyTypes,
        loading: false,
      };
    }
    case GET_DATA_SUPPLIER_FAILED:
    case SAVE_DATA_SUPPLIER_FAILED:
    {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}

export default supplierApp;
