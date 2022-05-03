// @flow
import React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import type { StyleT, StylerT, ThemeT } from '../types';

export type StepBarT = {
  ...BoxT,
  /** the currently active step */
  curr?: number,
  /** the total number of steps */
  steps?: number,
  /** overrides the styling for the fill bar */
  barStyle?: StyleT,
  ...
};

/**
 * A linear horizontal progress indicator.
 */
const StepBar: React$AbstractComponent<StepBarT, HTMLElement> = React.forwardRef(({
  curr = 0,
  steps = 0,
  style = {},
  barStyle = {},
  ...otherProps
}: StepBarT, ref) => {
  const styles = {
    stepper: (theme: ThemeT, styler: StylerT) => styler(style, theme, {
      height: theme.spacing(2),
      width: '100%',
      background: theme.colors.monoInverse(),
      borderBottom: `${theme.line(1)} solid ${theme.colors.monoHighlight()}`,
    }),
    bar: (theme: ThemeT, styler: StylerT) => styler(barStyle, theme, {
      height: '100%',
      width: `${(curr / steps) * 100}%`,
      transition: 'width 300ms ease',
      backgroundColor: theme.colors.secondary(),
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.stepper}
    >
      <Box
        style={styles.bar}
      />
    </Box>
  );
});

StepBar.displayName = 'StepBar';

export default StepBar;
