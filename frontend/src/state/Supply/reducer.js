import {
  GET_SUPPLY_PROGRESS,
  GET_SUPPLY_SUCCESS,
  GET_CATEGORY_BY_SUPPLY_SUCCESS,
  GET_SUBCATEGORY_BY_CATEGORY_SUCCESS,
  REQUEST_FAILED,
  ADD_SUPPLY,
  SAVE_SUPPLY,
  DELETE_SUPPLY,
  ADD_CATEGORY,
  SAVE_CATEGORY,
  DELETE_CATEGORY,
  ADD_SUBCATEGORY,
  SAVE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
} from './const';

const initialState = {
  data: [],
  loading: false,
};


function supplyApp(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLY_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_SUPPLY_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case GET_CATEGORY_BY_SUPPLY_SUCCESS: {
      return {
        ...state,
        data: state.data.map((supply) => {
          if (supply.id === action.id) {
            return {
              ...supply,
              data: action.data,
              expandable: true,
            };
          }
          return supply;
        }),
        loading: false,
      };
    }
    case GET_SUBCATEGORY_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: state.data.map((supply) => {
          if (supply.data) {
            return ({
              ...supply,
              data: supply.data.map((category) => {
                if (category.id === action.id) {
                  category.data = action.data;
                  category.expandable = false;
                }
                return category;
              }),
            });
          }
          return supply;
        }),
        loading: false,
      };
    }
    case ADD_SUPPLY: {
      const newData = [...state.data];
      newData.splice(action.index + 1, 0, action.data);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case ADD_CATEGORY: {
      return {
        ...state,
        data: state.data.map((supply) => {
          if (supply.id === action.data.idSupply) {
            const newData = supply.data ? [...supply.data] : [];
            newData.splice(action.index + 1, 0, action.data);
            supply.data = newData;
          }
          return supply;
        }),
        loading: false,
      };
    }
    case ADD_SUBCATEGORY: {
      return {
        ...state,
        data: state.data.map((supply) => {
          if (supply.data) {
            return {
              ...supply,
              data: supply.data.map((category) => {
                if (category.id === action.data.idCategory) {
                  const newData = category.data ? [...category.data] : [];
                  newData.splice(action.index + 1, 0, action.data);
                  category.data = newData;
                }
                return category;
              }),
            };
          }
          return supply;
        }),
        loading: false,
      };
    }
    case SAVE_SUPPLY: {
      const newData = [...state.data];
      newData[action.index] = { ...newData[action.index], ...action.data };
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case SAVE_CATEGORY: {
      console.log(action);
      return {
        ...state,
        data: state.data.map((supply) => {
          if (supply.id === action.data.idSupply) {
            const newData = [...supply.data];
            newData[action.index] = { ...newData[action.index], ...action.data };
            supply.data = newData;
          }
          return supply;
        }),
        loading: false,
      };
    }
    case SAVE_SUBCATEGORY: {
      return {
        ...state,
        data: state.data.map((supply) => {
          if (supply.data) {
            return {
              ...supply,
              data: supply.data.map((category) => {
                if (category.id === action.data.idCategory) {
                  const newData = [...category.data];
                  newData[action.index] = action.data;
                  category.data = newData;
                }
                return category;
              }),
            };
          }
          return supply;
        }),
        loading: false,
      };
    }
    case DELETE_SUPPLY: {
      const newData = [...state.data];
      newData.splice(action.index, 1);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    }
    case DELETE_CATEGORY: {
      return {
        ...state,
        data: state.data.map((supply) => {
          if (supply.id === action.data.idSupply) {
            const newData = [...supply.data];
            newData.splice(action.index, 1);
            supply.data = newData;
          }
          return supply;
        }),
        loading: false,
      };
    }
    case DELETE_SUBCATEGORY: {
      return {
        ...state,
        data: state.data.map((supply) => {
          if (supply.data) {
            return {
              ...supply,
              data: supply.data.map((category) => {
                if (category.id === action.data.idCategory) {
                  const newData = [...category.data];
                  newData.splice(action.index, 1);
                  category.data = newData;
                }
                return category;
              }),
            };
          }
          return supply;
        }),
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

export default supplyApp;
