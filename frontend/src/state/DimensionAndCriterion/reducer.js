import {
  GET_DIMENSION_PROGRESS,
  GET_DIMENSION_SUCCESS,
  GET_CRITERION_BY_DIMENSION_SUCCESS,
  REQUEST_FAILED,
  ADD_DIMENSION,
  UPDATE_DIMENSION,
  DELETE_DIMENSION,
  ADD_CRITERION,
  UPDATE_CRITERION,
  DELETE_CRITERION,
  SEARCH_DIMENSION,
  SEARCH_CRITERION,
  CHANGE_SEARCH_DIMENSION,
  CHANGE_SEARCH_CRITERION,
  COLLAPSE_DIMENSION,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  searchValue: '',
  loading: false,
};

function dimensionApp(state = initialState, action) {
  switch (action.type) {
    case GET_DIMENSION_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DIMENSION_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case GET_CRITERION_BY_DIMENSION_SUCCESS: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.id === action.id) {
            service.data = action.data;
            service.searchValue = '';
            service.expandable = false;
          }
          return service;
        }),
        loading: false,
      };
    }
    case ADD_DIMENSION: {
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case ADD_CRITERION: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.id === action.data.idDimension) {
            service.data = insertData(service.data, action.remoteId, action.data);
          }
          return service;
        }),
        loading: false,
      };
    }
    case UPDATE_DIMENSION: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case UPDATE_CRITERION: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.id === action.data.idDimension) {
            service.data = updateData(service.data, action.data);
          }
          return service;
        }),
        loading: false,
      };
    }
    case DELETE_DIMENSION: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
        loading: false,
      };
    }
    case DELETE_CRITERION: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.id === action.data.idDimension) {
            service.data = deleteData(service.data, action.data.id);
          }
          return service;
        }),
        loading: false,
      };
    }
    case SEARCH_DIMENSION: {
      return {
        ...state,
        searchValue: action.value,
        data: state.data.map((service) => {
          let visible = true;
          if (action.value !== '' && !service.name.toLowerCase().includes(action.value.toLowerCase())) {
            visible = false;
          }
          if (service.data) {
            service.data = service.data.map(item => ({
              ...item,
              visible: true,
            }));
          }
          return {
            ...service,
            searchValue: '',
            visible,
          };
        }),
      };
    }
    case SEARCH_CRITERION: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.data && service.id === action.parentId) {
            return {
              ...service,
              searchValue: action.value,
              data: service.data.map((item) => {
                let visible = true;
                if (action.value !== '' && !item.name.toLowerCase().includes(action.value.toLowerCase())) {
                  visible = false;
                }
                return {
                  ...item,
                  visible,
                };
              }),
            };
          }
          return service;
        }),
      };
    }
    case CHANGE_SEARCH_DIMENSION: {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    case CHANGE_SEARCH_CRITERION: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.data && service.id === action.parentId) {
            return {
              ...service,
              searchValue: action.value,
            };
          }
          return service;
        }),
      };
    }
    case COLLAPSE_DIMENSION: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.data && service.id === action.data.id) {
            service.searchValue = '';
            service.data = service.data.map(item => ({
              ...item,
              visible: true,
            }));
          }
          return service;
        }),
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

export default dimensionApp;
