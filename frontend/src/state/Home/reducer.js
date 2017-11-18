import {
  GET_DATA_AGREEMENT_PROGRESS,
  GET_DATA_AGREEMENT_SUCCESS,
  GET_DATA_AGREEMENT_FAILED,
  GET_DATA_SEARCH_AGREEMENT_SUCCESS,
} from './const';

const initialState = {
  contentsResult: [],
  categories: [],
  cities: [],
  loading: false,
};

function homeApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_AGREEMENT_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_AGREEMENT_SUCCESS: {
      return {
        ...state,
        contentsResult: action.contentsResult,
        categories: action.categories,
        cities: action.cities,
        loading: false,
      };
    }
    case GET_DATA_SEARCH_AGREEMENT_SUCCESS: {
      return {
        ...state,
        contentsResult: action.contentsResult,
        loading: false,
      };
    }
    case GET_DATA_AGREEMENT_FAILED:
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
