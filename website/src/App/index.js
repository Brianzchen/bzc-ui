// @flow
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';

const App = (): React.Node => {
  const [, setMenuOpen] = React.useState(false);

  return (
    <>
      <Header
        onMenuClick={() => {
          setMenuOpen(true);
        }}
      />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
      </Routes>
    </>
  );
};

export default App;
