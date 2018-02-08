import {
  GET_DATA_PENDINGS_PROGRESS,
  GET_DATA_PENDINGS_SUCCESS,
  FILTER_PENDINGS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  loading: false,
};

function pendingsApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_PENDINGS_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_PENDINGS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case FILTER_PENDINGS: {
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: state.data.suppliers.map((item) => {
            const {
              supply = '',
              category = '',
              companySize = '',
              supplier = '',
            } = action.data;
            let visible = true;
            if (category !== '' && category !== item.idCategory) {
              visible = false;
            } else if (supplier !== '' && supplier !== item.id) {
              visible = false;
            } else if (supply !== '' && supply !== item.idSupply) {
              visible = false;
            } else if (companySize !== '' && companySize !== item.idCompanySize) {
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

export default pendingsApp;
