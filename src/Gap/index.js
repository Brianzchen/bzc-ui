// @flow
import React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import type { ThemeT, StylerT } from '../types';

import compileSpace from '../internal/compileSpace';

export type GapT = {
  ...BoxT,
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
const Gap: React$AbstractComponent<GapT, HTMLElement> = React.forwardRef<GapT, HTMLElement>(({
  style = {},
  height = 0,
  width = 0,
  ...otherProps
}: GapT, ref) => {
  const styles = {
    gap: (theme: ThemeT, styler: StylerT) => styler(style, theme, {
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
