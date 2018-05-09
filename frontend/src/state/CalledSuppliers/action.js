import {
  GET_CALLED_SUPPLIERS_PROGRESS,
  GET_CALLED_SUPPLIERS_SUCCESS,
  SEND_INVITATION_PROGRESS,
  SEND_INVITATION_SUCCESS,
  FILTER_CALLED_SUPPLIERS,
  CLEAR_DATA_CALLED_SUPPLIERS,
  DELETE_SUPPLIER_BY_CALL,
  GET_SUPPLIERS_BY_KEY_PROGRESS,
  GET_SUPPLIERS_BY_KEY_SUCCESS,
  AUTOCOMPLETE_SUPPLIER,
  ADD_SUPPLIER,
  UPDATE_SUPPLIER,
  EDIT_SUPPLIER,
  REQUEST_FAILED,
} from './const';

import { getCalledSuppliersApi, sendInvitationApi, massiveShipmentCallApi, saveSuppliersToCallApi } from '../../api/call';
import { deleteDataCallBySupplierApi, getSuppliersByKeyApi } from '../../api/supplier';
import { requestApi } from '../../utils/action';
import { openModal, closeModal } from '../Main/action';
import exportLog from '../../components/Call/exportLog';
import setMessage from '../Generic/action';

const getCalledSuppliersProgress = () => ({
  type: GET_CALLED_SUPPLIERS_PROGRESS,
});

const getCalledSuppliersSuccess = data => ({
  type: GET_CALLED_SUPPLIERS_SUCCESS,
  data,
});

const autoCompleteDataSuccess = data => ({
  type: AUTOCOMPLETE_SUPPLIER,
  data,
});

const deleteSupplierByCallSuccess = () => ({
  type: DELETE_SUPPLIER_BY_CALL,
});

const editSupplier = () => ({
  type: EDIT_SUPPLIER,
});

const sendInvitationProgress = () => ({
  type: SEND_INVITATION_PROGRESS,
});

const getSuppliersBykeyProgress = () => ({
  type: GET_SUPPLIERS_BY_KEY_PROGRESS,
});

const saveDataSuppliers = (id, data) => ({
  type: id ? UPDATE_SUPPLIER : ADD_SUPPLIER,
  data,
});

const getSuppliersByKeySuccess = data => ({
  type: GET_SUPPLIERS_BY_KEY_SUCCESS,
  data,
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

const clearDataCalledSuppliers = () => ({
  type: CLEAR_DATA_CALLED_SUPPLIERS,
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

const deleteSupplierByCall = (id, idCall, editUse = true) => (dispatch) => {
  requestApi(dispatch, getCalledSuppliersProgress, deleteDataCallBySupplierApi, id)
    .then(() => {
      dispatch(deleteSupplierByCallSuccess());
      if (editUse) {
        dispatch(setMessage('El proveedor ha sido eliminado', 'success'));
        dispatch(getCalledSuppliers(idCall));
      }
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

const getMessagesAction = (data, dispatch, next) => {
  if (Array.isArray(data)) {
    switch (data[0].status) {
      case 'DONT_EXIST_IN_DIRECTORY':
        dispatch(setMessage('El proveedor no existe en el directorio', 'info'));
        break;
      case 'SURVEY_DOES_NOT_EXIST':
        dispatch(setMessage('No existe una encuesta para el proveedor', 'info'));
        break;
      case 'DUPLICATED':
        dispatch(setMessage('El proveedor ya existe para esta convocatoría', 'info'));
        break;
      default:
        if (next) {
          next();
        }
        break;
    }
  }
};

const getSuppliersByKey = value => (dispatch) => {
  requestApi(dispatch, getSuppliersBykeyProgress, getSuppliersByKeyApi, value)
    .then((response) => {
      const data = response.data.data.map(element => ({
        ...element,
        id: element.sapCode,
        name: element.sapCode,
      }));
      dispatch(getSuppliersByKeySuccess(data));
    }).catch(() => {
      dispatch(getFailedRequest());
    });
};

const autoComplete = sapCode => (dispatch, getState) => {
  const master = getState().calledSuppliers.masters;
  const infoSupplier = master.find(supplier => supplier.sapCode === sapCode);
  dispatch(autoCompleteDataSuccess(infoSupplier));
};

const saveSuppliers =
  (clientData, remoteId, edit = false, excel = false, idCall, next) => (dispatch, getState) => {
    const calledSuppliers = getState().calledSuppliers.data;
    const callCopy = getState().call.editData;
    const call = Object.assign({}, callCopy);
    call.supplier = [];
    delete call.disabled;
    delete call.disabledByDate;
    const { suppliers, suppliersByCall, masters } = calledSuppliers;

    // Se obtienen los nombres del tam compañia, suministro y país cuando no hay carga de excel.
    if (!excel) {
      const nameCompanySize =
      masters.CompanySize.find(company => company.id === clientData.nameCompanySizeToLoad).name;
      const nameSupply = masters.Supply.find(sup => sup.id === clientData.nameSupplyToLoad).name;
      const nameCountry = masters.Country.find(c => c.id === clientData.nameCountryToLoad).name;

      clientData.nameCompanySizeToLoad = nameCompanySize;
      clientData.nameSupplyToLoad = nameSupply;
      clientData.nameCountryToLoad = nameCountry;
      dispatch(closeModal());
    }
    if (Array.isArray(clientData)) {
      call.supplier = [...clientData];
    } else if (edit) {
      const idSupplierByCall = suppliersByCall.find(x => x.idSupplier === clientData.id).id;
      const supplier = suppliers.find(sup => sup.id === clientData.id);
      if (remoteId) {
        dispatch(deleteSupplierByCall(idSupplierByCall, '', false));
      }
      const objSupplier = {
        ...supplier,
        ...clientData,
      };
      delete objSupplier.visible;
      call.supplier.push(objSupplier);
    } else {
      call.supplier.push(clientData);
    }
    requestApi(dispatch, getCalledSuppliersProgress, saveSuppliersToCallApi, call)
      .then((response) => {
        const { data } = response.data;
        dispatch(saveDataSuppliers(clientData.id, data));
        dispatch(getCalledSuppliers(idCall));
        if (!excel) {
          getMessagesAction(data, dispatch, next);
          return;
        }
        let errorsCount = 0;
        data.forEach((element) => {
          if (element.status !== 'CREATED') {
            errorsCount += 1;
          }
        });
        if (errorsCount === 0 && next) {
          next();
        } else {
          exportLog(data);
        }
      }).catch(() => {
        dispatch(getFailedRequest());
      });
  };

export {
  getCalledSuppliers,
  sendInvitation,
  massiveShipmentCall,
  filterCalledSuppliers,
  clearDataCalledSuppliers,
  deleteSupplierByCall,
  openModal,
  closeModal,
  getSuppliersByKey,
  editSupplier,
  saveSuppliers,
  autoComplete,
};
