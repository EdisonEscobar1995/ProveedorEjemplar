
import setMessage from '../state/Generic/action';

function BlankSpaces(dispatch, value) {
  const pattern = new RegExp(/^\s+$/);
  if (pattern.test(value)) {
    dispatch(setMessage('El nombre no puede contener espacios solamente', 'info'));
    return false;
  }
  return true;
}

export default BlankSpaces;
