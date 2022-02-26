// @flow
import React from 'react';

import computeColor from '../internal/computeColor';

import Box from '../Box';
import type { BoxT } from '../Box';
import compileSpace from '../internal/compileSpace';
import type { StyleT, ThemeT } from '../types';

type Props = {
  ...BoxT,
  /** overrides styling for root element */
  style?: StyleT,
  /**
   * override the color of the divider.
   * Accepts theme value `color` or `color(0.5)` as a string
   * or alternatively accepts a hexcode
   */
  color?: string,
  /**
   * add top margin which
   * can accept px or percentages as a string.
   * Alternatively spacing from the theme engine
   * can be used in the following format,
   * "spacing([space])" as a string
  */
  top?: number | string,
  /**
   * add right margin which
   * can accept px or percentages as a string.
   * Alternatively spacing from the theme engine
   * can be used in the following format,
   * "spacing([space])" as a string
  */
  right?: number | string,
  /**
   * add bottom margin which
   * can accept px or percentages as a string.
   * Alternatively spacing from the theme engine
   * can be used in the following format,
   * "spacing([space])" as a string
  */
  bottom?: number | string,
  /**
   * add left margin which
   * can accept px or percentages as a string.
   * Alternatively spacing from the theme engine
   * can be used in the following format,
   * "spacing([space])" as a string
  */
  left?: number | string,
  ...
};

const Divider: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  style = {},
  color = 'boundary',
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  ...otherProps
}: Props, ref) => {
  const styles = {
    divider: (theme: ThemeT, styler) => styler(style, theme, {
      borderBottom: `${theme.line(1)} solid ${computeColor(color, theme)}`,
      margin: `${compileSpace(top, theme.spacing, 'px')} ${compileSpace(right, theme.spacing, 'px')} ${compileSpace(bottom, theme.spacing, 'px')} ${compileSpace(left, theme.spacing, 'px')}`,
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.divider}
    />
  );
});

Divider.displayName = 'Divider';

export default Divider;
