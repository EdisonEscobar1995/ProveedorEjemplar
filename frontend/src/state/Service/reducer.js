import {
  GET_SERVICE_PROGRESS,
  GET_SERVICE_SUCCESS,
  GET_ITEM_BY_SERVICE_SUCCESS,
  REQUEST_FAILED,
  ADD_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SEARCH_SERVICE,
  SEARCH_ITEM,
  CHANGE_SEARCH_SERVICE,
  CHANGE_SEARCH_ITEM,
  COLLAPSE_SERVICE,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  searchValue: '',
  loading: false,
};

function serviceApp(state = initialState, action) {
  switch (action.type) {
    case GET_SERVICE_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_SERVICE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case GET_ITEM_BY_SERVICE_SUCCESS: {
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
    case ADD_SERVICE: {
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case ADD_ITEM: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.id === action.data.idService) {
            service.data = insertData(service.data, action.remoteId, action.data);
          }
          return service;
        }),
        loading: false,
      };
    }
    case UPDATE_SERVICE: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case UPDATE_ITEM: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.id === action.data.idService) {
            service.data = updateData(service.data, action.data);
          }
          return service;
        }),
        loading: false,
      };
    }
    case DELETE_SERVICE: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
        loading: false,
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.id === action.data.idService) {
            service.data = deleteData(service.data, action.data.id);
          }
          return service;
        }),
        loading: false,
      };
    }
    case SEARCH_SERVICE: {
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
    case SEARCH_ITEM: {
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
    case CHANGE_SEARCH_SERVICE: {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    case CHANGE_SEARCH_ITEM: {
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
    case COLLAPSE_SERVICE: {
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

export default serviceApp;
