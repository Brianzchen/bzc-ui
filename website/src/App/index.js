// @flow
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Box, useTheme } from 'startown';

import { routes, AppBarNotificationContext, type AppBarNotificationT } from 'utils';

import ComponentApi from './ComponentApi';
import Header from './Header';
import Home from './Home';
import Pages from './Pages';
import SidePanel from './SidePanel';

const App = (): React.Node => {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(window.innerWidth > theme.mobileWidth);
  const [appBarMessage, setAppBarMessage] = React.useState<AppBarNotificationT>();
  const [appBarHeight, setAppBarHeight] = React.useState(0);

  const appBarValue = React.useMemo(() => ({
    value: appBarMessage,
    setValue: setAppBarMessage,
  }), [appBarMessage]);

  return (
    <AppBarNotificationContext.Provider
      value={appBarValue}
    >
      <Header
        onMenuClick={() => {
          setMenuOpen((pOpen) => !pOpen);
        }}
        setAppBarHeight={setAppBarHeight}
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
          appBarHeight={appBarHeight}
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
    </AppBarNotificationContext.Provider>
  );
};

export default App;
