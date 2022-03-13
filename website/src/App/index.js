// @flow
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Box, useTheme } from 'starfall';

import { routes } from 'utils';

import ComponentApi from './ComponentApi';
import Header from './Header';
import Home from './Home';
import Pages from './Pages';
import SidePanel from './SidePanel';

const App = (): React.Node => {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(window.innerWidth > theme.mobileWidth);

  return (
    <>
      <Header
        onMenuClick={() => {
          setMenuOpen((pOpen) => !pOpen);
        }}
      />
      <Box
        style={{
          height: '100%',
          display: 'flex',
        }}
      >
        <SidePanel
          open={menuOpen}
          onClose={() => {
            setMenuOpen(false);
          }}
        />
        <Routes>
          <Route
            path={routes.home}
            element={<Home />}
          />
          <Route
            path={routes.componentApi}
            element={<ComponentApi />}
          />
          <Route
            path={routes.page}
            element={<Pages />}
          />
        </Routes>
      </Box>
    </>
  );
};

export default App;
