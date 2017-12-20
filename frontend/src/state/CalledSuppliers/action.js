import {
  GET_CALLED_SUPPLIERS_PROGRESS,
  GET_CALLED_SUPPLIERS_SUCCESS,
  SEND_INVITATION_PROGRESS,
  SEND_INVITATION_SUCCESS,
  FILTER_CALLED_SUPPLIERS,
  REQUEST_FAILED,
} from './const';

import { getCalledSuppliersApi, sendInvitationApi, massiveShipmentCallApi } from '../../api/call';
import { requestApi } from '../../utils/action';
import setMessage from '../Generic/action';

const getCalledSuppliersProgress = () => ({
  type: GET_CALLED_SUPPLIERS_PROGRESS,
});

const getCalledSuppliersSuccess = data => ({
  type: GET_CALLED_SUPPLIERS_SUCCESS,
  data,
});

const sendInvitationProgress = () => ({
  type: SEND_INVITATION_PROGRESS,
});

const sendInvitationSuccess = () => ({
  type: SEND_INVITATION_SUCCESS,
});

const filterCalledSuppliers = data => ({
  type: FILTER_CALLED_SUPPLIERS,
  data,
});

const getFailedRequest = () => ({
  type: REQUEST_FAILED,
});

const getCalledSuppliers = id => (dispatch) => {
  requestApi(dispatch, getCalledSuppliersProgress, getCalledSuppliersApi, id)
    .then((response) => {
      response.data.data.suppliers = response.data.data.suppliers
        .sort((a, b) => (a.businessName < b.businessName ? -1 : 1))
        .map(item => ({ ...item, visible: true }));
      const { data } = response.data;
      dispatch(getCalledSuppliersSuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const sendInvitation = supplier => (dispatch) => {
  requestApi(dispatch, sendInvitationProgress, sendInvitationApi, supplier)
    .then(() => {
      dispatch(setMessage('El proveedor ha sido notificado', 'success'));
      dispatch(sendInvitationSuccess());
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const massiveShipmentCall = call => (dispatch) => {
  requestApi(dispatch, sendInvitationProgress, massiveShipmentCallApi, call)
    .then(() => {
      dispatch(setMessage('Se ha notificado a todos los proveedores', 'success'));
      dispatch(sendInvitationSuccess());
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

export {
  getCalledSuppliers,
  sendInvitation,
  massiveShipmentCall,
  filterCalledSuppliers,
};
