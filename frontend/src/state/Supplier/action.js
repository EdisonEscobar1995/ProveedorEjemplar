import axios from 'axios';
import {
  GET_DATA_SUPPLIER_PROGRESS,
  GET_DATA_SUPPLIER_SUCCESS,
  GET_DATA_CATEGORIES_SUCCESS,
  GET_DATA_SUBCATEGORIES_SUCCESS,
  GET_DATA_DEPARTMENTS_SUCCESS,
  GET_DATA_CITIES_SUCCESS,
  GET_REQUEST_FAILED,
} from './const';
import setMessage from '../Generic/action';
import getDataSuppliertApi from '../../api/supplier';
import { getDataSupplyApi } from '../../api/supply';
import { getDataCategoryBySuplyApi } from '../../api/category';
import { getDataSubCategoryByCategoryApi } from '../../api/subcategory';
import getDataCompanyTypesApi from '../../api/companyType';
import { getDataCompanySizeApi } from '../../api/companySize';
import getDataSocietyTypesApi from '../../api/societyType';
import getDataCountriesApi from '../../api/countries';
import getDataDepartmentsByCountryApi from '../../api/departments';
import getDataCitiesByDepartmentApi from '../../api/cities';


function getDataSupplierProgress() {
  return {
    type: GET_DATA_SUPPLIER_PROGRESS,
  };
}

function getDataSupplierSuccess(
  supplier,
  supply,
  companyTypes,
  companySizes,
  societyTypes,
  countries,
) {
  return {
    type: GET_DATA_SUPPLIER_SUCCESS,
    supplier,
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

function getDataFailed(error) {
  return {
    type: GET_REQUEST_FAILED,
    error,
  };
}

function validateResponse(args) {
  const errorMessage = 'Fallo en la respuesta';
  try {
    [...args].forEach((element) => {
      if (!element.data.status) {
        throw new Error(errorMessage);
      }
    });
  } catch (err) {
    throw new Error(errorMessage);
  }
}

function requestApi(dispatch, apiMethod, clientData) {
  dispatch(getDataSupplierProgress());
  return apiMethod(clientData)
    .then((respone) => {
      validateResponse(respone);
      return respone;
    }).catch((err) => {
      let error = err;
      if (typeof err !== 'string') {
        error = 'Ocurrio un error al procesar la peticion';
      }
      dispatch(setMessage(error, 'error'));
      throw err;
    });
}

function getDataSupplier() {
  return (dispatch) => {
    const promises = [
      getDataSuppliertApi(),
      getDataSupplyApi(),
      getDataCompanyTypesApi(),
      getDataCompanySizeApi(),
      getDataSocietyTypesApi(),
      getDataCountriesApi(),
    ];
    requestApi(dispatch, axios.all, promises).then((arrayResponse) => {
      const supplier = arrayResponse[0].data.data;
      const supply = arrayResponse[1].data.data;
      const companyTypes = arrayResponse[2].data.data;
      const companySizes = arrayResponse[3].data.data;
      const societyTypes = arrayResponse[4].data.data;
      const countries = arrayResponse[5].data.data;
      dispatch(getDataSupplierSuccess(
        supplier,
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
    requestApi(dispatch, getDataCategoryBySuplyApi, clientData)
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
    requestApi(dispatch, getDataSubCategoryByCategoryApi, clientData)
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
    requestApi(dispatch, getDataDepartmentsByCountryApi, clientData)
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
    requestApi(dispatch, getDataCitiesByDepartmentApi, clientData)
      .then((respone) => {
        const categories = respone.data.data;
        dispatch(getDataCitiesByDepartmentSuccess(categories));
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
};
