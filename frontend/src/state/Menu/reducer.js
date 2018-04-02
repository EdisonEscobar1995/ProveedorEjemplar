import {
  GET_MANAGER_TEAM_PROGRESS,
  GET_MANAGER_TEAM_SUCCESS,
  REQUEST_FAILED,
  ADD_MANAGER_TEAM,
  UPDATE_MANAGER_TEAM,
  DELETE_MANAGER_TEAM,
  SEARCH_MANAGER_TEAM,
  CHANGE_SEARCH_MANAGER_TEAM,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  searchValue: '',
  masters: {},
  loading: false,
};

function managerTeamApp(state = initialState, action) {
  switch (action.type) {
    case GET_MANAGER_TEAM_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MANAGER_TEAM_SUCCESS: {
      return {
        ...state,
        data: action.data,
        masters: action.masters,
        loading: false,
      };
    }
    case ADD_MANAGER_TEAM: {
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case UPDATE_MANAGER_TEAM: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case DELETE_MANAGER_TEAM: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
        loading: false,
      };
    }
    case SEARCH_MANAGER_TEAM: {
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
    case CHANGE_SEARCH_MANAGER_TEAM: {
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

export default managerTeamApp;
