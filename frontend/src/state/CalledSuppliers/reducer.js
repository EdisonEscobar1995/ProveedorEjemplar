import {
  GET_CALLED_SUPPLIERS_PROGRESS,
  GET_CALLED_SUPPLIERS_SUCCESS,
  SEND_INVITATION_PROGRESS,
  SEND_INVITATION_SUCCESS,
  FILTER_CALLED_SUPPLIERS,
  CLEAR_DATA_CALLED_SUPPLIERS,
  DELETE_SUPPLIER_BY_CALL,
  GET_SUPPLIERS_BY_KEY_PROGRESS,
  GET_SUPPLIERS_BY_KEY_SUCCESS,
  EDIT_SUPPLIER,
  ADD_SUPPLIER,
  UPDATE_SUPPLIER,
  AUTOCOMPLETE_SUPPLIER,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  masters: [],
  fetching: false,
  loading: false,
  autoCompleteData: {},
};

function calledSuppliersApp(state = initialState, action) {
  switch (action.type) {
    case GET_CALLED_SUPPLIERS_PROGRESS:
    case SEND_INVITATION_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case CLEAR_DATA_CALLED_SUPPLIERS: {
      return {
        ...state,
        data: {},
      };
    }
    case GET_CALLED_SUPPLIERS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case GET_SUPPLIERS_BY_KEY_PROGRESS: {
      return {
        ...state,
        fetching: true,
      };
    }
    case AUTOCOMPLETE_SUPPLIER: {
      return {
        ...state,
        autoCompleteData: action.data,
      };
    }
    case EDIT_SUPPLIER: {
      return {
        ...state,
        masters: [],
        autoCompleteData: {},
      };
    }
    case GET_SUPPLIERS_BY_KEY_SUCCESS: {
      return {
        ...state,
        fetching: false,
        masters: action.data,
      };
    }
    case SEND_INVITATION_SUCCESS:
    case REQUEST_FAILED:
    case DELETE_SUPPLIER_BY_CALL:
    case ADD_SUPPLIER:
    case UPDATE_SUPPLIER:
      return {
        ...state,
        loading: false,
      };
    case FILTER_CALLED_SUPPLIERS: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: state.data.suppliers.map((item) => {
            let visible = true;
            if (action.data.sapCode !== '' && !item.sapCode.toLowerCase().includes(action.data.sapCode.toLowerCase())) {
              visible = false;
            } else if (action.data.nit !== '' && !item.nit.toLowerCase().includes(action.data.nit.toLowerCase())) {
              visible = false;
            } else if (action.data.supplier !== '' && !item.businessName.toLowerCase().includes(action.data.supplier.toLowerCase())) {
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
    default: {
      return state;
    }
  }
}

export default calledSuppliersApp;
