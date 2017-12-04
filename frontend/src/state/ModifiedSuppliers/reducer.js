import {
  GET_DATA_MODIFIED_SUPPLIERS_PROGRESS,
  GET_DATA_MODIFIED_SUPPLIERS_SUCCESS,
  FILTER_MODIFIED_SUPPLIERS,
  SET_COMPANY_SIZE,
  UNLOCK_SUPPLIER_SUCCESS,
  REQUEST_FAILED,
} from './const';

import { LOCKED, NOTIFIED } from '../../utils/const';

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
    case FILTER_MODIFIED_SUPPLIERS: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: state.data.suppliers.map((item) => {
            const locked = state.data.suppliersByCall
              .find(supplierByCall => supplierByCall.idSupplier === item.id)
              .lockedByModification;
            let visible = true;
            if (action.data.category !== '' && action.data.category !== item.idCategory) {
              visible = false;
            } else if (action.data.country !== '' && action.data.country !== item.idCountry) {
              visible = false;
            } else if (action.data.supplier !== '' && action.data.supplier !== item.id) {
              visible = false;
            } else if (action.data.supply !== '' && action.data.supply !== item.idSupply) {
              visible = false;
            } else if ((action.data.state === LOCKED && !locked) ||
              (action.data.state === NOTIFIED && locked)) {
              visible = false;
            }
            return {
              ...item,
              visible,
            };
          }),
        },
      };
    }
    case SET_COMPANY_SIZE: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: state.data.suppliers.map(
            item => (
              item.id === action.data.id ? {
                ...item,
                idCompanySize: action.data.idCompanySize,
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
