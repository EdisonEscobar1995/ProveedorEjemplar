import {
  GET_SECTOR_PROGRESS,
  GET_SECTOR_SUCCESS,
  REQUEST_FAILED,
  ADD_SECTOR,
  UPDATE_SECTOR,
  DELETE_SECTOR,
  SEARCH_SECTOR,
  CHANGE_SEARCH_SECTOR,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  searchValue: '',
  loading: false,
};

function sectorApp(state = initialState, action) {
  switch (action.type) {
    case GET_SECTOR_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_SECTOR_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case ADD_SECTOR: {
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case UPDATE_SECTOR: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case DELETE_SECTOR: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
        loading: false,
      };
    }
    case SEARCH_SECTOR: {
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
    case CHANGE_SEARCH_SECTOR: {
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

export default sectorApp;
