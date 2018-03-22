import {
  GET_USER_PROGRESS,
  GET_USER_SUCCESS,
  REQUEST_FAILED,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SEARCH_USER,
  CHANGE_SEARCH_USER,
  GET_USERS_BY_KEY_PROGRESS,
  GET_USERS_BY_KEY_SUCCESS,
  EDIT_USER,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  searchValue: '',
  masters: {},
  loading: false,
  fetching: false,
};

function userApp(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.data,
        masters: action.masters,
        loading: false,
      };
    }
    case ADD_USER: {
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
        loading: false,
      };
    }
    case SEARCH_USER: {
      return {
        ...state,
        searchValue: action.value,
        data: state.data.map((element) => {
          let visible = true;
          const value = action.value.toLowerCase();
          if (
            action.value !== '' &&
            !element.name.toLowerCase().includes(value) &&
            !element.email.toLowerCase().includes(value)
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
    case CHANGE_SEARCH_USER: {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    case GET_USERS_BY_KEY_PROGRESS: {
      return {
        ...state,
        fetching: true,
      };
    }
    case GET_USERS_BY_KEY_SUCCESS: {
      return {
        ...state,
        fetching: false,
        masters: {
          ...state.masters,
          Users: action.data,
        },
      };
    }
    case EDIT_USER: {
      return {
        ...state,
        masters: {
          ...state.masters,
          Users: [],
        },
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

export default userApp;
