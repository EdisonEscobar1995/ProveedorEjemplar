import {
  GET_TECHNICAL_TEAM_PROGRESS,
  GET_TECHNICAL_TEAM_SUCCESS,
  REQUEST_FAILED,
  ADD_TECHNICAL_TEAM,
  UPDATE_TECHNICAL_TEAM,
  DELETE_TECHNICAL_TEAM,
  GET_CATEGORIES_SUCCESS,
  SEARCH_TECHNICAL_TEAM,
  CHANGE_SEARCH_TECHNICAL_TEAM,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  searchValue: '',
  masters: {},
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
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case UPDATE_TECHNICAL_TEAM: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case DELETE_TECHNICAL_TEAM: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
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
    case SEARCH_TECHNICAL_TEAM: {
      return {
        ...state,
        searchValue: action.value,
        data: state.data.map((element) => {
          let visible = true;
          const value = action.value.toLowerCase();
          if (
            action.value !== '' &&
            !(state.masters.Supply.find(item => item.id === element.idSupply).name)
              .toLowerCase().includes(value) &&
            !(state.masters.Category.find(item => item.id === element.idCategory).name)
              .toLowerCase().includes(value) &&
            !(state.masters.Country.find(item => item.id === element.idCountry).name)
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
    case CHANGE_SEARCH_TECHNICAL_TEAM: {
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

export default technicalTeamApp;
