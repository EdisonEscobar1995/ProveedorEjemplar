import {
  GET_MENU_PROGRESS,
  GET_MENU_SUCCESS,
  REQUEST_FAILED,
  ADD_MENU,
  UPDATE_MENU,
  DELETE_MENU,
  SEARCH_MENU,
  CHANGE_SEARCH_MENU,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  searchValue: '',
  masters: {},
  loading: false,
};

function menuApp(state = initialState, action) {
  switch (action.type) {
    case GET_MENU_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MENU_SUCCESS: {
      return {
        ...state,
        data: action.data,
        masters: action.masters,
        loading: false,
      };
    }
    case ADD_MENU: {
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case UPDATE_MENU: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case DELETE_MENU: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
        loading: false,
      };
    }
    case SEARCH_MENU: {
      return {
        ...state,
        searchValue: action.value,
        data: state.data.map((element) => {
          let visible = true;
          const value = action.value.toLowerCase();
          if (
            action.value !== '' &&
            !(state.masters.Call.find(item => item.id === element.idCall).name)
              .toLowerCase().includes(value) &&
            !(state.masters.User.find(item => item.id === element.idUser).name)
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
    case CHANGE_SEARCH_MENU: {
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

export default menuApp;
