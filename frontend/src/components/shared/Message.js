import { Modal } from 'antd';
import FormattedMessage from './FormattedMessage';

function message({ type = 'info', text = '', aditionalInfo = '' }) {
  const content = `${text} ${aditionalInfo}`;
  let modal = null;
  const title = 'Message.title';
  const config = {
    title,
    content,
  };
  console.log(FormattedMessage);
  switch (type) {
    case 'success': {
      modal = Modal.success(config);
      break;
    }
    case 'error': {
      modal = Modal.error(config);
      break;
    }
    case 'warning': {
      modal = Modal.warning(config);
      break;
    }
    case 'info':
    default: {
      modal = Modal.info(config);
      break;
    }
  }

  setTimeout(() => modal.destroy(), 5000);
  return null;
}

export default message;
