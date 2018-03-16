import {
  GET_EVALUATION_SCALE_PROGRESS,
  GET_EVALUATION_SCALE_SUCCESS,
  REQUEST_FAILED,
  ADD_EVALUATION_SCALE,
  SAVE_EVALUATION_SCALE,
  DELETE_EVALUATION_SCALE,
  SEARCH_EVALUATION_SCALE,
} from './const';
import { insertData, updateData, deleteData } from '../../utils/reducer';

const initialState = {
  data: [],
  masters: {
    ApplyTo: [
      { id: 'TECHNICAL_TEAM', name: 'Comité técnico' },
      { id: 'MANAGER_TEAM', name: 'Comité gerencial' },
    ],
  },
  actual: {},
  loading: false,
};

function evaluationScaleApp(state = initialState, action) {
  switch (action.type) {
    case GET_EVALUATION_SCALE_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_EVALUATION_SCALE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case ADD_EVALUATION_SCALE: {
      return {
        ...state,
        data: insertData(state.data, action.remoteId, action.data),
        loading: false,
      };
    }
    case SAVE_EVALUATION_SCALE: {
      return {
        ...state,
        data: updateData(state.data, action.data),
        loading: false,
      };
    }
    case DELETE_EVALUATION_SCALE: {
      return {
        ...state,
        data: deleteData(state.data, action.data.id),
        loading: false,
      };
    }
    case SEARCH_EVALUATION_SCALE: {
      return {
        ...state,
        data: state.data.map((element) => {
          let visible = true;
          const value = action.value.toLowerCase();
          if (
            action.value !== '' &&
            !element.name.toLowerCase().includes(value) &&
            !element.helpText.toLowerCase().includes(value) &&
            !(state.masters.ApplyTo.find(item => item.id === element.applyTo).name)
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

export default evaluationScaleApp;
