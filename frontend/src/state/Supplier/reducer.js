import {
  GET_DATA_SUPPLIER_PROGRESS,
  GET_DIMENSIONS_PROGRESS,
  GET_DATA_SUPPLIER_SUCCESS,
  GET_DATA_CATEGORIES_SUCCESS,
  GET_DATA_SUBCATEGORIES_SUCCESS,
  GET_DATA_DEPARTMENTS_SUCCESS,
  GET_DATA_CITIES_SUCCESS,
  GET_DATA_DIMENSION_SURVEY_SUCCESS,
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
  RELOAD_DIMENSIONS,
  FINISH_SURVEY,
  ADD_DIRECT_EMPLOYEES,
  ADD_SUB_EMPLOYEES,
  SET_SECTOR,
  SET_EXPORT,
} from './const';


const initialState = {
  supplier: {},
  call: {},
  readOnly: false,
  changeIdCompanySize: false,
  loadedDimensions: false,
  participateInCall: '',
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
  sectors: [],
  system: {},
  loading: false,
  loadingDimensions: false,
  error: null,
};

function supplierApp(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_SUPPLIER_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case GET_DIMENSIONS_PROGRESS:
      return {
        ...state,
        loadingDimensions: true,
      };
    case GET_DATA_SUPPLIER_SUCCESS: {
      const { participateInCall } = action.call;
      return {
        ...state,
        supplier: action.supplier,
        readOnly: action.readOnly,
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
        system: action.system,
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
      return {
        ...state,
        dimensions: action.dimensions,
        loadingDimensions: false,
        loadedDimensions: true,
        loading: false,
      };
    case GET_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        readOnly: true,
        error: action.error,
      };
    case SAVE_DATA_SUPPLIER_CALL_SUCCESS:
      return {
        ...state,
        call: action.call,
        readOnly: state.readOnly || action.readOnly,
        loading: false,
      };
    case SAVE_DATA_SUPPLIER_AND_CALL_SUCCESS:
      return {
        ...state,
        call: action.call,
        readOnly: state.readOnly || action.readOnly,
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
        dimensions: [],
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
    case ADD_CUSTOMER:
    case DELETE_CUSTOMER:
    case SAVE_CUSTOMER:
    case EDIT_CUSTOMER:
    case CANCEL_CUSTOMER:
      return {
        ...state,
        supplier: action.data,
        loading: false,
      };
    case RELOAD_DIMENSIONS:
      return {
        ...state,
        dimensions: action.dimensions,
      };
    case FINISH_SURVEY:
      return {
        ...state,
        readOnly: action.readOnly,
        loading: false,
      };
    case ADD_DIRECT_EMPLOYEES:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          numberOfDirectEmployees: action.value,
          employeesTotal: state.supplier.numberOfSubContratedEmployees + action.value,
        },
      };
    case ADD_SUB_EMPLOYEES:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          numberOfSubContratedEmployees: action.value,
          employeesTotal: state.supplier.numberOfDirectEmployees + action.value,
        },
      };
    case SET_SECTOR:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          actualSector: action.value,
        },
      };
    case SET_EXPORT:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          actuallyExport: action.value,
        },
      };
    default: {
      return state;
    }
  }
}

export default supplierApp;
