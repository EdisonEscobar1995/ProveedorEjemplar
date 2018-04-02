import {
  GET_MANAGER_TEAM_PROGRESS,
  GET_MANAGER_TEAM_SUCCESS,
  REQUEST_FAILED,
  ADD_MANAGER_TEAM,
  UPDATE_MANAGER_TEAM,
  DELETE_MANAGER_TEAM,
  SEARCH_MANAGER_TEAM,
  CHANGE_SEARCH_MANAGER_TEAM,
} from './const';

import { getManagerTeamApi, saveManagerTeamApi, deleteManagerTeamApi } from '../../api/managerTeam';
import getMasterApi from '../../api/master';
import { openModal, closeModal } from '../Main/action';
import { requestApi } from '../../utils/action';

function getManagerTeamProgress() {
  return {
    type: GET_MANAGER_TEAM_PROGRESS,
  };
}

function getManagerTeamSuccess(data, masters) {
  return {
    type: GET_MANAGER_TEAM_SUCCESS,
    data,
    masters,
  };
}

function getFailedRequest() {
  return {
    type: REQUEST_FAILED,
  };
}

function saveDataManagerTeam(id, data, remoteId) {
  return {
    type: id ? UPDATE_MANAGER_TEAM : ADD_MANAGER_TEAM,
    data,
    remoteId,
  };
}

function deleteDataManagerTeam(data) {
  return {
    type: DELETE_MANAGER_TEAM,
    data,
  };
}

function searchManagerTeam(value) {
  return {
    type: SEARCH_MANAGER_TEAM,
    value,
  };
}

function changeSearchManagerTeam(value) {
  return {
    type: CHANGE_SEARCH_MANAGER_TEAM,
    value,
  };
}

function getManagerTeam() {
  return (dispatch) => {
    requestApi(dispatch, getManagerTeamProgress, getMasterApi, [
      'Call',
      'User',
      'Rol',
    ])
      .then((masterResponse) => {
        requestApi(dispatch, getManagerTeamProgress, getManagerTeamApi)
          .then((response) => {
            const data = response.data.data.map(element => ({
              ...element,
              visible: true,
            }));
            const masters = masterResponse.data.data;
            masters.Call = masters.Call.map(element => ({
              ...element,
              name: element.year,
            }));
            masters.User = masters.User.filter((user) => {
              const roles = user.idRols.map(id =>
                masters.Rol.find(item => item.id === id).shortName);
              return roles.indexOf('MANAGER_TEAM') >= 0;
            });
            dispatch(getManagerTeamSuccess(data, masters));
          }).catch(() => {
            dispatch(getFailedRequest());
          });
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function saveManagerTeam(clientData, remoteId, next) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getManagerTeamProgress, saveManagerTeamApi, clientData)
      .then((response) => {
        const { data } = response.data;
        data.visible = true;
        dispatch(saveDataManagerTeam(clientData.id, data, remoteId));
        if (next) {
          next();
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

function deleteManagerTeam(clientData) {
  return (dispatch) => {
    dispatch(closeModal());
    requestApi(dispatch, getManagerTeamProgress, deleteManagerTeamApi, clientData)
      .then(() => {
        dispatch(deleteDataManagerTeam(clientData));
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };
}

export {
  getManagerTeam,
  saveManagerTeam,
  deleteManagerTeam,
  searchManagerTeam,
  changeSearchManagerTeam,
  openModal,
  closeModal,
};

