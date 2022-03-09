// @flow
import React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import type { StyleT, StylerT, ThemeT } from '../types';

type Props = {
  ...BoxT,
  /** the currently active step */
  curr?: number,
  /** the total number of steps */
  steps?: number,
  /** overrides styling for root element */
  style?: StyleT,
  /** overrides the styling for the fill bar */
  barStyle?: StyleT,
  ...
};

const StepBar: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  curr = 0,
  steps = 0,
  style = {},
  barStyle = {},
  ...otherProps
}: Props, ref) => {
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
