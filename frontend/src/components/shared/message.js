import { Modal } from 'antd';
import LangIntl from '../../utils/translate';

function message({ type = 'info', text = '', aditionalInfo = '' }) {
  const translate = LangIntl.getIntl();
  const content = `${translate.formatMessage({ id: text })} ${aditionalInfo}`;
  let modal = null;
  const title = translate.formatMessage({ id: 'Message.title' });
  const config = {
    title,
    content,
  };

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
