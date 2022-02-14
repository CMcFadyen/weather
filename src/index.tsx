import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import Weather from './Weather';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Weather/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
