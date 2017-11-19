import axios from 'axios';
import {
  GET_DATA_SUPPLIER_PROGRESS,
  GET_DATA_SUPPLIER_SUCCESS,
  GET_DATA_SUPPLIER_FAILED,
} from './const';
import getDataSuppliertApi from '../../api/supplier';
import getDataCategorytApi from '../../api/category';
import getDataCompanyTypetApi from '../../api/companyType';
import getDataSocietyTypetApi from '../../api/societyType';


function getDataSupplierProgress() {
  return {
    type: GET_DATA_SUPPLIER_PROGRESS,
  };
}

function getDataSupplierSuccess(supplier, categories, companyTypes, societyTypes) {
  return {
    type: GET_DATA_SUPPLIER_SUCCESS,
    supplier,
    categories,
    companyTypes,
    societyTypes,
  };
}

function getDataSupplierFailed(error) {
  return {
    type: GET_DATA_SUPPLIER_FAILED,
    error,
  };
}
function validateResponse(args) {
  const errorMessage = 'Fallo en la respuesta';
  try {
    args.forEach((element) => {
      if (!element.data.status) {
        throw new Error(errorMessage);
      }
    });
  } catch (err) {
    throw new Error(errorMessage);
  }
}

function getDataSupplier() {
  return (dispatch) => {
    dispatch(getDataSupplierProgress());
    const promises = [
      getDataSuppliertApi(),
      getDataCategorytApi(),
      getDataCompanyTypetApi(),
      getDataSocietyTypetApi(),
    ];
    axios.all(promises).then((arrayResponse) => {
      validateResponse(arrayResponse);
      const supplier = arrayResponse[0].data.data;
      const categories = arrayResponse[1].data.data;
      const companyTypes = arrayResponse[2].data.data;
      const societyTypes = arrayResponse[3].data.data;
      dispatch(getDataSupplierSuccess(supplier, categories, companyTypes, societyTypes));
    }).catch((err) => {
      dispatch(getDataSupplierFailed(err));
    });
  };
}

export {
  getDataSupplier as default,
};
