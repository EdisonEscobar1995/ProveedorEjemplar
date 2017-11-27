import {
  GET_DATA_MODIFIED_SUPPLIERS_PROGRESS,
  GET_DATA_MODIFIED_SUPPLIERS_SUCCESS,
  SET_COMPANY_SIZE,
  UNLOCK_SUPPLIER_SUCCESS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
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
    case SET_COMPANY_SIZE: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliersByCall: state.data.suppliersByCall.map(
            item => (
              item.idSupplier === action.data.id ? {
                ...item,
                oldIdCompanySize: action.data.idCompanySize,
              } : item
            ),
          ),
        },
        loading: false,
      };
    }
    case UNLOCK_SUPPLIER_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliersByCall: state.data.suppliersByCall.map(
            item => (
              item.id === action.data.id ? {
                ...item,
                lockedByModification: action.data.lockedByModification,
                dateUnlocked: action.data.dateUnlocked,
              } : item
            ),
          ),
        },
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

export default modifiedSuppliersApp;
