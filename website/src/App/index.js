// @flow
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Box, useTheme } from 'starfall';

import Header from './Header';
import Home from './Home';
import SidePanel from './SidePanel';
import routes from './routes';

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
        </Routes>
      </Box>
    </>
  );
};

export default App;
