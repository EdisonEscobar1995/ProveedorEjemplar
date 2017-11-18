import {
  GET_DATA_SECTOR_PROGRESS,
  GET_DATA_SECTOR_SUCCESS,
  GET_DATA_SECTOR_FAILED,
  SAVE_DATA_SECTOR_FAILED,

} from './const';

const initialState = {
  data: [],
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
    case GET_DATA_SECTOR_FAILED:
    case SAVE_DATA_SECTOR_FAILED:
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
