import axios from 'axios';
import {
  GET_DATA_SUPPLIER_PROGRESS,
  GET_DATA_SUPPLIER_SUCCESS,
  GET_DATA_CATEGORIES_SUCCESS,
  GET_DATA_SUBCATEGORIES_SUCCESS,
  GET_DATA_DEPARTMENTS_SUCCESS,
  GET_DATA_DIMENSION_SURVEY_SUCCESS,
  GET_DATA_CITIES_SUCCESS,
  GET_DATA_QUESTIONS_DIMENSION_SUCCESS,
  SAVE_DATA_SUPPLIER_CALL_SUCCESS,
  SAVE_DATA_SUPPLIER_AND_CALL_SUCCESS,
  GET_REQUEST_FAILED,
  CHANGE_PARTICIPATE,
} from './const';
import { getDataSuppliertApi, getDataCallSuppliertApi, saveDataSuppliertApi, saveDataCallBySupplierApi } from '../../api/supplier';
import { getDataSupplyApi } from '../../api/supply';
import { getDataCategoryBySuplyApi } from '../../api/category';
import { getDataSubCategoryByCategoryApi } from '../../api/subcategory';
import getDataCompanyTypesApi from '../../api/companyType';
import { getDataCompanySizeApi } from '../../api/companySize';
import getDataSocietyTypesApi from '../../api/societyType';
import getDataCountriesApi from '../../api/countries';
import getDataDepartmentsByCountryApi from '../../api/departments';
import getDataCitiesByDepartmentApi from '../../api/cities';
import { getDimensionsBySurveyApi } from '../../api/dimension';
import { getQuestionsByDimensionApi } from '../../api/question';
import requestApi from '../../utils/actionUtils';


function getDataSupplierProgress() {
  return {
    type: GET_DATA_SUPPLIER_PROGRESS,
  };
}

function getDataSupplierSuccess(
  supplier,
  call,
  supply,
  companyTypes,
  companySizes,
  societyTypes,
  countries,
) {
  return {
    type: GET_DATA_SUPPLIER_SUCCESS,
    supplier,
    call,
    supply,
    companyTypes,
    companySizes,
    societyTypes,
    countries,
  };
}
function getDataCategorySuccess(categories) {
  return {
    type: GET_DATA_CATEGORIES_SUCCESS,
    categories,
  };
}
function getDataSubCategorySuccess(subcategories) {
  return {
    type: GET_DATA_SUBCATEGORIES_SUCCESS,
    subcategories,
  };
}
function changeParticipate(participateInCall) {
  return {
    type: CHANGE_PARTICIPATE,
    participateInCall,
  };
}
function getDataDepartmentsByCountrySuccess(departments) {
  return {
    type: GET_DATA_DEPARTMENTS_SUCCESS,
    departments,
  };
}
function getDataCitiesByDepartmentSuccess(cities) {
  return {
    type: GET_DATA_CITIES_SUCCESS,
    cities,
  };
}
function getDataDimensionsBySuplySuccess(dimensions) {
  return {
    type: GET_DATA_DIMENSION_SURVEY_SUCCESS,
    dimensions,
  };
}

function getDataQuestionsByDimensionSuccess(questions, idDimension) {
  return {
    type: GET_DATA_QUESTIONS_DIMENSION_SUCCESS,
    questions,
    idDimension,
  };
}

function saveDataCallSuccess(call) {
  return {
    type: SAVE_DATA_SUPPLIER_CALL_SUCCESS,
    call,
  };
}
function saveDataCallAndSupplerSuccess(call, supplier) {
  return {
    type: SAVE_DATA_SUPPLIER_AND_CALL_SUCCESS,
    call,
    supplier,
  };
}

function getDataFailed(error) {
  return {
    type: GET_REQUEST_FAILED,
    error,
  };
}

