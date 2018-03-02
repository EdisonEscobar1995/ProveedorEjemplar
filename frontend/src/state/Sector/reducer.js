import {
  GET_SECTOR_PROGRESS,
  GET_SECTOR_SUCCESS,
  REQUEST_FAILED,
  ADD_SECTOR,
  SAVE_SECTOR,
  DELETE_SECTOR,
} from './const';

const initialState = {
  data: [],
  actual: {},
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
      const newData = [...state.data];
      newData.splice(action.index + 1, 0, action.data);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case SAVE_SECTOR: {
      const newData = [...state.data];
      newData[action.index] = action.data;
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case DELETE_SECTOR: {
      const newData = [...state.data];
      newData.splice(action.index, 1);
      return {
        ...state,
        data: newData,
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
