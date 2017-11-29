import {
  GET_SUPPLIERS_BY_CALL_PROGRESS,
  GET_SUPPLIERS_BY_CALL_SUCCESS,
  REQUEST_SUPPLIERS_FAILED,
  FILTER_SUPPLIERS,
  GET_DATA_CALL_PROGRESS,
  GET_DATA_CALL_SUCCESS,
  GET_CALL_PROGRESS,
  GET_CALL_SUCCESS,
  CLEAR_EDIT,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: [],
  editData: {},
  suppliersData: {},
  suppliers: [],
  loading: false,
  loadingSuppliers: false,
};

function callApp(state = initialState, action) {
  switch (action.type) {
    case GET_CALL_PROGRESS:
    case GET_DATA_CALL_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_CALL_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case GET_CALL_SUCCESS: {
      return {
        ...state,
        editData: action.data,
        loading: false,
      };
    }
    case CLEAR_EDIT: {
      return {
        ...state,
        editData: {},
      };
    }
    case REQUEST_FAILED:
    {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_SUPPLIERS_BY_CALL_PROGRESS: {
      return {
        ...state,
        loadingSuppliers: true,
      };
    }
    case GET_SUPPLIERS_BY_CALL_SUCCESS: {
      return {
        ...state,
        suppliersData: action.data,
        suppliers: action.data.suppliers,
        loadingSuppliers: false,
      };
    }
    case REQUEST_SUPPLIERS_FAILED:
    {
      return {
        ...state,
        loadingSuppliers: false,
      };
    }
    case FILTER_SUPPLIERS:
    {
      return {
        ...state,
        suppliers: state.suppliersData.suppliers.filter((item) => {
          if (action.data.sapCode !== '' && !item.sapCode.toLowerCase().includes(action.data.sapCode)) {
            return false;
          } else if (action.data.nit !== '' && !item.nit.toLowerCase().includes(action.data.nit)) {
            return false;
          } else if (action.data.supplier !== '' && !item.businessName.toLowerCase().includes(action.data.supplier)) {
            return false;
          }
          return true;
        }),
      };
    }
    default: {
      return state;
    }
  }
}

export default callApp;
