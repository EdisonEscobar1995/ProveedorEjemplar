import {
  GET_DATA_QUESTION_PROGRESS,
  GET_DATA_QUESTION_SUCCESS,
  GET_QUESTION_PROGRESS,
  GET_QUESTION_SUCCESS,
  SEARCH_QUESTION,
  CHANGE_SEARCH_QUESTION,
  CHANGE_DIMENSION,
  CHANGE_CRITERION,
  CHANGE_HELP_TEXT,
  CHANGE_QUESTION,
  UPDATE_OPTIONS,
  SAVE_QUESTION,
  SAVE_DATA_OPTION,
  DELETE_QUESTION,
  REQUEST_FAILED,
  CLEAR_EDIT,
  CHANGE_DISABLED,
  CHANGE_ITEMS,
  GET_OPTIONS_BY_QUESTION,
  GET_ADD_QUESTION,
  CHANGE_ANSWER_TYPE,
  CHANGE_DEPENDING_QUESTION,
  SWITCH_REQUIRED,
  SWITCH_REQUIRED_ATTACHMENT,
} from './const';

const initialState = {
  data: [],
  editData: {},
  dimension: [],
  criterion: [],
  questions: [],
  items: [],
  options: [],
  searchValue: '',
  loading: false,
};

function questionApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_QUESTION_PROGRESS:
    case GET_QUESTION_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case CHANGE_ANSWER_TYPE: {
      return {
        ...state,
        editData: {
          ...state.editData,
          type: action.answerType,
        },
      };
    }
    case CHANGE_DIMENSION: {
      return {
        ...state,
        editData: {
          ...state.editData,
          idDimension: action.value,
        },
      };
    }
    case CHANGE_CRITERION: {
      return {
        ...state,
        editData: {
          ...state.editData,
          idCriterion: action.value,
        },
      };
    }
    case CHANGE_HELP_TEXT: {
      return {
        ...state,
        editData: {
          ...state.editData,
          helpText: action.value,
        },
      };
    }
    case CHANGE_QUESTION: {
      return {
        ...state,
        editData: {
          ...state.editData,
          wording: action.value,
        },
      };
    }
    case CHANGE_ITEMS: {
      return {
        ...state,
        editData: {
          ...state.editData,
          dependOfOptionId: action.value,
        },
      };
    }
    case UPDATE_OPTIONS: {
      return {
        ...state,
        options: action.options,
      };
    }
    case SWITCH_REQUIRED: {
      return {
        ...state,
        editData: {
          ...state.editData,
          required: action.checked,
        },
      };
    }
    case SWITCH_REQUIRED_ATTACHMENT: {
      return {
        ...state,
        editData: {
          ...state.editData,
          requireAttachment: action.checked,
        },
      };
    }
    case CHANGE_DEPENDING_QUESTION: {
      return {
        ...state,
        editData: {
          ...state.editData,
          dependOfQuestion: action.dependOfQuestion,
          dependOfOptionId: '',
        },
      };
    }
    case GET_DATA_QUESTION_SUCCESS: {
      return {
        ...state,
        data: action.data,
        dimension: action.dimension,
        criterion: action.criterion,
        loading: false,
      };
    }
    case SAVE_QUESTION: {
      return {
        ...state,
        editData: action.data,
        loading: false,
      };
    }
    case SAVE_DATA_OPTION: {
      return {
        ...state,
        loading: false,
      };
    }
    case CHANGE_DISABLED: {
      return {
        ...state,
        disabled: false,
      };
    }
    case GET_OPTIONS_BY_QUESTION: {
      return {
        ...state,
        items: action.items,
        loading: false,
      };
    }
    case GET_ADD_QUESTION: {
      return {
        ...state,
        dimension: action.dimension,
        criterion: action.criterion,
        questions: action.questions,
        editData: {
          required: false,
          requireAttachment: false,
        },
        items: [],
        options: [],
        loading: false,
      };
    }
    case GET_QUESTION_SUCCESS: {
      return {
        ...state,
        editData: action.editData,
        dimension: action.dimension,
        criterion: action.criterion,
        questions: action.questions,
        options: action.options,
        items: action.items,
        loading: false,
      };
    }
    case SEARCH_QUESTION: {
      return {
        ...state,
        searchValue: action.value,
        data: state.data.map((element) => {
          let visible = true;
          const value = !!action.value && action.value.toLowerCase();
          let dimension = state.dimension.data.find(d => d.id === element.idDimension);
          dimension = dimension ? dimension.name : '';
          let criterion = state.criterion.data.find(c => c.id === element.idCriterion);
          criterion = criterion ? criterion.name : '';
          if (
            value &&
            !dimension.toLowerCase().includes(value) &&
            !criterion.toLowerCase().includes(value) &&
            !element.wording.toLowerCase().includes(value)
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
    case CHANGE_SEARCH_QUESTION: {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    case CLEAR_EDIT: {
      return {
        ...state,
        editData: {},
        data: [],
        dimension: [],
        criterion: [],
        questions: [],
        items: [],
      };
    }
    case REQUEST_FAILED:
    case DELETE_QUESTION:
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

export default questionApp;
