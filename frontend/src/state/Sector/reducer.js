import {
  GET_DATA_SECTOR_PROGRESS,
  GET_DATA_SECTOR_SUCCESS,
  SAVE_DATA_SECTOR_SUCCESS,
  DELETE_DATA_SECTOR_SUCCESS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: [],
  actual: {},
  loading: false,
};

function sectorApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_SECTOR_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_SECTOR_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case SAVE_DATA_SECTOR_SUCCESS: {
      return {
        ...state,
        actual: action.actual,
        loading: false,
      };
    }
    case DELETE_DATA_SECTOR_SUCCESS: {
      return {
        ...state,
        loading: false,
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
