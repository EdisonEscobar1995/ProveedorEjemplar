import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from 'styled-components';
import './styles/ant-theme-vars.less';
import store from './state/store';
import Document from './pages/_document';
import theme from './styles/theme';
import './styles/globalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={createBrowserHistory()}>
          <Document />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
