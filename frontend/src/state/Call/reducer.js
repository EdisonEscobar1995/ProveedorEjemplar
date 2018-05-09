import {
  GET_DATA_CALL_PROGRESS,
  GET_DATA_CALL_SUCCESS,
  GET_CALL_PROGRESS,
  GET_CALL_SUCCESS,
  CLEAR_EDIT,
  SEARCH_CALL,
  CHANGE_SEARCH_CALL,
  CHANGE_DISABLED,
  SAVE_CALL,
  DELETE_CALL,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: [],
  editData: {},
  searchValue: '',
  loading: false,
  disabled: true,
  disabledByDate: false,
};

function callApp(state = initialState, action) {
  switch (action.type) {
    case GET_CALL_PROGRESS:
    case GET_DATA_CALL_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_CALL_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    case SAVE_CALL: {
      return {
        ...state,
        editData: action.data,
        loading: false,
      };
    }
    case CHANGE_DISABLED: {
      return {
        ...state,
        disabled: false,
      };
    }
    case GET_CALL_SUCCESS: {
      return {
        ...state,
        editData: action.data,
        loading: false,
        disabledByDate: action.data.disabledByDate,
        disabled: action.data.disabled,
      };
    }
    case SEARCH_CALL: {
      return {
        ...state,
        searchValue: action.value,
        data: state.data.map((element) => {
          let visible = true;
          const value = !!action.value && action.value.toLowerCase();
          if (
            value &&
            !element.year.toString().includes(value) &&
            !element.dateToFinishCall.toLowerCase().includes(value) &&
            !element.deadlineToMakeSurvey.toLowerCase().includes(value)
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
    case CHANGE_SEARCH_CALL: {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    case CLEAR_EDIT: {
      return {
        ...state,
        editData: {},
        disabled: true,
        disabledByDate: false,
      };
    }
    case REQUEST_FAILED:
    case DELETE_CALL:
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

export default callApp;
