import {
  GET_SERVICE_PROGRESS,
  GET_SERVICE_SUCCESS,
  GET_ITEM_BY_SERVICE_SUCCESS,
  REQUEST_FAILED,
  ADD_SERVICE,
  SAVE_SERVICE,
  DELETE_SERVICE,
  ADD_ITEM,
  SAVE_ITEM,
  DELETE_ITEM,
  SEARCH_SERVICE,
  SEARCH_ITEM,
  COLLAPSE_SERVICE,
} from './const';

const initialState = {
  data: [],
  actual: {},
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
            service.expandable = false;
          }
          return service;
        }),
        loading: false,
      };
    }
    case ADD_SERVICE: {
      const newData = [...state.data];
      newData.splice(action.index + 1, 0, action.data);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case ADD_ITEM: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.id === action.data.idService) {
            const newData = service.data ? [...service.data] : [];
            newData.splice(action.index + 1, 0, action.data);
            service.data = newData;
          }
          return service;
        }),
        loading: false,
      };
    }
    case SAVE_SERVICE: {
      const newData = [...state.data];
      newData[action.index] = { ...newData[action.index], ...action.data };
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case SAVE_ITEM: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.id === action.data.idService) {
            const newData = [...service.data];
            newData[action.index] = action.data;
            service.data = newData;
          }
          return service;
        }),
        loading: false,
      };
    }
    case DELETE_SERVICE: {
      const newData = [...state.data];
      newData.splice(action.index, 1);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.id === action.data.idService) {
            const newData = [...service.data];
            newData.splice(action.index, 1);
            service.data = newData;
          }
          return service;
        }),
        loading: false,
      };
    }
    case SEARCH_SERVICE: {
      return {
        ...state,
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
    case COLLAPSE_SERVICE: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.data && service.id === action.data.id) {
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
