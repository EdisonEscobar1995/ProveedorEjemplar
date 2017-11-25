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
  SAVE_DATA_ANSWER_SUCCESS,
  GET_REQUEST_FAILED,
  CHANGE_PARTICIPATE,
  UPDATE_DOCUMENTS,
} from './const';
import {
  getDataSuppliertApi,
  getDataCallSuppliertApi,
  getDataQuestionsBySurverrApi,
  saveDataSuppliertApi,
  saveDataCallBySupplierApi,
} from '../../api/supplier';
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
import { saveAnswerApi } from '../../api/answer';
import requestApi, { requestApiNotLoading } from '../../utils/actionUtils';


function getDataSupplierProgress() {
  return {
    type: GET_DATA_SUPPLIER_PROGRESS,
  };
}

function getDataSupplierSuccess(data) {
  const {
    supplier,
    call,
    supply,
    companyTypes,
    companySizes,
    societyTypes,
    countries,
    categories,
    subcategories,
    departments,
    cities,
  } = data;
  return {
    type: GET_DATA_SUPPLIER_SUCCESS,
    supplier,
    call,
    supply,
    companyTypes,
    companySizes,
    societyTypes,
    countries,
    categories,
    subcategories,
    departments,
    cities,
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
function updateDocuments(document) {
  return (dispatch, getActualState) => {
    const supplier = { ...getActualState().supplier.supplier };
    supplier.document.push(document);
    const newData = {
      type: UPDATE_DOCUMENTS,
      supplier,
    };
    dispatch(newData);
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

function getDataQuestionsByDimensionSuccess(idDimension, dimensions, data) {
  const { criterion, questions } = data;
  let result = [];
  if (criterion.length > 0) {
    result = criterion.map(criteria => (
      {
        ...criteria,
        questions: questions.filter(question => question.idCriterion === criteria.id),
      }
    ));
  }
  const noCriterianQuestion = questions.filter(question => question.idCriterion === '');
  if (noCriterianQuestion.length > 0) {
    result.unshift({
      name: '',
      id: 1,
      questions: noCriterianQuestion,
    });
  }
  dimensions.filter(item => item.id === idDimension)[0].criterions = result;
  return {
    type: GET_DATA_QUESTIONS_DIMENSION_SUCCESS,
    dimensions,
  };
}

function saveDataCallSuccess(call) {
  return {
    type: SAVE_DATA_SUPPLIER_CALL_SUCCESS,
    call,
  };
}
function saveAnswerSuccess(dimensions, idDimension, answer, idCriterion) {
  const allDimensions = [...dimensions];
  const actualDimension = allDimensions.filter(dimension => dimension.id === idDimension)[0];
  const actualCriterion = actualDimension.criterions
    .filter(criteria => criteria.id === idCriterion)[0];
  const actualQuestion = actualCriterion.questions
    .filter(question => question.id === answer.idQuestion)[0];
  actualQuestion.answer.push(answer);
  return {
    type: SAVE_DATA_ANSWER_SUCCESS,
    dimensions: allDimensions,
  };
}
function saveDataCallAndSupplerSuccess(call, supplier, changeIdCompanySize) {
  return {
    type: SAVE_DATA_SUPPLIER_AND_CALL_SUCCESS,
    call,
    supplier,
    changeIdCompanySize,
  };
}

function getDataFailed(error) {
  return {
    type: GET_REQUEST_FAILED,
    error,
  };
}

function loadDependingOptions(dispatch, api, data, filterField, valueField) {
  const { supplier } = data;
  const filterValue = supplier[filterField];
  const allData = {
    ...data,
  };
  if (filterValue) {
    return requestApiNotLoading(dispatch, api, filterValue)
      .then((respone) => {
        allData[valueField] = respone.data.data;
        return allData;
      });
  }
  allData[valueField] = [];
  return allData;
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
      return {
        supplier,
        call,
        supply,
        companyTypes,
        companySizes,
        societyTypes,
        countries,
      };
    }).then(data => loadDependingOptions(dispatch, getDataCategoryBySuplyApi, data, 'idSupply', 'categories'))
      .then(data => loadDependingOptions(dispatch, getDataSubCategoryByCategoryApi, data, 'idCategory', 'subcategories'))
      .then(data => loadDependingOptions(dispatch, getDataDepartmentsByCountryApi, data, 'idCountry', 'departments'))
      .then(data => loadDependingOptions(dispatch, getDataCitiesByDepartmentApi, data, 'idDepartment', 'cities'))
      .then((data) => {
        dispatch(getDataSupplierSuccess(data));
      })
      .catch((err) => {
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
        const cities = respone.data.data;
        dispatch(getDataCitiesByDepartmentSuccess(cities));
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
  return (dispatch, getActualState) => {
    requestApi(dispatch,
      getDataSupplierProgress,
      getDataQuestionsBySurverrApi,
      { idSurvey, idDimension },
    )
      .then((respone) => {
        const questions = respone.data.data;
        dispatch(getDataQuestionsByDimensionSuccess(
          idDimension,
          getActualState().supplier.dimensions,
          questions,
        ));
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
function saveAnswer(clientAnswer, idDimension, idCriterion) {
  return (dispatch, getActualState) => {
    requestApi(dispatch, getDataSupplierProgress, saveAnswerApi, clientAnswer)
      .then((respone) => {
        const answer = respone.data.data;
        const dimensions = [...getActualState().supplier.dimensions];
        dispatch(saveAnswerSuccess(dimensions, idDimension, answer, idCriterion));
      }).catch((err) => {
        dispatch(getDataFailed(err));
      });
  };
}

function saveDataCallSupplier(clientCall, clientSupplier) {
  return (dispatch, getActualState) => {
    const promises = [
      saveDataCallBySupplierApi(clientCall),
      saveDataSuppliertApi(clientSupplier),
    ];
    requestApi(dispatch, getDataSupplierProgress, axios.all, promises).then((arrayResponse) => {
      const call = arrayResponse[0].data.data;
      const supplier = arrayResponse[1].data.data;
      const oldSupplies = getActualState().supplier.supplier;
      const changeIdCompanySize = oldSupplies.idCompanySize !== supplier.idCompanySize;
      dispatch(saveDataCallAndSupplerSuccess(call, supplier, changeIdCompanySize));
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
  saveAnswer,
  changeParticipate,
  updateDocuments,
};
