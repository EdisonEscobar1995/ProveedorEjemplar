import {
  GET_DATA_MODIFIED_SUPPLIERS_PROGRESS,
  GET_DATA_MODIFIED_SUPPLIERS_SUCCESS,
  FILTER_SUPPLIERS,
  SET_COMPANY_SIZE,
  UNLOCK_SUPPLIER_SUCCESS,
  REQUEST_FAILED,
} from './const';

import { LOCKED, NOTIFIED } from '../../utils/const';

const initialState = {
  data: {},
  suppliers: [],
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
        suppliers: action.data.suppliers,
        loading: false,
      };
    }
    case FILTER_SUPPLIERS: {
      return {
        ...state,
        suppliers: state.data.suppliers.filter((item) => {
          if (action.data.category !== '' && action.data.category !== item.idCategory) {
            return false;
          }
          if (action.data.country !== '' && action.data.country !== item.idCountry) {
            return false;
          }
          if (action.data.supplier !== '' && action.data.supplier !== item.id) {
            return false;
          }
          if (action.data.supply !== '' && action.data.supply !== item.idSupply) {
            return false;
          }
          const locked = state.data.suppliersByCall
            .find(supplierByCall => supplierByCall.idSupplier === item.id)
            .lockedByModification;
          if ((action.data.state === LOCKED && !locked) ||
            (action.data.state === NOTIFIED && locked)) {
            return false;
          }
          return true;
        }),
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
