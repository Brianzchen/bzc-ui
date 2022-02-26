// @flow
import * as React from 'react';

import Typography from '../Typography';

import type { TypographyT } from '../Typography';
import type { StyleT, ThemeT } from '../types';

import compileSpace from '../internal/compileSpace';

import computeColor from '../internal/computeColor';

type Props = {
  ...TypographyT,
  /** child element inside the circle */
  children?: React.Node,
  /** overrides styling for root element */
  style?: StyleT,
  /** pass size of circle */
  size: string | number,
  /** color that will override fill color and outline color  */
  circleColor?: string,
  /** fill color of circle */
  fillColor?: string,
  /** outline color of circle */
  outlineColor?: string,
  /** outline width of the circle */
  outlineWidth?: string | number,
  ...
};

/**
 * An atomic circle component that can contain children
 */
const Circle: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  size,
  circleColor,
  fillColor,
  outlineColor = 'primary',
  outlineWidth = 1,
  ...otherProps
}: Props, ref) => {
  const styles = {
    circle: (theme: ThemeT, styler) => styler(style, theme, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      border: `${compileSpace(outlineWidth, theme.spacing, 'px')} solid ${computeColor(circleColor ?? outlineColor, theme)}`,
      background: computeColor(circleColor ?? fillColor, theme),
      width: compileSpace(size, theme.spacing),
      height: compileSpace(size, theme.spacing),
    }),
  };

  return (
    <Typography
      {...otherProps}
      ref={ref}
      style={styles.circle}
    >
      {children}
    </Typography>
  );
});

Circle.displayName = 'Circle';

export default Circle;
