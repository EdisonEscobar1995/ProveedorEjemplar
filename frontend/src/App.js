import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from 'styled-components';
import { LocaleProvider } from 'antd';
import esEs from 'antd/lib/locale-provider/es_ES';
import './styles/ant-theme-vars.less';
import store from './state/store';
import Document from './pages/_document';
import theme from './styles/theme';
import './styles/globalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocaleProvider locale={esEs}>
        <Provider store={store}>
          <Router history={createBrowserHistory()}>
            <Document />
          </Router>
        </Provider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
