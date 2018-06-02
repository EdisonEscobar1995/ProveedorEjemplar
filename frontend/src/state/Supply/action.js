import {
  GET_SUPPLY_PROGRESS,
  GET_SUPPLY_SUCCESS,
  COLLAPSE_SUPPLY,
  GET_CATEGORY_BY_SUPPLY_SUCCESS,
  GET_SUBCATEGORY_BY_CATEGORY_SUCCESS,
  COLLAPSE_CATEGORY,
  REQUEST_FAILED,
  ADD_SUPPLY,
  UPDATE_SUPPLY,
  DELETE_SUPPLY,
  SEARCH_SUPPLY,
  CHANGE_SEARCH_SUPPLY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  SEARCH_CATEGORY,
  CHANGE_SEARCH_CATEGORY,
  ADD_SUBCATEGORY,
  UPDATE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  SEARCH_SUBCATEGORY,
  CHANGE_SEARCH_SUBCATEGORY,
} from './const';
import { getSuppliesApi, saveSupplyApi, deleteSupplyApi } from '../../api/supply';
import { getCategoryBySupplyApi, saveCategoryApi, deleteCategoryApi } from '../../api/category';
import { getSubcategoryByCategoryApi, saveSubcategoryApi, deleteSubcategoryApi } from '../../api/subcategory';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';
import blankSpaces from '../../utils/blankSpaces';

function getSupplyProgress() {
  return {
    type: GET_SUPPLY_PROGRESS,
  };
}

function getSupplySuccess(data) {
  return {
    type: GET_SUPPLY_SUCCESS,
    data,
  };
}

function getCategoryBySupplySuccess(data, id) {
  return {
    type: GET_CATEGORY_BY_SUPPLY_SUCCESS,
    data,
    id,
  };
}

function getSubcategoryByCategorySuccess(data, id) {
  return {
    type: GET_SUBCATEGORY_BY_CATEGORY_SUCCESS,
    data,
    id,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataSupply(id, data, remoteId) {
  return {
    type: id ? UPDATE_SUPPLY : ADD_SUPPLY,
    data,
    remoteId,
  };
}

function saveDataCategory(id, data, remoteId) {
  return {
    type: id ? UPDATE_CATEGORY : ADD_CATEGORY,
    data,
    remoteId,
  };
}

function saveDataSubcategory(id, data, remoteId) {
  return {
    type: id ? UPDATE_SUBCATEGORY : ADD_SUBCATEGORY,
    data,
    remoteId,
  };
}

function deleteDataSupply(data) {
  return {
    type: DELETE_SUPPLY,
    data,
  };
}

function deleteDataCategory(data) {
  return {
    type: DELETE_CATEGORY,
    data,
  };
}

function deleteDataSubcategory(data) {
  return {
    type: DELETE_SUBCATEGORY,
    data,
  };
}

function searchSupply(value) {
  return {
    type: SEARCH_SUPPLY,
    value,
  };
}

function searchCategory(value, parentId) {
  return {
    type: SEARCH_CATEGORY,
    value,
    parentId,
  };
}

function searchSubcategory(value, parentId) {
  return {
    type: SEARCH_SUBCATEGORY,
    value,
    parentId,
  };
}

function changeSearchSupply(value) {
  return {
    type: CHANGE_SEARCH_SUPPLY,
    value,
  };
}

function changeSearchCategory(value, parentId) {
  return {
    type: CHANGE_SEARCH_CATEGORY,
    value,
    parentId,
  };
}

function changeSearchSubcategory(value, parentId) {
  return {
    type: CHANGE_SEARCH_SUBCATEGORY,
    value,
    parentId,
  };
}

function collapseSupply(data) {
  return {
    type: COLLAPSE_SUPPLY,
    data,
  };
}

function collapseCategory(data) {
  return {
    type: COLLAPSE_CATEGORY,
    data,
  };
}

function getSupplies() {
  return (dispatch) => {
    requestApi(dispatch, getSupplyProgress, getSuppliesApi)
      .then((response) => {
        const data = response.data.data.map(element => ({
          ...element,
          visible: true,
        }));
        dispatch(getSupplySuccess(data));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function getCategoryBySupply(id) {
  return (dispatch) => {
    requestApi(dispatch, getSupplyProgress, getCategoryBySupplyApi, id)
      .then((response) => {
        const data = response.data.data.map(element => ({
          ...element,
          visible: true,
        }));
        dispatch(getCategoryBySupplySuccess(data, id));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function getSubcategoryByCategory(id) {
  return (dispatch) => {
    requestApi(dispatch, getSupplyProgress, getSubcategoryByCategoryApi, id)
      .then((response) => {
        const data = response.data.data.map(element => ({
          ...element,
          visible: true,
        }));
        dispatch(getSubcategoryByCategorySuccess(data, id));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveSupply(clientData, remoteId, next) {
  return (dispatch) => {
    if (!blankSpaces(dispatch, clientData.name)) {
      return;
    }
    clientData.name = clientData.name.trim();
    dispatch(closeModal());
    requestApi(dispatch, getSupplyProgress, saveSupplyApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataSupply(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveCategory(clientData, remoteId, next) {
  return (dispatch) => {
    if (!blankSpaces(dispatch, clientData.name)) {
      return;
    }
    clientData.name = clientData.name.trim();
    dispatch(closeModal());
    requestApi(dispatch, getSupplyProgress, saveCategoryApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataCategory(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveSubcategory(clientData, remoteId, next) {
  return (dispatch) => {
    if (!blankSpaces(dispatch, clientData.name)) {
      return;
    }
    clientData.name = clientData.name.trim();
    dispatch(closeModal());
    requestApi(dispatch, getSupplyProgress, saveSubcategoryApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataSubcategory(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteSupply(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getSupplyProgress, deleteSupplyApi, clientData)
      .then(() => {
        dispatch(deleteDataSupply(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteCategory(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getSupplyProgress, deleteCategoryApi, clientData)
      .then(() => {
        dispatch(deleteDataCategory(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteSubcategory(clientData) {
  return (dispatch) => {
    requestApi(dispatch, getSupplyProgress, deleteSubcategoryApi, clientData)
      .then(() => {
        dispatch(deleteDataSubcategory(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getSupplies,
  saveSupply,
  deleteSupply,
  searchSupply,
  changeSearchSupply,
  getCategoryBySupply,
  saveCategory,
  deleteCategory,
  searchCategory,
  changeSearchCategory,
  getSubcategoryByCategory,
  saveSubcategory,
  deleteSubcategory,
  searchSubcategory,
  changeSearchSubcategory,
  collapseSupply,
  collapseCategory,
  openModal,
  closeModal,
};
