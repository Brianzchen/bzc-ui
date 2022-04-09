// @flow
import * as React from 'react';
import Media from 'react-media';

import { Box, Drawer, useTheme } from 'startown';

import Content from './Content';

type Props = {|
  open: boolean,
  onClose: () => void,
|};

const SidePanel = ({
  open,
  onClose,
}: Props): React.Node => {
  const theme = useTheme();

  const offset = 50;

  return (
    <Media
      queries={{
        small: `(max-width: ${theme.mobileWidth}px)`,
      }}
    >
      {(matches) => {
        if (matches.small) {
          return (
            <Drawer
              open={open}
              offsetTop={offset}
              onClose={onClose}
              exclusions={[document.getElementById('menu-button')]}
            >
              <Content onClose={onClose} />
            </Drawer>
          );
        }
        if (!open) return null;

        return (
          <Box
            style={{
              minWidth: '300px',
              height: '100%',
            }}
          >
            <Box
              style={{
                position: 'fixed',
                top: offset,
                bottom: 0,
                minWidth: '300px',
                overflow: 'auto',
                borderRight: `${theme.line(1)} solid ${theme.colors.monoMid()}`,
              }}
            >
              <Content />
            </Box>
          </Box>
        );
      }}
    </Media>
  );
};

export default SidePanel;
