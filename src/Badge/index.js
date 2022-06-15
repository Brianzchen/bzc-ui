// @flow
import * as React from 'react';

import computeColor from '../internal/computeColor';

import Typography, { type TypographyT } from '../Typography';
import styler from '../styler';
import useTheme from '../useTheme';

export type BadgeT = {
  ...TypographyT,
  /**
   * Assign a color directly to the badge border.
   * Accepts theme value `color` or `color(0.5)` as a string
   * or alternatively accepts a hexcode.
   */
  borderColor?: string,
  /**
   * Assign a color directly to the badge background.
   * Accepts theme value `color` or `color(0.5)` as a string
   * or alternatively accepts a hexcode.
   */
  backgroundColor?: string,
  ...
};

/**
 * Used to inform users of the status of an object or an action that has been taken
 */
const Badge: React$AbstractComponent<BadgeT, HTMLElement> = React.forwardRef<BadgeT, HTMLElement>(({
  children = null,
  style = {},
  color,
  borderColor,
  backgroundColor,
  ...otherProps
}: BadgeT, ref) => {
  const theme = useTheme();

  const defaultColor = theme.colors.infoBackground();
  const borderRenderedColor = borderColor ?? backgroundColor;

  const styles = {
    badge: styler(style, theme, {
      display: 'inline',
      color: theme.colors.monoPrimary(),
      backgroundColor: backgroundColor ? computeColor(backgroundColor, theme) : defaultColor,
      border: `${theme.line(1)} solid ${borderRenderedColor ? computeColor(borderRenderedColor, theme) : defaultColor}`,
      padding: `0 ${theme.spacing(2)}px`,
      borderRadius: theme.corner(2),
    }),
  };

  return (
    <Typography
      {...otherProps}
      ref={ref}
      style={styles.badge}
      color={color}
      type="label"
    >
      {children}
    </Typography>
  );
});

Badge.displayName = 'Badge';

export default Badge;
