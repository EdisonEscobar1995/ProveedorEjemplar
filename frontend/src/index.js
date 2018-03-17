import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import supportedBrowser from './utils/detectBrowser';

let Component = App;

if (!supportedBrowser) {
  Component = () => (
    <section style={{ margin: 20 }}>
      <h2>Su navegador no es apto para acceder a esta página</h2>
    </section>
  );
}

ReactDOM.render(<Component />, document.getElementById('root'));
