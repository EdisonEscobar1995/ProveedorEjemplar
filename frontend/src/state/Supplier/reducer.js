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
  SAVE_CUSTOMER,
  DELETE_CUSTOMER,
  RELOAD_DIMENSIONS,
  FINISH_SURVEY,
  ADD_DIRECT_EMPLOYEES,
  ADD_SUB_EMPLOYEES,
  SET_SECTOR,
  SET_EXPORT,
  UPDATE_CUSTOMER,
  CLEAN_STORE,
} from './const';


const initialState = {
  supplier: {},
  call: {},
  rules: {
    supplier: {
      show: true,
      readOnly: false,
    },
    evaluator: {
      show: false,
      readOnly: true,
    },
  },
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
  stateData: {},
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
        rules: action.rules,
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
        stateData: action.stateData,
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
        rules: {
          ...state.rules,
          supplier: {
            ...state.rules.supplier,
            readOnly: true,
          },
          evaluator: {
            ...state.rules.evaluator,
            readOnly: true,
          },
        },
        error: action.error,
      };
    case SAVE_DATA_SUPPLIER_CALL_SUCCESS:
      return {
        ...state,
        call: action.call,
        rules: {
          ...state.rules,
          supplier: {
            ...state.rules.supplier,
            readOnly: state.rules.supplier.readOnly || action.readOnlySupplier,
          },
        },
        loading: false,
      };
    case SAVE_DATA_SUPPLIER_AND_CALL_SUCCESS:
      return {
        ...state,
        call: action.call,
        rules: {
          ...state.rules,
          supplier: {
            ...state.rules.supplier,
            readOnly: state.rules.supplier.readOnly || action.readOnlySupplier,
          },
        },
        changeIdCompanySize: action.changeIdCompanySize,
        loading: false,
      };
    case SAVE_DATA_ANSWER_SUCCESS:
      return {
        ...state,
        loading: false,
        rules: action.rules,
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
    case DELETE_CUSTOMER:
    case SAVE_CUSTOMER:
    case UPDATE_CUSTOMER:
      return {
        ...state,
        supplier: action.data,
      };
    case RELOAD_DIMENSIONS:
      return {
        ...state,
        dimensions: action.dimensions,
      };
    case FINISH_SURVEY:
      return {
        ...state,
        rules: {
          ...state.rules,
          supplier: {
            ...state.rules.supplier,
            readOnly: action.readOnlySupplier,
          },
        },
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
    case CLEAN_STORE:
      return {
        ...initialState,
      };
    default: {
      return state;
    }
  }
}

export default supplierApp;
