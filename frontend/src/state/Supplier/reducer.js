import {
  GET_DATA_SUPPLIER_PROGRESS,
  GET_DATA_SUPPLIER_SUCCESS,
  GET_DATA_CATEGORIES_SUCCESS,
  GET_DATA_SUBCATEGORIES_SUCCESS,
  GET_DATA_DEPARTMENTS_SUCCESS,
  GET_DATA_CITIES_SUCCESS,
  GET_REQUEST_FAILED,
} from './const';

const initialState = {
  supplier: {},
  supply: [],
  categories: [],
  subcategories: [],
  companyTypes: [],
  companySizes: [],
  societyTypes: [],
  countries: [],
  departments: [],
  cities: [],
  loading: false,
};

function supplierApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_SUPPLIER_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DATA_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.categories,
        subcategories: [],
        loading: false,
      };
    }
    case GET_DATA_SUBCATEGORIES_SUCCESS: {
      return {
        ...state,
        subcategories: action.subcategories,
        loading: false,
      };
    }
    case GET_DATA_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        departments: action.departments,
        cities: [],
        loading: false,
      };
    }
    case GET_DATA_CITIES_SUCCESS: {
      return {
        ...state,
        cities: action.cities,
        loading: false,
      };
    }
    case GET_DATA_SUPPLIER_SUCCESS: {
      return {
        ...state,
        supplier: action.supplier,
        supply: action.supply,
        companySizes: action.companySizes,
        companyTypes: action.companyTypes,
        societyTypes: action.societyTypes,
        countries: action.countries,
        loading: false,
      };
    }
    case GET_REQUEST_FAILED:
    {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}

export default supplierApp;
