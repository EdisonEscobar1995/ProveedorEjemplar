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
  SAVE_DATA_ANSWER_SUCCESS,
  GET_REQUEST_FAILED,
  CHANGE_PARTICIPATE,
  UPDATE_ATTACHMENT,
  DELETE_ATTACHMENT,
} from './const';

import {
  ADD_DATA,
  SAVE_DATA,
  EDIT_DATA,
  DELETE_DATA,
  CANCEL_DATA,
} from '../TableForm/const';

import reloadKeys from '../../utils/reducerUtils';


const initialState = {
  supplier: {},
  call: {},
  changeIdCompanySize: false,
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
  customers: [],
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
        categories: action.categories,
        subcategories: action.subcategories,
        departments: action.departments,
        cities: action.cities,
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
        changeIdCompanySize: action.changeIdCompanySize,
        supplier: action.supplier,
        loading: false,
      };
    case SAVE_DATA_ANSWER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CHANGE_PARTICIPATE:
      return {
        ...state,
        participateInCall: action.participateInCall,
      };
    case UPDATE_ATTACHMENT: {
      return {
        ...state,
        supplier: action.supplier,
      };
    }
    case DELETE_ATTACHMENT:
      return {
        ...state,
        supplier: action.supplier,
        loading: false,
      };
    case ADD_DATA: {
      const { customers } = state;
      let newData = [...customers];
      newData.unshift(action.newItem);
      newData = reloadKeys(newData);
      return {
        ...state,
        customers: newData,
      };
    }
    case SAVE_DATA: {
      const { data, index } = action;
      const stateData = state.customers;
      let newData = [...stateData];
      newData[index] = data;
      newData = reloadKeys(newData);
      return {
        ...state,
        customers: newData,
        loading: false,
      };
    }
    case EDIT_DATA: {
      const { customers } = state;
      const newData = [...customers];
      newData[action.index].editable = true;
      return {
        ...state,
        customers: newData,
      };
    }
    case DELETE_DATA: {
      const { customers } = state;
      const newData = [...customers];
      newData.splice(action.index, 1);
      return {
        ...state,
        customers: newData,
        loading: false,
      };
    }
    case CANCEL_DATA: {
      const { data } = state;
      const newData = [...data];
      newData[action.index].editable = false;
      return {
        ...state,
        customers: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default supplierApp;
