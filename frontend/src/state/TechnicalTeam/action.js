import {
  GET_TECHNICAL_TEAM_PROGRESS,
  GET_TECHNICAL_TEAM_SUCCESS,
  REQUEST_FAILED,
  ADD_TECHNICAL_TEAM,
  SAVE_TECHNICAL_TEAM,
  DELETE_TECHNICAL_TEAM,
  GET_CATEGORIES_SUCCESS,
} from './const';
import { getTechnicalTeamApi, saveTechnicalTeamApi, deleteTechnicalTeamApi } from '../../api/technicalTeam';
import getMasterApi from '../../api/master';
import { openModal, closeModal, loadingModal } from '../Main/action';
import { requestApi, sortByField } from '../../utils/action';
import { getCategoryBySupplyApi } from '../../api/category';

function getTechnicalTeamProgress() {
  return {
    type: GET_TECHNICAL_TEAM_PROGRESS,
  };
}

function getTechnicalTeamSuccess(data, masters) {
  return {
    type: GET_TECHNICAL_TEAM_SUCCESS,
    data,
    masters,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataTechnicalTeam(data, index, id) {
  return {
    type: id ? SAVE_TECHNICAL_TEAM : ADD_TECHNICAL_TEAM,
    data,
    index,
  };
}

function deleteDataTechnicalTeam(index) {
  return {
    type: DELETE_TECHNICAL_TEAM,
    index,
  };
}

function getCategoriesBySupplySuccess(categories) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    categories,
  };
}

function getTechnicalTeam() {
  return (dispatch) => {
    requestApi(dispatch, getTechnicalTeamProgress, getMasterApi, [
      'Supply',
      'Category',
      'Country',
      'User',
      'Rol',
    ])
      .then((masterResponse) => {
        requestApi(dispatch, getTechnicalTeamProgress, getTechnicalTeamApi)
          .then((response) => {
            const { data } = response.data;
            const masters = masterResponse.data.data;
            masters.User = masters.User.filter((user) => {
              const roles = user.idRols.map(id =>
                masters.Rol.find(item => item.id === id).shortName);
              return roles.indexOf('TECHNICAL_TEAM') >= 0;
            });
            dispatch(getTechnicalTeamSuccess(data, masters));
          }).catch(() => {
            dispatch(getFailedRequest());
          });
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

const getCategoryBySupply = idSupply => (
  (dispatch) => {
    dispatch(loadingModal(true));
    requestApi(dispatch, getTechnicalTeamProgress, getCategoryBySupplyApi, idSupply)
      .then((response) => {
        const categories = sortByField(response.data.data, 'name');
        dispatch(loadingModal(false));
        dispatch(getCategoriesBySupplySuccess(categories));
      }).catch((err) => {
        dispatch(getFailedRequest(err));
      });
  }
);

function saveTechnicalTeam(clientData, index) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getTechnicalTeamProgress, saveTechnicalTeamApi, clientData)
      .then((response) => {
        const { data } = response.data;
        dispatch(saveDataTechnicalTeam(data, index, clientData.id));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteTechnicalTeam(clientData, index) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getTechnicalTeamProgress, deleteTechnicalTeamApi, clientData)
      .then(() => {
        dispatch(deleteDataTechnicalTeam(index));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getTechnicalTeam,
  saveTechnicalTeam,
  deleteTechnicalTeam,
  getCategoryBySupply,
  openModal,
  closeModal,
};
