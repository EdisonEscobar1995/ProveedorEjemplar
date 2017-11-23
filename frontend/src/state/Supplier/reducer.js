import {
  GET_DATA_SUPPLIER_PROGRESS,
  GET_DATA_SUPPLIER_SUCCESS,
  GET_DATA_CATEGORIES_SUCCESS,
  GET_DATA_SUBCATEGORIES_SUCCESS,
  GET_DATA_DEPARTMENTS_SUCCESS,
  GET_DATA_CITIES_SUCCESS,
  GET_DATA_DIMENSION_SURVEY_SUCCESS,
  GET_DATA_QUESTIONS_DIMENSION_SUCCESS,
  SAVE_DATA_SUPPLIER_CALL_SUCCESS,
  SAVE_DATA_SUPPLIER_AND_CALL_SUCCESS,
  GET_REQUEST_FAILED,
  CHANGE_PARTICIPATE,
} from './const';

const initialState = {
  supplier: {},
  call: {},
  participateInCall: null,
  supply: [],
  categories: [],
  subcategories: [],
  companyTypes: [],
  companySizes: [],
  societyTypes: [],
  countries: [],
  departments: [],
  cities: [],
  dimensions: [],
  loading: false,
};

function supplierApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_SUPPLIER_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA_SUPPLIER_SUCCESS: {
      const { participateInCall } = action.call;
      return {
        ...state,
        supplier: action.supplier,
        call: action.call,
        participateInCall,
        supply: action.supply,
        companySizes: action.companySizes,
        companyTypes: action.companyTypes,
        societyTypes: action.societyTypes,
        countries: action.countries,
        loading: false,
      };
    }
    case GET_DATA_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories,
        subcategories: [],
        loading: false,
      };
    case GET_DATA_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        subcategories: action.subcategories,
        loading: false,
      };
    case GET_DATA_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: action.departments,
        cities: [],
        loading: false,
      };
    case GET_DATA_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.cities,
        loading: false,
      };
    case GET_DATA_DIMENSION_SURVEY_SUCCESS:
    case GET_DATA_QUESTIONS_DIMENSION_SUCCESS:
      return {
        ...state,
        dimensions: action.dimensions,
        loading: false,
      };
    case GET_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SAVE_DATA_SUPPLIER_CALL_SUCCESS:
      return {
        ...state,
        call: action.call,
        loading: false,
      };
    case SAVE_DATA_SUPPLIER_AND_CALL_SUCCESS:
      return {
        ...state,
        call: action.call,
        supplier: action.supplier,
        loading: false,
      };
    case CHANGE_PARTICIPATE:
      return {
        ...state,
        participateInCall: action.participateInCall,
      };
    default: {
      return state;
    }
  }
}

export default supplierApp;
