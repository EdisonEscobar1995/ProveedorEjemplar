import {
  GET_CALLED_SUPPLIERS_PROGRESS,
  GET_CALLED_SUPPLIERS_SUCCESS,
  SEND_INVITATION_PROGRESS,
  SEND_INVITATION_SUCCESS,
  FILTER_CALLED_SUPPLIERS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  loading: false,
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
    case GET_CALLED_SUPPLIERS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case SEND_INVITATION_SUCCESS:
    case REQUEST_FAILED:
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
