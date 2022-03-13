// @flow
import * as React from 'react';

import computeColor from '../internal/computeColor';

import Typography, { type TypographyT } from '../Typography';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

type Props = {
  ...TypographyT,
  /** child element inside the badge */
  children?: React.Node,
  /** overrides styling for root element */
  style?: StyleT,
  /**
   * Badges can be rendered in two ways depending on what it's used for
   * and what you plan to put it in. Label is standard and default but numbered
   * values have their own rendition
   */
  variant?: 'label' | 'number',
  /**
   * Assign a color directly to the badge text.
   * Accepts theme value `color` or `color(0.5)` as a string
   * or alternatively accepts a hexcode.
   */
  color?: string,
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
const Badge: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  variant = 'label',
  color,
  borderColor,
  backgroundColor,
  ...otherProps
}: Props, ref) => {
  const theme = useTheme();

  const defaultColor = theme.colors.infoBackground();
  const borderRenderedColor = borderColor ?? backgroundColor;

  const styles = {
    badge: styler(style, theme, {
      display: 'inline',
      color: theme.colors.monoPrimary(),
      backgroundColor: backgroundColor ? computeColor(backgroundColor, theme) : defaultColor,
      border: `${theme.line(1)} solid ${borderRenderedColor ? computeColor(borderRenderedColor, theme) : defaultColor}`,
      ...variant === 'label'
        ? {
          padding: `0 ${theme.spacing(1)}px`,
          borderRadius: theme.corner(1),
        }
        : {
          padding: `${theme.scale / 2}px ${theme.spacing(1)}px`,
          borderRadius: `${10 * theme.scale}px`,
        },
    }),
  };

  return (
    <Typography
      {...otherProps}
      ref={ref}
      style={styles.badge}
      color={color}
      type={variant === 'label' ? 'metadata' : 'description'}
    >
      {children}
    </Typography>
  );
});

Badge.displayName = 'Badge';

export default Badge;
