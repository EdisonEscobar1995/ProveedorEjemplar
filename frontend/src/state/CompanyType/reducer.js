import {
  GET_COMPANY_TYPE_PROGRESS,
  GET_COMPANY_TYPE_SUCCESS,
  REQUEST_FAILED,
  ADD_COMPANY_TYPE,
  UPDATE_COMPANY_TYPE,
  DELETE_COMPANY_TYPE,
  SEARCH_COMPANY_TYPE,
  CHANGE_SEARCH_COMPANY_TYPE,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  searchValue: '',
  loading: false,
};

function companyTypeApp(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_TYPE_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_COMPANY_TYPE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case ADD_COMPANY_TYPE: {
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case UPDATE_COMPANY_TYPE: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case DELETE_COMPANY_TYPE: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
        loading: false,
      };
    }
    case SEARCH_COMPANY_TYPE: {
      return {
        ...state,
        searchValue: action.value,
        data: state.data.map((element) => {
          let visible = true;
          const value = action.value.toLowerCase();
          if (
            action.value !== '' &&
            !element.name.toLowerCase().includes(value)
          ) {
            visible = false;
          }
          return {
            ...element,
            visible,
          };
        }),
      };
    }
    case CHANGE_SEARCH_COMPANY_TYPE: {
      return {
        ...state,
        searchValue: action.value,
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

export default companyTypeApp;
