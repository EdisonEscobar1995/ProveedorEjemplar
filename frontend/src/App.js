import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import { ThemeProvider } from 'styled-components';
import { LocaleProvider } from 'antd';
import { addLocaleData, IntlProvider } from 'react-intl';
import './styles/ant-theme-vars.less';
import store from './state/store';
import Document from './pages/_document';
import theme from './styles/theme';
import './styles/globalStyles';
import { activeLanguage, noActiveLanguage } from './translation/';

const appLocale = window.appLocale[activeLanguage];
addLocaleData(appLocale.data);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
          <Provider store={store}>
            <Router history={createHashHistory()}>
              <Document noActiveLanguage={noActiveLanguage} />
            </Router>
          </Provider>
        </IntlProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
