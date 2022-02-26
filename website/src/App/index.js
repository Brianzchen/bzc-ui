// @flow
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import routes from './routes';

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
          path={routes.home}
          element={<Home />}
        />
      </Routes>
    </>
  );
};

export default App;