function getDataSupplier() {
  return (dispatch) => {
    const promises = [
      getDataSuppliertApi(),
      getDataCallSuppliertApi(),
      getDataSupplyApi(),
      getDataCompanyTypesApi(),
      getDataCompanySizeApi(),
      getDataSocietyTypesApi(),
      getDataCountriesApi(),
    ];
    requestApi(dispatch, getDataSupplierProgress, axios.all, promises).then((arrayResponse) => {
      const supplier = arrayResponse[0].data.data;
      const call = arrayResponse[1].data.data;
      const supply = arrayResponse[2].data.data;
      const companyTypes = arrayResponse[3].data.data;
      const companySizes = arrayResponse[4].data.data;
      const societyTypes = arrayResponse[5].data.data;
      const countries = arrayResponse[6].data.data;
      dispatch(getDataSupplierSuccess(
        supplier,
        call,
        supply,
        companyTypes,
        companySizes,
        societyTypes,
        countries,
      ));
    }).catch((err) => {
      dispatch(getDataFailed(err));
    });
  };
}
function getDataCategoryBySuply(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, getDataCategoryBySuplyApi, clientData)
      .then((respone) => {
        const categories = respone.data.data;
        dispatch(getDataCategorySuccess(categories));
      }).catch((err) => {
        dispatch(getDataFailed(err));
      });
  };
}
function getDataSubCategoryByCategory(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, getDataSubCategoryByCategoryApi, clientData)
      .then((respone) => {
        const subcategories = respone.data.data;
        dispatch(getDataSubCategorySuccess(subcategories));
      }).catch((err) => {
        dispatch(getDataFailed(err));
      });
  };
}

function getDataDepartmentsByCountry(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, getDataDepartmentsByCountryApi, clientData)
      .then((respone) => {
        const departsments = respone.data.data;
        dispatch(getDataDepartmentsByCountrySuccess(departsments));
      }).catch((err) => {
        dispatch(getDataFailed(err));
      });
  };
}
function getDataCitiesByDepartment(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, getDataCitiesByDepartmentApi, clientData)
      .then((respone) => {
        const categories = respone.data.data;
        dispatch(getDataCitiesByDepartmentSuccess(categories));
      }).catch((err) => {
        dispatch(getDataFailed(err));
      });
  };
}
function getDimensionsBySurvey(idSurvey) {
  return (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, getDimensionsBySurveyApi, idSurvey)
      .then((respone) => {
        const dimensions = respone.data.data;
        dispatch(getDataDimensionsBySuplySuccess(dimensions));
      }).catch((err) => {
        dispatch(getDataFailed(err));
      });
  };
}
function getQuestionsByDimension(idSurvey, idDimension) {
  return (dispatch) => {
    requestApi(dispatch,
      getDataSupplierProgress,
      getQuestionsByDimensionApi,
      { idSurvey, idDimension },
    )
      .then((respone) => {
        const dimensions = respone.data.data;
        dispatch(getDataQuestionsByDimensionSuccess(dimensions, idDimension));
      }).catch((err) => {
        dispatch(getDataFailed(err));
      });
  };
}
function saveDataCallBySupplier(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, saveDataCallBySupplierApi, clientData)
      .then((respone) => {
        const call = respone.data.data;
        dispatch(saveDataCallSuccess(call));
      }).catch((err) => {
        dispatch(getDataFailed(err));
      });
  };
}

function saveDataCallSupplier(clientCall, clientSupplier) {
  return (dispatch) => {
    const promises = [
      saveDataCallBySupplierApi(clientCall),
      saveDataSuppliertApi(clientSupplier),
    ];
    requestApi(dispatch, getDataSupplierProgress, axios.all, promises).then((arrayResponse) => {
      const call = arrayResponse[0].data.data;
      const supplier = arrayResponse[1].data.data;
      dispatch(saveDataCallAndSupplerSuccess(call, supplier));
    }).catch((err) => {
      dispatch(getDataFailed(err));
    });
  };
}

export {
  getDataSupplier,
  getDataCategoryBySuply,
  getDataSubCategoryByCategory,
  getDataDepartmentsByCountry,
  getDataCitiesByDepartment,
  getDimensionsBySurvey,
  getQuestionsByDimension,
  saveDataCallBySupplier,
  saveDataCallSupplier,
  changeParticipate,
};
