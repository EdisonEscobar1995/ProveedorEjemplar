import {
  GET_DATA_GENERAL_PROGRESS,
  GET_DATA_GENERAL_SUCCESS,
  GET_DATA_STATISTICAL_PROGRESS,
  GET_DATA_STATISTICAL_SUCCESS,
  GET_DATA_CURRENT_PROGRESS,
  GET_DATA_CURRENT_SUCCESS,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: {},
  statisticalData: {},
  dataCurrent: {},
  loading: false,
};

function homeApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_GENERAL_PROGRESS:
    case GET_DATA_STATISTICAL_PROGRESS:
    case GET_DATA_CURRENT_PROGRESS:
    {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_GENERAL_SUCCESS:
    {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case GET_DATA_STATISTICAL_SUCCESS:
    {
      return {
        ...state,
        statisticalData: action.statisticalData,
        loading: false,
      };
    }
    case GET_DATA_CURRENT_SUCCESS:
    {
      return {
        ...state,
        dataCurrent: action.dataCurrent,
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

export default homeApp;
