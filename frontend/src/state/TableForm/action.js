import {
  ADD_DATA,
  SAVE_DATA,
  DELETE_DATA,
  EDIT_DATA,
  CANCEL_DATA,
} from './const';

function addData(newItem) {
  return {
    type: ADD_DATA,
    newItem,
  };
}
function editData(index) {
  return {
    type: EDIT_DATA,
    index,
  };
}
function saveData(data, index) {
  return {
    type: SAVE_DATA,
    data,
    index,
  };
}
function deleteData(index) {
  return {
    type: DELETE_DATA,
    index,
  };
}
function cancelData(index) {
  return {
    type: CANCEL_DATA,
    index,
  };
}

export {
  addData,
  saveData,
  editData,
  deleteData,
  cancelData,
};
