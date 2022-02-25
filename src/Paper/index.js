// @flow
import * as React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import type { StyleT } from '../types';

export type PaperT = {
  ...BoxT,
  /** child element inside the component */
  children?: React.Node,
  /** overrides styling for root element */
  style?: StyleT,
  /** changes the depth corresponding to shadows from theme */
  elevation?: 'modal' | 'dropdown' | 'card',
  /** assign a color directly to the component's styling.
   * Accepts theme value `color` or `color(0.5)` as a string
   * or alternatively accepts a hexcode
   */
  color?: string,
  ...
};

/**
 * An atomic component that defines a consistent level of elevation.
 */
const Paper: React$AbstractComponent<PaperT, HTMLElement> = React.forwardRef<PaperT, HTMLElement>(({
  children = null,
  style = {},
  elevation = 'card',
  color = 'inform',
  ...otherProps
}: PaperT, ref) => {
  const styles = {
    paper: (theme, styler) => styler(style, theme, {
      boxShadow: theme.shadows[elevation],
      backgroundColor: theme.colors.monoInverse(),
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      color={color}
      style={styles.paper}
    >
      {children}
    </Box>
  );
});

Paper.displayName = 'Paper';

export default Paper;
