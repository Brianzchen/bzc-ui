// @flow
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import pkgJson from 'pkgJson';

import {
  Box,
  Button,
  Link,
  Typography,
} from 'starfall';

import routes from './routes';

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
    <Box
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}
    >
      <Typography
        type="displayTitle1"
        style={{
          fontFamily: '\'Comfortaa\', cursive',
        }}
      >
        starfall
      </Typography>
      <Link
        href={`${pkgJson.repository.substring(0, pkgJson.repository.indexOf('.git'))}/releases/tag/v${pkgJson.version}`}
        newTab
        variant="underline"
      >
        {`v${pkgJson.version}`}
      </Link>
    </Box>
    <Button
      as={RouterLink}
      style={(theme) => ({
        position: 'absolute',
        bottom: theme.spacing(5),
        left: '50%',
        transform: 'translate(-50%, 0)',
        width: 'auto',
      })}
      to={routes.gettingStarted}
    >
      Get Started
    </Button>
  </Box>
);

export default Home;
