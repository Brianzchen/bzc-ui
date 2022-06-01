// @flow
import * as React from 'react';

import Box, { type BoxT } from '../Box';
import Notification from '../Notification';
import styler from '../styler';
import useGlobalStyles from '../useGlobalStyles';
import useTheme from '../useTheme';
import type { NotificationVariantT, StyleT } from '../types';

export type AppBarT = {
  ...BoxT,
  /** The text to be applies the notification above the AppBar and also enables it */
  notificationText?: React.Node,
  /** Defines the variant of notification such as error state */
  notificationVariant?: NotificationVariantT,
  /** overrides styling for the notification if also enabled */
  notificationStyle: StyleT,
  onHeightChange?: (newHeight: number) => void,
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
  notificationText,
  notificationVariant = 'note',
  notificationStyle = {},
  onHeightChange,
  ...otherProps
}: AppBarT, ref) => {
  const theme = useTheme();

  const notificationHeight = 36;
  const height = 50 * theme.scale;

  const pushdownHeight = height + (notificationText ? notificationHeight : 0);

  useGlobalStyles({
    body: {
      marginTop: pushdownHeight,
      height: `calc(100% - ${pushdownHeight}px)`,
    },
  }, !!pushdownHeight);

  React.useEffect(() => {
    onHeightChange && onHeightChange(pushdownHeight);
  }, [pushdownHeight]);

  const styles = {
    container: styler(style, theme, {
      position: 'fixed',
      top: notificationText ? notificationHeight : 0,
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
    notification: styler(notificationStyle, theme, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      textAlign: 'center',
    }),
  };

  return (
    <>
      {notificationText && (
        <Notification
          variant={notificationVariant}
          style={styles.notification}
        >
          {notificationText}
        </Notification>
      )}
      <Box
        {...otherProps}
        ref={ref}
        style={styles.container}
      >
        {children}
      </Box>
    </>
  );
});

AppBar.displayName = 'AppBar';

export default AppBar;
