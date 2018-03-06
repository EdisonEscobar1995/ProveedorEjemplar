import {
  GET_TECHNICAL_TEAM_PROGRESS,
  GET_TECHNICAL_TEAM_SUCCESS,
  REQUEST_FAILED,
  ADD_TECHNICAL_TEAM,
  SAVE_TECHNICAL_TEAM,
  DELETE_TECHNICAL_TEAM,
  GET_CATEGORIES_SUCCESS,
} from './const';

const initialState = {
  data: [],
  masters: {},
  actual: {},
  loading: false,
};

function technicalTeamApp(state = initialState, action) {
  switch (action.type) {
    case GET_TECHNICAL_TEAM_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_TECHNICAL_TEAM_SUCCESS: {
      return {
        ...state,
        data: action.data,
        masters: action.masters,
        loading: false,
      };
    }
    case ADD_TECHNICAL_TEAM: {
      const newData = [...state.data];
      newData.splice(action.index + 1, 0, action.data);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case SAVE_TECHNICAL_TEAM: {
      const newData = [...state.data];
      newData[action.index] = action.data;
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case DELETE_TECHNICAL_TEAM: {
      const newData = [...state.data];
      newData.splice(action.index, 1);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        masters: {
          ...state.masters,
          FilteredCategory: action.categories,
        },
        loading: false,
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

export default technicalTeamApp;
