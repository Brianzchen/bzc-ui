// @flow
import * as React from 'react';
import Media from 'react-media';

import { Box, Drawer, useTheme } from 'starfall';

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
              offsetTop={50}
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
              overflow: 'auto',
              borderRight: `${theme.line(1)} solid ${theme.colors.monoMid()}`,
            }}
          >
            <Content />
          </Box>
        );
      }}
    </Media>
  );
};

export default SidePanel;
