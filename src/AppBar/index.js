// @flow
import * as React from 'react';

import Box, { type BoxT } from '../Box';
import styler from '../styler';
import useGlobalStyles from '../useGlobalStyles';
import useTheme from '../useTheme';

export type AppBarT = {
  ...BoxT,
  ...
};

/**
 * A layout component rendering a header at the top of the page.
 * You should aim to place this at the top of your page layout to avoid
 * unexpected behaviors though this component will render if there regardless.
 */
const AppBar: React$AbstractComponent<AppBarT, HTMLElement> = React.forwardRef<AppBarT, HTMLElement>(({
  children = null,
  style = {},
  ...otherProps
}: AppBarT, ref) => {
  const theme = useTheme();

  const height = 50 * theme.scale;

  useGlobalStyles({
    body: {
      marginTop: height,
      height: `calc(100% - ${height}px)`,
    },
  });

  const styles = {
    container: styler(style, theme, {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: theme.elevations.sheet,
      height,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      color: theme.colors.monoInverse(),
      padding: theme.spacing(2),
      backgroundColor: theme.colors.primary(),
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      {children}
    </Box>
  );
});

AppBar.displayName = 'AppBar';

export default AppBar;
