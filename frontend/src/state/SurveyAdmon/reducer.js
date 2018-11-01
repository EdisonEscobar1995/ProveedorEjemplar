import {
  GET_DATA_SURVEY_ADMON_PROGRESS,
  GET_DATA_SURVEY_ADMON_SUCCESS,
  GET_SURVEY_ADMON_SUCCESS,
  SEARCH_SURVEY_ADMON,
  CHANGE_SEARCH_SURVEY_ADMON,
  SAVE_SURVEY_ADMON,
  DELETE_SURVEY_ADMON,
  CLEAN_DATA,
  SEARCH_BY_DIMENSION,
  CHANGE_SEARCH_BY_DIMENSION,
  CHANGE_SEARCH_BY_QUESTION_SURVEY,
  SEARCH_QUESTION_SURVEY,
  GET_QUESTIONS_BY_DIMENSION,
  COLLAPSE_DIMENSION_SURVEY_FORM,
  COLLAPSE_CRITERION_SURVEY_FORM,
  GET_DIMENSIONS_SURVEY_PROGRESS,
  GET_CRITERION_SURVEY_SUCCESS,
  SAVE_QUESTION_SELECTED,
  DIMENSION_DESELECTED,
  FILTER_BY_CRITERION_SURVEY,
  SET_COMPANY_SIZE_VALUE,
  SET_SUPPLY_VALUE,
  SET_CALL_VALUE,
  REQUEST_FAILED,
} from './const';

const initialState = {
  data: [],
  questionSelected: [],
  supply: [],
  companySize: [],
  criterions: [],
  allCriterions: [],
  allDimensions: [],
  dimensionSelected: [],
  criterionSelected: [],
  searchValue: '',
  searchDimension: '',
  labelOptions: '',
  id: '',
  callValue: '',
  supplyValue: '',
  companySizeValue: '',
  loading: false,
};

function surveyAdmonApp(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANY_SIZE_VALUE: {
      return {
        ...state,
        companySizeValue: action.value,
      };
    }
    case SET_CALL_VALUE: {
      return {
        ...state,
        callValue: action.value,
      };
    }
    case SET_SUPPLY_VALUE: {
      return {
        ...state,
        supplyValue: action.value,
      };
    }
    case SAVE_QUESTION_SELECTED: {
      return {
        ...state,
        questionSelected: action.questionSel,
        data: action.data,
      };
    }
    case GET_DATA_SURVEY_ADMON_PROGRESS:
    case GET_DIMENSIONS_SURVEY_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA_SURVEY_ADMON_SUCCESS: {
      return {
        ...state,
        data: action.data,
        call: action.call,
        supply: action.supply,
        companySize: action.companySize,
        loading: false,
      };
    }
    case GET_QUESTIONS_BY_DIMENSION: {
      return {
        ...state,
        data: state.data.map((question) => {
          if (question.id === action.id) {
            question.data = action.data;
            question.searchValue = '';
            question.expandable = false;
          }
          return question;
        }),
        loading: false,
      };
    }
    case GET_SURVEY_ADMON_SUCCESS: {
      return {
        ...state,
        call: action.call,
        supply: action.supply,
        companySize: action.companySize,
        allCriterions: action.allCriterions,
        allDimensions: action.allDimensions,
        data: action.data,
        id: action.id,
        callValue: action.callValue,
        supplyValue: action.supplyValue,
        companySizeValue: action.companySizeValue,
        questionSelected: action.questionSelected,
        loading: false,
      };
    }
    case FILTER_BY_CRITERION_SURVEY: {
      return {
        ...state,
        data: action.data,
        criterionSelected: action.criterionSelected,
      };
    }
    case GET_CRITERION_SURVEY_SUCCESS: {
      return {
        ...state,
        criterions: action.criterions,
        labelOptions: action.labelOptions,
        dimensionSelected: action.dimensionSelected,
        data: state.data.map((item) => {
          let visible = false;
          state.dimensionSelected.forEach((dimension) => {
            if (dimension !== '' && dimension === item.id) {
              visible = true;
            }
          });
          return {
            ...item,
            visible,
          };
        }),
        loading: false,
      };
    }
    case DIMENSION_DESELECTED : {
      return {
        ...state,
        data: action.data,
        dimensionSelected: action.dimensionSelected,
        criterions: action.criterions,
      };
    }
    case CHANGE_SEARCH_SURVEY_ADMON: {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    case SEARCH_SURVEY_ADMON: {
      return {
        ...state,
        searchValue: action.value,
        data: state.data.map((element) => {
          let visible = true;
          const value = !!action.value && action.value.toLowerCase();
          let supply = state.supply.find(s => s.id === element.idSupply);
          supply = supply ? supply.name : '';
          let companySize = state.companySize.find(cs => cs.id === element.idCompanySize);
          companySize = companySize ? companySize.name : '';
          if (
            value &&
            !supply.toLowerCase().includes(value) &&
            !companySize.toLowerCase().includes(value)
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
    case SEARCH_QUESTION_SURVEY: {
      return {
        ...state,
        data: state.data.map((service) => {
          if (service.data && service.id === action.parentId) {
            return {
              ...service,
              searchValue: action.value,
              data: service.data.map((item) => {
                let visible = true;
                if (action.value !== '' && !item.wording.toLowerCase().includes(action.value.toLowerCase())) {
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
    case CHANGE_SEARCH_BY_DIMENSION: {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    case CHANGE_SEARCH_BY_QUESTION_SURVEY: {
      return {
        ...state,
        data: state.data.map((element) => {
          if (element.data && element.id === action.parentId) {
            return {
              ...element,
              searchValue: action.value,
            };
          }
          return element;
        }),
      };
    }
    case SEARCH_BY_DIMENSION: {
      return {
        ...state,
        searchValue: action.value,
        data: state.data.map((element) => {
          let visible = true;
          const value = !!action.value && action.value.toLowerCase();
          let dimension = state.allDimensions.find(s => s.id === element.id);
          dimension = dimension ? dimension.name : '';
          if (
            value &&
            !dimension.toLowerCase().includes(value)
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
    case COLLAPSE_DIMENSION_SURVEY_FORM:
    case COLLAPSE_CRITERION_SURVEY_FORM:
    {
      return {
        ...state,
        data: state.data.map((data) => {
          if (data.data && data.id === action.data.id) {
            data.searchValue = '';
            data.data = data.data.map(item => ({
              ...item,
              visible: true,
            }));
          }
          return data;
        }),
      };
    }
    case REQUEST_FAILED:
    case DELETE_SURVEY_ADMON:
    case SAVE_SURVEY_ADMON:
    {
      return {
        ...state,
        loading: false,
      };
    }
    case CLEAN_DATA: {
      return {
        ...state,
        data: [],
      };
    }
    default: {
      return state;
    }
  }
}

export default surveyAdmonApp;
