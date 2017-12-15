import { Modal as messageAnt } from 'antd';

function message({ text = '', type = 'info' }) {
  let label = text;
  let modal = null;
  if (typeof text !== 'string') {
    label = 'Formato no soportado';
  }
  switch (type) {
    case 'success': {
      modal = messageAnt.success(
        {
          title: 'Proveedor Ejemplar',
          content: label,
        });
      break;
    }
    case 'error': {
      modal = messageAnt.error({
        title: 'Proveedor Ejemplar',
        content: label,
      });
      break;
    }
    case 'warning': {
      modal = messageAnt.warning({
        title: 'Proveedor Ejemplar',
        content: label,
      });
      break;
    }
    case 'info':
    default: {
      modal = messageAnt.info({
        title: 'Proveedor Ejemplar',
        content: label,
      });
      break;
    }
  }

  setTimeout(() => modal.destroy(), 5000);
  return null;
}

export default message;
