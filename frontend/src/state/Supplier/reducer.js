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
  UPDATE_CHANGEIDCOMPANYSIZE,
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  SAVE_CUSTOMER,
  DELETE_CUSTOMER,
  CANCEL_CUSTOMER,
} from './const';

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
  principalCustomer: [],
  sectors: [],
  messageChangeCompanySize: 'El tamanio de la empresa ha cambiado, desea continuar?',
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
      const principalCustomer = reloadKeys(action.principalCustomer);
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
        sectors: action.sectors,
        principalCustomer,
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
    case UPDATE_CHANGEIDCOMPANYSIZE: {
      return {
        ...state,
        changeIdCompanySize: action.changeIdCompanySize,
      };
    }
    case DELETE_ATTACHMENT:
      return {
        ...state,
        supplier: action.supplier,
        loading: false,
      };
    case ADD_CUSTOMER: {
      const { principalCustomer } = state;
      let newData = [...principalCustomer];
      newData.unshift(action.newItem);
      newData = reloadKeys(newData);
      return {
        ...state,
        principalCustomer: newData,
      };
    }
    case SAVE_CUSTOMER: {
      const { data, index } = action;
      const stateData = state.principalCustomer;
      let newData = [...stateData];
      newData[index] = data;
      newData = reloadKeys(newData);
      return {
        ...state,
        principalCustomer: newData,
        loading: false,
      };
    }
    case EDIT_CUSTOMER: {
      const { principalCustomer } = state;
      const newData = [...principalCustomer];
      newData[action.index].editable = true;
      return {
        ...state,
        principalCustomer: newData,
      };
    }
    case DELETE_CUSTOMER: {
      const { principalCustomer } = state;
      let newData = [...principalCustomer];
      newData.splice(action.index, 1);
      newData = reloadKeys(newData);
      return {
        ...state,
        principalCustomer: newData,
        loading: false,
      };
    }
    case CANCEL_CUSTOMER: {
      const { principalCustomer } = state;
      const newData = [...principalCustomer];
      newData[action.index].editable = false;
      return {
        ...state,
        principalCustomer: newData,
      };
    }
    default: {
      return state;
    }
  }
}

export default supplierApp;
