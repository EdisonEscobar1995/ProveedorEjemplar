import { message as messageAnt } from 'antd';

function message({ text = '', type = 'info' }) {
  let label = text;
  if (typeof text !== 'string') {
    label = 'Formato no soportado';
  }
  switch (type) {
    case 'success': {
      messageAnt.success(label);
      break;
    }
    case 'error': {
      messageAnt
        .config({
          top: 100,
          duration: 2,
        }).error(label);
      break;
    }
    case 'warning': {
      messageAnt.warning(label);
      break;
    }
    case 'info':
    default: {
      messageAnt.info(label);
      break;
    }
  }

  return null;
}

export default message;
