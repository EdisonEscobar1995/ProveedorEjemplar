import axios from 'axios';
import { notification } from 'antd';
import {
  GET_DATA_SUPPLIER_PROGRESS,
  GET_DIMENSIONS_PROGRESS,
  GET_DATA_SUPPLIER_SUCCESS,
  GET_DATA_CATEGORIES_SUCCESS,
  GET_DATA_SUBCATEGORIES_SUCCESS,
  GET_DATA_DEPARTMENTS_SUCCESS,
  GET_DATA_DIMENSION_SURVEY_SUCCESS,
  GET_DATA_CITIES_SUCCESS,
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
import {
  getDataSuppliertApi,
  getDataCallSuppliertApi,
  getDataQuestionsBySurveyApi,
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
import { saveAnswerApi, deleteMassiveAnswersApi } from '../../api/answer';
import getDataStateApi from '../../api/state';
import { requestApi, requestApiNotLoading, sortByField } from '../../utils/action';
import setMessage from '../Generic/action';
import reloadKeys from '../../utils/reducer';


const getDataSupplierProgress = () => (
  {
    type: GET_DATA_SUPPLIER_PROGRESS,
  }
);
const getDataDimensionsProgress = () => (
  {
    type: GET_DIMENSIONS_PROGRESS,
  }
);

function isReadOnly({ lockedByModification, participateInCall }) {
  return lockedByModification || participateInCall === 'false';
}

const openNotificationWithIcon = (type) => {
  let messageToShow = '';
  let descriptionToShow = '';

  switch (type) {
    case 'success':
      messageToShow = 'Guardado exitoso';
      descriptionToShow = 'Respuesta guardada.';
      break;
    case 'error':
    default:
      messageToShow = 'Error guardando';
      descriptionToShow = 'La respuesta no pudo ser guardada';
      break;
  }

  notification[type]({
    message: messageToShow,
    description: descriptionToShow,
  });
};

const sumTotalSupplier = (supplier, reload) => {
  let total = supplier.numberOfDirectEmployees + supplier.numberOfSubContratedEmployees;
  if (isNaN(total)) {
    total = 0;
  }
  supplier.employeesTotal = total;
  if (reload) {
    const { principalCustomer } = supplier;
    supplier.principalCustomer = reloadKeys(principalCustomer);
  }
  return supplier;
};

const getDataSupplierSuccess = (data) => {
  data.supplier = sumTotalSupplier(data.supplier, true);
  data.supplier.actualSector = data.supplier.idSector;
  data.supplier.actuallyExport = data.supplier.currentlyExport;
  const {
    supplier,
    call,
    rules,
    supply,
    system,
    stateData,
  } = data;

  const companyTypes = sortByField(data.companyTypes, 'name');
  const companySizes = sortByField(data.companySizes, 'name');
  const societyTypes = sortByField(data.societyTypes, 'name');
  const countries = sortByField(data.countries, 'name');
  const categories = sortByField(data.categories, 'name');
  const subcategories = sortByField(data.subcategories, 'name');
  const sectors = sortByField(data.sectors, 'name');
  const departments = sortByField(data.departments, 'name');
  const cities = sortByField(data.cities, 'name');
  if (rules.supplier) {
    rules.supplier.readOnly = rules.supplier.readOnly || isReadOnly(call);
  }
  return {
    type: GET_DATA_SUPPLIER_SUCCESS,
    supplier,
    rules,
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
    stateData,
    sectors,
    system,
  };
};

const cleanStore = () => ({
  type: CLEAN_STORE,
});

const getDataCategorySuccess = categories => (
  {
    type: GET_DATA_CATEGORIES_SUCCESS,
    categories,
  }
);
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
    if (data) {
      supplier[field] = data;
    }
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
function deleteAttachmentSuccess(supplier) {
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

const validateAnswer = (question, questions) => {
  if (question.type === 'Cerrada') {
    return questions.filter(item => item.dependOfQuestion === question.id);
  }
  return [];
};

const searchChildren = (actualQuestion, childs, allQuestions, isVisible, removeIds) => {
  if (!isVisible) {
    if (removeIds && actualQuestion.answer.length > 0) {
      removeIds.push(actualQuestion.answer[0].id);
    }
    actualQuestion.answer = [];
  }
  actualQuestion.visible = isVisible;
  childs.forEach((child) => {
    let visible = false;
    if (actualQuestion.answer.length > 0) {
      if (actualQuestion.answer[0].idOptionSupplier === child.dependOfOptionId) {
        visible = true;
      }
    }
    const filtred = validateAnswer(child, allQuestions);
    searchChildren(child, filtred, allQuestions, (visible && isVisible), removeIds);
  });
};

const removeRecursive = (actualQuestion, questions, removeIds) => {
  const visibles = [...questions];
  const filteredDependency = validateAnswer(actualQuestion, visibles);
  searchChildren(actualQuestion, filteredDependency, visibles, true, removeIds);
  return visibles;
};

const showQuestions = (questions) => {
  const visibleQuestions = [...questions];
  visibleQuestions.forEach((question) => {
    if (question.dependOfOptionId === '') {
      const filteredDependency = validateAnswer(question, questions);
      searchChildren(question, filteredDependency, visibleQuestions, true);
    }
  });
  return visibleQuestions;
};

function saveDataCallSuccess(call) {
  return {
    type: SAVE_DATA_SUPPLIER_CALL_SUCCESS,
    call,
    readOnlySupplier: isReadOnly(call),
  };
}
function saveAnswerSuccess(allDimensions, rules) {
  return {
    type: SAVE_DATA_ANSWER_SUCCESS,
    dimensions: allDimensions,
    rules,
  };
}
function saveDataCallAndSupplerSuccess(call, supplier) {
  return {
    type: SAVE_DATA_SUPPLIER_AND_CALL_SUCCESS,
    call,
    supplier,
    readOnlySupplier: call.lockedByModification,
  };
}

function getFailedRequest(error) {
  return {
    type: GET_REQUEST_FAILED,
    error,
  };
}
function saveDataCustomer(data) {
  return {
    type: SAVE_CUSTOMER,
    data,
  };
}
function deleteDataCustomer(data) {
  return {
    type: DELETE_CUSTOMER,
    data,
  };
}

function finishSurveySucess() {
  return {
    type: FINISH_SURVEY,
    readOnlySupplier: true,
  };
}

function loadStateData(dispatch, api, data) {
  const allData = {
    ...data,
  };
  return requestApiNotLoading(dispatch, api, data.call.idState)
    .then((respone) => {
      allData.stateData = respone.data.data;
      return allData;
    }).catch(() => {
      allData.stateData = { shortName: '' };
      return allData;
    });
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

function getDataSupplier(idSupplier, idSupplierByCall) {
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
      getDataSuppliertApi(idSupplier),
      getDataCallSuppliertApi(idSupplierByCall),
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
    }).then(data => loadStateData(dispatch, getDataStateApi, data))
      .then(data => loadDependingOptions(dispatch, getDataCategoryBySuplyApi, data, 'idSupply', 'categories'))
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
        const categories = sortByField(respone.data.data, 'name');
        dispatch(getDataCategorySuccess(categories));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  };
}
const getDataSubCategoryByCategory = clientData => (
  (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, getDataSubCategoryByCategoryApi, clientData)
      .then((respone) => {
        const subcategories = sortByField(respone.data.data, 'name');
        dispatch(getDataSubCategorySuccess(subcategories));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

const getDataDepartmentsByCountry = clientData => (
  (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, getDataDepartmentsByCountryApi, clientData)
      .then((respone) => {
        const departsments = sortByField(respone.data.data, 'name');
        dispatch(getDataDepartmentsByCountrySuccess(departsments));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);
const getDataCitiesByDepartment = clientData => (
  (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, getDataCitiesByDepartmentApi, clientData)
      .then((respone) => {
        const cities = sortByField(respone.data.data, 'name');
        dispatch(getDataCitiesByDepartmentSuccess(cities));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

const formatData = (data) => {
  const { dimensions, criterions } = data;
  const formatedDimensions = dimensions.map((dimension, index) => {
    const actual = criterions[index];
    const { questions, criterion } = actual;
    const showedQuestions = showQuestions(questions);
    let result = [];
    if (criterion.length > 0) {
      result = criterion.map(criteria => (
        {
          ...criteria,
          questions: showedQuestions.filter(question => question.idCriterion === criteria.id),
        }
      ));
    }
    const noCriterianQuestion = questions.filter(question => question.idCriterion === '');
    if (noCriterianQuestion.length > 0) {
      result.unshift({
        name: '',
        id: 1,
        questions: showedQuestions.filter(question => question.idCriterion === ''),
      });
    }
    dimension.criterions = result;
    return dimension;
  });
  return formatedDimensions;
};

const getDimensionsBySurvey = (idSurvey, id) => (
  (dispatch, getActualState) => {
    const actualDimensions = getActualState().supplier.dimensions;
    if (actualDimensions.length === 0) {
      requestApi(dispatch, getDataDimensionsProgress, getDimensionsBySurveyApi, idSurvey)
        .then(response => response.data.data)
        .then((data) => {
          const promises = [];
          data.forEach((dimesion) => {
            const dataSend = { idSurvey, idDimension: dimesion.id, id };
            promises.push(getDataQuestionsBySurveyApi({ ...dataSend }));
          });
          return requestApiNotLoading(dispatch, axios.all, promises)
            .then((criterionsResponse) => {
              const criterions = [];
              criterionsResponse.forEach((element) => {
                criterions.push(element.data.data);
              });
              return criterions;
            })
            .then(criterions => ({ dimensions: data, criterions }));
        }).then((data) => {
          let dimensions = data.dimensions;
          dimensions = formatData(data);
          dispatch(getDataDimensionsBySuplySuccess(dimensions));
        })
        .catch((err) => {
          dispatch(getFailedRequest(err));
        });
    }
  }
);

const saveDataCallBySupplier = clientData => (
  (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, saveDataCallBySupplierApi, clientData)
      .then((respone) => {
        const call = respone.data.data;
        setMessage('Supplier.savedInfo', 'success');
        dispatch(saveDataCallSuccess(call));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

const deleteAnswers = (dispatch, answers) => (
  requestApiNotLoading(dispatch, deleteMassiveAnswersApi, { idsToDelete: answers })
);

const saveAnswer = (clientAnswer, idDimension, idCriterion) => (
  (dispatch, getActualState) => {
    requestApi(dispatch, getDataSupplierProgress, saveAnswerApi, clientAnswer)
      .then((respone) => {
        const answer = respone.data.data;
        const dimensions = [...getActualState().supplier.dimensions];
        const allDimensions = [...dimensions];
        const actualDimension = allDimensions.find(dimension => dimension.id === idDimension);
        const actualCriterion = actualDimension.criterions
          .find(criteria => criteria.id === idCriterion);
        const actualQuestion = actualCriterion.questions
          .find(question => question.id === answer.idQuestion);
        actualQuestion.answer[0] = answer;
        const removeIds = [];
        actualCriterion.questions = removeRecursive(
          actualQuestion,
          actualCriterion.questions,
          removeIds,
        );
        if (removeIds.length > 0) {
          deleteAnswers(dispatch, removeIds);
        }
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
        dispatch(saveAnswerSuccess(allDimensions, respone.data.rules));
        openNotificationWithIcon('success');
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

const saveDataCallSupplier = clientSupplier => (
  (dispatch) => {
    requestApi(dispatch, getDataSupplierProgress, saveDataSuppliertApi, clientSupplier)
      .then((response) => {
        const supplier = response.data.data;
        return supplier;
      }).then(supplier => (
        requestApiNotLoading(dispatch, getDataCallSuppliertApi)
          .then((response) => {
            const call = response.data.data;
            return {
              call,
              supplier,
            };
          })
      )).then(({ call, supplier = {} }) => {
        dispatch(setMessage('Supplier.savedInfo', 'success'));
        const { principalCustomer } = supplier;
        const clientCustomers = clientSupplier.principalCustomer;
        const newCustomers = principalCustomer.map((customer) => {
          const oldCustomer = clientCustomers.find(item =>
            (
              customer.name === item.name &&
              customer.percentageOfParticipationInSales === item.percentageOfParticipationInSales
            ),
          );
          return {
            ...customer,
            key: oldCustomer.key,
          };
        });
        supplier.principalCustomer = newCustomers;
        dispatch(saveDataCallAndSupplerSuccess(call, sumTotalSupplier(supplier)));
      })
      .catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);
const deleteAttachment = (idAttachment, field) => (
  (dispatch, getActualState) => {
    const supplier = { ...getActualState().supplier.supplier };
    supplier[field] = supplier[field].filter(attach => attach.id !== idAttachment);
    dispatch(deleteAttachmentSuccess(supplier));
  }
);

const addCustomer = clientData => (
  (dispatch, getActualState) => {
    const supplier = { ...getActualState().supplier.supplier };
    const principalCustomer = supplier.principalCustomer;
    const newData = [...principalCustomer];
    newData.push(clientData);
    supplier.principalCustomer = newData;
    dispatch(saveDataCustomer(supplier));
  }
);
const deleteCustomer = (clientData, index) => (
  (dispatch, getActualState) => {
    const supplier = { ...getActualState().supplier.supplier };
    const principalCustomer = supplier.principalCustomer;
    const newData = [...principalCustomer];
    newData.splice(index, 1);
    if (newData && newData.length === 0) {
      newData.push({
        key: 0,
      });
    }
    supplier.principalCustomer = newData;
    dispatch(deleteDataCustomer(supplier));
  }
);
const finishSurvey = () => (
  (dispatch, getActualState) => {
    const { call } = { ...getActualState().supplier };
    requestApi(dispatch, getDataSupplierProgress, finishSurveyApi, call)
      .then(() => {
        dispatch(setMessage('Supplier.surveySuccess', 'success'));
        dispatch(finishSurveySucess());
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);
const updateField = (value, index, fielName) => (
  (dispatch, getActualState) => {
    const supplier = { ...getActualState().supplier.supplier };
    let rowValue = supplier.principalCustomer[index];
    rowValue = rowValue || {};
    const assignObject = {};
    assignObject[fielName] = value;
    rowValue = Object.assign(rowValue, assignObject);
    supplier.principalCustomer[index] = rowValue;
    dispatch({
      type: UPDATE_CUSTOMER,
      data: supplier,
    });
  }
);
const validateNumber = (value) => {
  let result = 0;
  if (value) {
    result = isNaN(value) ? 0 : parseInt(value, 10);
  }
  return result;
};

const setNumberOfDirectEmployees = value => (
  {
    type: ADD_DIRECT_EMPLOYEES,
    value: validateNumber(value),
  }
);

const setNumberOfSubContratedEmployees = value => (
  {
    type: ADD_SUB_EMPLOYEES,
    value: validateNumber(value),
  }
);
const setSector = value => (
  {
    type: SET_SECTOR,
    value,
  }
);
const setExport = value => (
  {
    type: SET_EXPORT,
    value: value === 'true',
  }
);

export {
  getDataSupplier,
  getDataCategoryBySuply,
  getDataSubCategoryByCategory,
  getDataDepartmentsByCountry,
  getDataCitiesByDepartment,
  getDimensionsBySurvey,
  saveDataCallBySupplier,
  saveDataCallSupplier,
  saveAnswer,
  changeParticipate,
  updateAttachment,
  deleteAttachment,
  updateChangeIdCompanySize,
  deleteCustomer as deleteDataCustomer,
  addCustomer as addDataCustomer,
  reloadDimensions,
  finishSurvey,
  setNumberOfDirectEmployees,
  setNumberOfSubContratedEmployees,
  setSector,
  setExport,
  updateField,
  cleanStore,
};
