// @flow
import * as React from 'react';

import Typography, { type TypographyT } from '../Typography';
import styler from '../styler';
import useTheme from '../useTheme';
import type { NotificationT, StyleT } from '../types';

import CloseButton from './CloseButton';
import useComponentTestId from '../internal/hooks/useComponentTestId';

type Props = {
  ...TypographyT,
  /** render inside the notification box */
  children?: React.Node,
  /** overrides styling for root element */
  style?: StyleT,
  /** defines the colors of the notification */
  variant?: NotificationT,
  /**
   * If you want to render a close button on the edge of the Notification
   */
  onClose?: (event: SyntheticEvent<HTMLButtonElement>) => void,
  ...
};

const Notification: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  variant = 'note',
  onClose,
  ...otherProps
}: Props, ref) => {
  const theme = useTheme();
  const compTestId = useComponentTestId('Notification');

  const colors = (() => {
    switch (variant) {
      case 'success':
        return {
          color: theme.colors.monoPrimary(),
          backgroundColor: theme.colors.successBackground(),
        };
      case 'note':
        return {
          color: theme.colors.monoPrimary(),
          backgroundColor: theme.colors.infoBackground(),
        };
      case 'warning':
        return {
          color: theme.colors.monoPrimary(),
          backgroundColor: theme.colors.warningBackground(),
        };
      case 'error':
        return {
          color: theme.colors.monoPrimary(),
          backgroundColor: theme.colors.errorBackground(),
        };
      default:
        return {};
    }
  })();

  const styles = {
    container: styler(style, theme, {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(onClose ? 6 : 4)}px ${theme.spacing(2)}px ${theme.spacing(4)}px`,
      wordBreak: 'break-word',
      ...colors,
    }),
  };

  return (
    <Typography
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      {children}
      {onClose && (
        <CloseButton
          compTestId={compTestId}
          onClose={onClose}
          color={colors.color}
        />
      )}
    </Typography>
  );
});

Notification.displayName = 'Notification';

export default Notification;
