// @flow
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Media from 'react-media';

import pkgJson from 'pkgJson';

import {
  Badge,
  Box,
  Button,
  Link,
  Typography,
  useTheme,
} from 'starfall';

import routes from '../routes';

import Star from './Star';

const Home = (): React.Node => {
  const theme = useTheme();

  return (
    <Box
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        color: theme.colors.monoInverse(),
        backgroundColor: theme.colors.monoSecondary(),
      }}
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
          <Badge
            style={{
              position: 'absolute',
              top: '-20%',
              left: '100%',
            }}
          >
            WIP
          </Badge>
          <Media
            queries={{
              small: `(max-width: ${theme.mobileWidth}px)`,
            }}
          >
            {(matches) => (
              <>
                <Star
                  left={12}
                  top={128}
                  lineLength={80}
                />
                <Star
                  left={24 * 2}
                  top={168}
                  lineLength={128}
                />
                <Star
                  left={24 * 4}
                  top={104}
                  lineLength={40}
                />
                {!matches.small && (
                  <Star
                    left={24 * 6}
                    top={132}
                    lineLength={80}
                  />
                )}
                {!matches.small && (
                  <Star
                    left={24 * 7.5}
                    top={204}
                    lineLength={160}
                  />
                )}
                {!matches.small && (
                  <Star
                    left={24 * 10}
                    top={100}
                  />
                )}
                <Star
                  left={-48}
                  top={0}
                />
                {matches.small && (
                  <Star
                    left={142}
                    top={24}
                  />
                )}
                <Star
                  left={0}
                  top={-50}
                />
                <Star
                  left={80}
                  top={-120}
                />
              </>
            )}
          </Media>
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
        style={{
          position: 'absolute',
          bottom: theme.spacing(5),
          left: '50%',
          transform: 'translate(-50%, 0)',
          width: 'auto',
        }}
        to={routes.gettingStarted}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default Home;
