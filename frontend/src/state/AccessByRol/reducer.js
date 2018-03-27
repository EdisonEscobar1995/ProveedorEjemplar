import {
  GET_ACCESS_BY_ROL_PROGRESS,
  GET_ACCESS_BY_ROL_SUCCESS,
  REQUEST_FAILED,
  ADD_ACCESS_BY_ROL,
  UPDATE_ACCESS_BY_ROL,
  DELETE_ACCESS_BY_ROL,
  SEARCH_ACCESS_BY_ROL,
  CHANGE_SEARCH_ACCESS_BY_ROL,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  searchValue: '',
  masters: {},
  loading: false,
};

function accessByRolApp(state = initialState, action) {
  switch (action.type) {
    case GET_ACCESS_BY_ROL_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ACCESS_BY_ROL_SUCCESS: {
      return {
        ...state,
        data: action.data,
        masters: action.masters,
        loading: false,
      };
    }
    case ADD_ACCESS_BY_ROL: {
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case UPDATE_ACCESS_BY_ROL: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case DELETE_ACCESS_BY_ROL: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
        loading: false,
      };
    }
    case SEARCH_ACCESS_BY_ROL: {
      return {
        ...state,
        searchValue: action.value,
        data: state.data.map((element) => {
          let visible = true;
          const value = action.value.toLowerCase();
          if (
            action.value !== '' &&
            !(state.masters.Access.find(item => item.id === element.idAccess).name)
              .toLowerCase().includes(value) &&
            !(state.masters.Roles.find(item => item.id === element.idRol).name)
              .toLowerCase().includes(value)
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
    case CHANGE_SEARCH_ACCESS_BY_ROL: {
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

export default accessByRolApp;
