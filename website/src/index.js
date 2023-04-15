// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'bzc-ui';

import App from './App';

const ele = document.getElementById('root');

if (ele) {
  ReactDOM.render(
    <BrowserRouter>
      <Provider
        iconBase="mdi"
        iconPrefix="mdi"
      >
        <App />
      </Provider>
    </BrowserRouter>,
    ele,
  );
}
