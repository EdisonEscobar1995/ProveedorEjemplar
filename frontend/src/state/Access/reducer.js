import {
  GET_ACCESS_PROGRESS,
  GET_ACCESS_SUCCESS,
  REQUEST_FAILED,
  ADD_ACCESS,
  UPDATE_ACCESS,
  DELETE_ACCESS,
  SEARCH_ACCESS,
  CHANGE_SEARCH_ACCESS,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  searchValue: '',
  loading: false,
};

function accessApp(state = initialState, action) {
  switch (action.type) {
    case GET_ACCESS_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ACCESS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case ADD_ACCESS: {
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case UPDATE_ACCESS: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case DELETE_ACCESS: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
        loading: false,
      };
    }
    case SEARCH_ACCESS: {
      return {
        ...state,
        searchValue: action.value,
        data: state.data.map((element) => {
          let visible = true;
          const value = action.value.toLowerCase();
          if (
            action.value !== '' &&
            !element.api.toLowerCase().includes(value) &&
            !element.action.toLowerCase().includes(value)
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
    case CHANGE_SEARCH_ACCESS: {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    case REQUEST_FAILED:
    {
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

export default accessApp;
