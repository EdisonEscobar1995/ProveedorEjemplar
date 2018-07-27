import { notification } from 'antd';
import LangIntl from '../../utils/translate';

function Notification({ type = 'info', text = '', aditionalInfo = '' }) {
  const translate = LangIntl.getIntl();
  const content = `${translate.formatMessage({ id: text })} ${aditionalInfo}`;
  let not = null;
  const title = translate.formatMessage({ id: 'Message.title' });
  const config = {
    title,
    content,
  };

  switch (type) {
    case 'success': {
      not = notification.success(config);
      break;
    }
    case 'error': {
      not = notification.error(config);
      break;
    }
    case 'warning': {
      not = notification.warning(config);
      break;
    }
    case 'info':
    default: {
      not = notification.info(config);
      break;
    }
  }

  setTimeout(() => not.destroy(), 5000);
  return null;
}

export default Notification;
