import {
  GET_DATA_SECTOR_PROGRESS,
  GET_DATA_SECTOR_SUCCESS,
  REQUEST_FAILED,
} from './const';
import {
  ADD_DATA,
  SAVE_DATA,
  EDIT_DATA,
  DELETE_DATA,
  CANCEL_DATA,
} from '../TableForm/const';
import reloadKeys from '../../utils/reducerUtils';

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
      const data = reloadKeys(action.data);
      return {
        ...state,
        data,
        loading: false,
      };
    }
    case ADD_DATA: {
      const { data } = state;
      let newData = [...data];
      newData.unshift(action.newItem);
      newData = reloadKeys(newData);
      return {
        ...state,
        data: newData,
      };
    }
    case SAVE_DATA: {
      const { data, index } = action;
      const stateData = state.data;
      let newData = [...stateData];
      newData[index] = data;
      newData = reloadKeys(newData);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case EDIT_DATA: {
      const { data } = state;
      const newData = [...data];
      newData[action.index].editable = true;
      return {
        ...state,
        data: newData,
      };
    }
    case DELETE_DATA: {
      const { data } = state;
      const newData = [...data];
      newData.splice(action.index, 1);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case CANCEL_DATA: {
      const { data } = state;
      const newData = [...data];
      newData[action.index].editable = false;
      return {
        ...state,
        data: newData,
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
