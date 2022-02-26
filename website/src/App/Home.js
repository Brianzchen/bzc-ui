// @flow
import * as React from 'react';

import pkgJson from 'pkgJson';

import { Box, Link, Typography } from 'starfall';

const Home = (): React.Node => (
  <Box
    style={(theme) => ({
      position: 'relative',
      height: '100%',
      width: '100%',
      color: theme.colors.monoInverse(),
      backgroundColor: theme.colors.monoSecondary(),
    })}
  >
    <Typography
      type="displayTitle1"
      style={{
        fontFamily: '\'Comfortaa\', cursive',
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      starfall
    </Typography>
    <Link
      href={`${pkgJson.repository.substring(0, pkgJson.repository.indexOf('.git'))}/releases/tag/v${pkgJson.version}`}
      newTab
      variant="underline"
      style={(theme) => ({
        position: 'absolute',
        bottom: theme.spacing(3),
        left: '50%',
        transform: 'translate(-50%, 0)',
      })}
    >
      {`v${pkgJson.version}`}
    </Link>
  </Box>
);

export default Home;
