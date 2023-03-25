// @flow
import * as React from 'react';

import Box from '../../Box';
import type { StyleT, StylerT, ThemeT } from '../../types';

import CloseButton from './CloseButton';
import Title from './Title';

type Props = {|
  children: React.Node,
  height: number,
  compTestId: (string) => string,
  onClose?: (...args: Array<any>) => any,
  style: StyleT,
|};

const Header = ({
  children,
  height,
  compTestId,
  onClose,
  style,
}: Props): React.Node => {
  const styles = {
    container: (theme: ThemeT, styler: StylerT) => styler(style, theme, {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      height: `${height}px`,
      color: theme.colors.monoPrimary(),
      fontSize: theme.fonts.heading1.px,
      fontWeight: theme.fonts.heading1.style,
      lineHeight: theme.fonts.heading1.leading,
      textAlign: 'center',
      padding: `${theme.spacing(7)}px ${theme.spacing(5) + theme.spacing(3)}px ${theme.spacing(3)}px`,
    }),
  };

  return (
    <Box
      style={styles.container}
    >
      <Title compTestId={compTestId}>
        {children}
      </Title>
      {
        onClose
        && (
          <CloseButton
            compTestId={compTestId}
            onClose={onClose}
          />
        )
      }
    </Box>
  );
};

export default Header;
