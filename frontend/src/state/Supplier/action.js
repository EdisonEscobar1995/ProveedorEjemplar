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
} from './const';
import {
  getDataSuppliertApi,
  getDataCallSuppliertApi,
  getDataQuestionsBySurverrApi,
  saveDataSuppliertApi,
  saveDataCallBySupplierApi,
  finishSurveyApi,
} from '../../api/supplier';
import getMasterApi from '../../api/master';
import { getDataCategoryBySuplyApi } from '../../api/category';
import { getDataSubCategoryByCategoryApi } from '../../api/subcategory';
import getDataDepartmentsByCountryApi from '../../api/departments';
import getDataCitiesByDepartmentApi from '../../api/cities';
import { getDimensionsBySurveyApi } from '../../api/dimension';
import { deleteAttachmentApi } from '../../api/attachment';
import { saveAnswerApi } from '../../api/answer';
import { saveCustomerApi, deleteCustomerApi } from '../../api/customer';
import requestApi, { requestApiNotLoading } from '../../utils/actionUtils';
import setMessage from '../Generic/action';


function getDataSupplierProgress() {
  return {
    type: GET_DATA_SUPPLIER_PROGRESS,
  };
}

function getDataSupplierSuccess(data) {
  const {
    supplier,
    call,
    rules,
    supply,
    companyTypes,
    companySizes,
    societyTypes,
    countries,
    categories,
    subcategories,
    sectors,
    departments,
    cities,
    system,
  } = data;
  const { principalCustomer } = supplier;
  let { readOnly } = rules;
  readOnly = readOnly || call.lockedByModification;
  return {
    type: GET_DATA_SUPPLIER_SUCCESS,
    supplier,
    readOnly,
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
    sectors,
    principalCustomer,
    system,
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
function reloadDimensions(dimensions) {
  return {
    type: RELOAD_DIMENSIONS,
    dimensions,
  };
}
function updateAttachment(data, field) {
  return (dispatch, getActualState) => {
    const supplier = { ...getActualState().supplier.supplier };
    supplier[field].push(data);
    const newData = {
      type: UPDATE_ATTACHMENT,
      supplier,
    };
    dispatch(newData);
  };
}
function updateChangeIdCompanySize(idCompanySize) {
  return (dispatch, getActualState) => {
    const supplier = { ...getActualState().supplier.supplier };
    const changeIdCompanySize = supplier.idCompanySize !== idCompanySize;
    const newData = {
      type: UPDATE_CHANGEIDCOMPANYSIZE,
      changeIdCompanySize,
    };
    dispatch(newData);
  };
}
function deleteAttachmentSuccess(supplier, field, idAttachment) {
  supplier[field].filter(attach => attach.id !== idAttachment);
  return {
    type: DELETE_ATTACHMENT,
    supplier,
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
    readOnly: call.lockedByModification,
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
  if (actualQuestion.errors) {
    if (answer.idOptionSupplier || answer.responseSupplier) {
      actualQuestion.errors.answers = false;
    }
    if (actualQuestion.requireAttachment) {
      if (answer.attachment) {
        if (answer.attachment.length > 0) {
          actualQuestion.errors.attachments = false;
        }
      }
    }
  }
  return {
    type: SAVE_DATA_ANSWER_SUCCESS,
    dimensions: allDimensions,
  };
}
function saveDataCallAndSupplerSuccess(call, supplier) {
  return {
    type: SAVE_DATA_SUPPLIER_AND_CALL_SUCCESS,
    call,
    supplier,
    readOnly: call.lockedByModification,
  };
}

function getFailedRequest(error) {
  return {
    type: GET_REQUEST_FAILED,
    error,
  };
}

function addDataCustomer(newItem) {
  return {
    type: ADD_CUSTOMER,
    newItem,
  };
}
function editDataCustomer(index) {
  return {
    type: EDIT_CUSTOMER,
    index,
  };
}
function saveDataCustomer(data, index) {
  return {
    type: SAVE_CUSTOMER,
    data,
    index,
  };
}
function deleteDataCustomer(index) {
  return {
    type: DELETE_CUSTOMER,
    index,
  };
}
function cancelDataCustomer(index) {
  return {
    type: CANCEL_CUSTOMER,
    index,
  };
}
function finishSurveySucess(data) {
  return {
    type: FINISH_SURVEY,
    data,
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
      }).catch(() => {
        allData[valueField] = [];
        return allData;
      });
  }
  allData[valueField] = [];
  return allData;
}

function getDataSupplier() {
  return (dispatch) => {
    const masters = [
      'Supply',
      'CompanyType',
      'CompanySize',
      'SocietyType',
      'Country',
      'Sector',
      'System',
    ];
    const promises = [
      getDataSuppliertApi(),
      getDataCallSuppliertApi(),
      getMasterApi(masters),
    ];
    requestApi(dispatch, getDataSupplierProgress, axios.all, promises).then((arrayResponse) => {
      const supplier = arrayResponse[0].data.data;
      const call = arrayResponse[1].data.data;
      const rules = arrayResponse[1].data.rules;
      const mainMaster = arrayResponse[2].data.data;
      const supply = mainMaster.Supply;
      const companyTypes = mainMaster.CompanyType;
      const companySizes = mainMaster.CompanySize;
      const societyTypes = mainMaster.SocietyType;
      const sectors = mainMaster.Sector;
      const countries = mainMaster.Country;
      const system = mainMaster.System[0] ? mainMaster.System[0] : {};
      return {
        supplier,
        call,
        rules,
        supply,
        companyTypes,
        companySizes,
        societyTypes,
        countries,
        sectors,
        system,
      };
    }).then(data => loadDependingOptions(dispatch, getDataCategoryBySuplyApi, data, 'idSupply', 'categories'))
      .then(data => loadDependingOptions(dispatch, getDataSubCategoryByCategoryApi, data, 'idCategory', 'subcategories'))
      .then(data => loadDependingOptions(dispatch, getDataDepartmentsByCountryApi, data, 'idCountry', 'departments'))
      .then(data => loadDependingOptions(dispatch, getDataCitiesByDepartmentApi, data, 'idDepartment', 'cities'))
      .then((data) => {
        dispatch(getDataSupplierSuccess(data));
      })
      .catch((err) => {
        dispatch(getFailedRequest(err));
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
        dispatch(getFailedRequest(err));
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
        dispatch(getFailedRequest(err));
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
        dispatch(getFailedRequest(err));
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
        dispatch(getFailedRequest(err));
      });
  };
}
function getDimensionsBySurvey(idSurvey) {
  return (dispatch, getActualState) => {
    const actualDimensions = getActualState().supplier.dimensions;
    if (actualDimensions.length === 0) {
      requestApi(dispatch, getDataSupplierProgress, getDimensionsBySurveyApi, idSurvey)
        .then((respone) => {
          const dimensions = respone.data.data;
          dispatch(getDataDimensionsBySuplySuccess(dimensions));
        }).catch((err) => {
          dispatch(getFailedRequest(err));
        });
    }
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
        dispatch(getFailedRequest(err));
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
        dispatch(getFailedRequest(err));
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
        dispatch(getFailedRequest(err));
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
      dispatch(setMessage('Información almacenada', 'success'));
      dispatch(saveDataCallAndSupplerSuccess(call, supplier));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
  };
}
function deleteAttachment(idAttachment, field) {
  return (dispatch, getActualState) => {
    requestApi(
      dispatch,
      getDataSupplierProgress,
      deleteAttachmentApi,
      idAttachment,
    ).then(() => {
      const supplier = { ...getActualState().supplier.supplier };
      dispatch(deleteAttachmentSuccess(supplier, field, idAttachment));
    }).catch((err) => {
      dispatch(getFailedRequest(err));
    });
  };
}

function saveCustomer(clientData, index) {
  return (dispatch, getActualState) => {
    const mapData = {
      idSupplier: getActualState().supplier.supplier.id,
    };
    const mapedData = Object.assign(clientData, mapData);
    requestApi(dispatch, getDataSupplierProgress, saveCustomerApi, mapedData)
      .then((respose) => {
        const { data } = respose.data;
        dispatch(saveDataCustomer(data, index));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  };
}

function deleteCustomer(clientData, index) {
  const { id } = clientData;
  return (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, deleteCustomerApi, id)
      .then(() => {
        dispatch(deleteDataCustomer(index));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  };
}
function finishSurvey() {
  return (dispatch, getActualState) => {
    const { call } = { ...getActualState().supplier };
    requestApi(dispatch, getDataSupplierProgress, finishSurveyApi, call)
      .then((response) => {
        const data = response.data.data;
        dispatch(finishSurveySucess(data));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
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
  updateAttachment,
  deleteAttachment,
  updateChangeIdCompanySize,
  saveCustomer as saveDataCustomer,
  deleteCustomer as deleteDataCustomer,
  addDataCustomer,
  editDataCustomer,
  cancelDataCustomer,
  reloadDimensions,
  finishSurvey,
};
