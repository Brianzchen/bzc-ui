// @flow
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'bzc-ui';

import App from './App';

const ele = document.getElementById('root');

if (ele) {
  const root = createRoot(ele);
  root.render(
    <BrowserRouter>
      <Provider
        iconBase="mdi"
        iconPrefix="mdi"
      >
        <App />
      </Provider>
    </BrowserRouter>,
  );
}
