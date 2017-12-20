import antdEs from 'antd/lib/locale-provider/es_ES';
import appLocaleData from 'react-intl/locale-data/es';
import messages from './messagesES';

window.appLocale.es = {
  messages: {
    ...messages,
  },
  antd: antdEs,
  locale: 'es',
  data: appLocaleData,
};
