import {
  GET_DATA_SURVEY_ADMON_PROGRESS,
  GET_DATA_SURVEY_ADMON_SUCCESS,
  // GET_SURVEY_ADMON_PROGRESS,
  GET_SURVEY_ADMON_SUCCESS,
  SEARCH_SURVEY_ADMON,
  CHANGE_SEARCH_SURVEY_ADMON,
  // SAVE_SURVEY_ADMON,
  DELETE_SURVEY_ADMON,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: [],
  editData: {},
  supply: [],
  companySize: [],
  searchValue: '',
  loading: false,
};

function surveyAdmonApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_SURVEY_ADMON_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA_SURVEY_ADMON_SUCCESS: {
      return {
        ...state,
        data: action.data,
        supply: action.supply,
        companySize: action.companySize,
        loading: false,
      };
    }
    // case SAVE_QUESTION: {
    //   return {
    //     ...state,
    //     editData: action.data,
    //     loading: false,
    //   };
    // }
    case GET_SURVEY_ADMON_SUCCESS: {
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
    case SEARCH_SURVEY_ADMON: {
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
    case CHANGE_SEARCH_SURVEY_ADMON: {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    case REQUEST_FAILED:
    case DELETE_SURVEY_ADMON:
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

export default surveyAdmonApp;
