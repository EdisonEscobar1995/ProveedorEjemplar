import {
  GET_SUPPLY_PROGRESS,
  GET_SUPPLY_SUCCESS,
  GET_CATEGORY_BY_SUPPLY_SUCCESS,
  GET_SUBCATEGORY_BY_CATEGORY_SUCCESS,
  REQUEST_FAILED,
  ADD_SUPPLY,
  SAVE_SUPPLY,
  DELETE_SUPPLY,
  ADD_CATEGORY,
  SAVE_CATEGORY,
  DELETE_CATEGORY,
  ADD_SUBCATEGORY,
  SAVE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
} from './const';
import { getSuppliesApi, saveSupplyApi, deleteSupplyApi } from '../../api/supply';
import { getCategoryBySupplyApi, saveCategoryApi, deleteCategoryApi } from '../../api/category';
import { getSubcategoryByCategoryApi, saveSubcategoryApi, deleteSubcategoryApi } from '../../api/subcategory';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';

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

function saveDataSupply(data, index, id) {
  return {
    type: id ? SAVE_SUPPLY : ADD_SUPPLY,
    data,
    index,
  };
}

function saveDataCategory(data, index, id) {
  return {
    type: id ? SAVE_CATEGORY : ADD_CATEGORY,
    data,
    index,
  };
}

function saveDataSubcategory(data, index, id) {
  return {
    type: id ? SAVE_SUBCATEGORY : ADD_SUBCATEGORY,
    data,
    index,
  };
}

function deleteDataSupply(index) {
  return {
    type: DELETE_SUPPLY,
    index,
  };
}

function deleteDataCategory(index, data) {
  return {
    type: DELETE_CATEGORY,
    index,
    data,
  };
}

function deleteDataSubcategory(index, data) {
  return {
    type: DELETE_SUBCATEGORY,
    index,
    data,
  };
}

function getSupplies() {
  return (dispatch) => {
    requestApi(dispatch, getSupplyProgress, getSuppliesApi)
      .then((response) => {
        const { data } = response.data;
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
        const { data } = response.data;
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
        const { data } = response.data;
        dispatch(getSubcategoryByCategorySuccess(data, id));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveSupply(clientData, index, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getSupplyProgress, saveSupplyApi, clientData)
      .then((response) => {
        const { data } = response.data;
        dispatch(saveDataSupply(data, index, clientData.id));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveCategory(clientData, index, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getSupplyProgress, saveCategoryApi, clientData)
      .then((response) => {
        const { data } = response.data;
        dispatch(saveDataCategory(data, index, clientData.id));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveSubcategory(clientData, index, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getSupplyProgress, saveSubcategoryApi, clientData)
      .then((response) => {
        const { data } = response.data;
        dispatch(saveDataSubcategory(data, index, clientData.id));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteSupply(clientData, index) {
  return (dispatch) => {
    requestApi(dispatch, getSupplyProgress, deleteSupplyApi, clientData)
      .then(() => {
        dispatch(deleteDataSupply(index));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteCategory(clientData, index) {
  return (dispatch) => {
    requestApi(dispatch, getSupplyProgress, deleteCategoryApi, clientData)
      .then(() => {
        dispatch(deleteDataCategory(index, clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteSubcategory(clientData, index) {
  return (dispatch) => {
    requestApi(dispatch, getSupplyProgress, deleteSubcategoryApi, clientData)
      .then(() => {
        dispatch(deleteDataSubcategory(index, clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getSupplies,
  saveSupply,
  deleteSupply,
  getCategoryBySupply,
  saveCategory,
  deleteCategory,
  getSubcategoryByCategory,
  saveSubcategory,
  deleteSubcategory,
  openModal,
  closeModal,
};
