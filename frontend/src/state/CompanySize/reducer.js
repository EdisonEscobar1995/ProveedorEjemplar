import {
  GET_COMPANY_SIZE_PROGRESS,
  GET_COMPANY_SIZE_SUCCESS,
  REQUEST_FAILED,
  ADD_COMPANY_SIZE,
  UPDATE_COMPANY_SIZE,
  DELETE_COMPANY_SIZE,
  SEARCH_COMPANY_SIZE,
  CHANGE_SEARCH_COMPANY_SIZE,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  searchValue: '',
  loading: false,
};

function companySizeApp(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_SIZE_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_COMPANY_SIZE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case ADD_COMPANY_SIZE: {
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case UPDATE_COMPANY_SIZE: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case DELETE_COMPANY_SIZE: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
        loading: false,
      };
    }
    case SEARCH_COMPANY_SIZE: {
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
    case CHANGE_SEARCH_COMPANY_SIZE: {
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

export default companySizeApp;
