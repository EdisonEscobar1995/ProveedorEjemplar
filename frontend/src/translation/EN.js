import antdEn from 'antd/lib/locale-provider/en_US';
import appLocaleData from 'react-intl/locale-data/en';
import messages from './messagesEN';

window.appLocale.en = {
  messages: {
    ...messages,
  },
  antd: antdEn,
  locale: 'en',
  data: appLocaleData,
};
