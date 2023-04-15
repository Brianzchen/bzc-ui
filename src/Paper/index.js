// @flow
import * as React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import type { ThemeT, StylerT } from '../types';

export type PaperT = {
  ...BoxT,
  /** changes the depth corresponding to shadows from theme */
  elevation?: 'modal' | 'dropdown' | 'card',
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
    paper: (theme: ThemeT, styler: StylerT) => styler(style, theme, {
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
