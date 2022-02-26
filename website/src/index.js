// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const ele = document.getElementById('root');

if (ele) {
  ReactDOM.render(
    <App />,
    ele,
  );
}
