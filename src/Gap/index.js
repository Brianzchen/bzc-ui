// @flow
import React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import type { StyleT, ThemeT } from '../types';

import compileSpace from '../internal/compileSpace';

type Props = {
  ...BoxT,
  /** overrides styling for root element */
  style?: StyleT,
  /**
   * height of the gap if placed vertically,
   * can accept px or percentages as a string.
   * Alternatively spacing from the theme engine
   * can be used in the following format,
   * "spacing([space])" as a string
   */
  height?: string | number,
  /**
   * width of the gap if placed horizontally,
   * can accept px or percentages as a string.
   * Alternatively spacing from the theme engine
   * can be used in the following format,
   * "spacing([space])" as a string
   */
  width?: string | number,
  ...
};

/**
 * Renders a spacing element that can be used between two elements, either vertically or horizontally.
 */
const Gap: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  style = {},
  height = 0,
  width = 0,
  ...otherProps
}: Props, ref) => {
  const styles = {
    gap: (theme: ThemeT, styler) => styler(style, theme, {
      display: height ? 'block' : 'inline-block',
      height,
      minHeight: compileSpace(height, theme.spacing),
      width,
      minWidth: compileSpace(width, theme.spacing),
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.gap}
    />
  );
});

Gap.displayName = 'Gap';

export default Gap;
