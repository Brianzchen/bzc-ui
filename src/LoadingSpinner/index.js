// @flow
// Inspired from https://codepen.io/jczimm/pen/vEBpoL
import * as React from 'react';

import computeColor from '../internal/computeColor';
import compileSpace from '../internal/compileSpace';
import { isIE } from '../internal/isIE';

import Box from '../Box';
import type { BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';

const rotateKeyframe = {
  '100%': {
    transform: 'rotate(360deg)',
  },
};

const dashKeyframe = {
  '0%': {
    strokeDasharray: '1, 200',
    strokeDashoffset: 0,
  },
  '50%': {
    strokeDasharray: '89, 200',
    strokeDashoffset: '-35px',
  },
  '100%': {
    strokeDasharray: '89, 200',
    strokeDashoffset: '-124px',
  },
};

export type LoadingSpinnerT = {
  ...BoxT,
  /** The size of the spinner as pixels or a percentage */
  size?: string,
  /** assign a color to the spinner.
   * Accepts theme value `color` or `color(0.5)` as a string
   * or alternatively accepts a hexcode
   */
  color?: string,
  ...
};

/**
 * Render a spinning animation provide feedback to a user when content is loading
 */
const LoadingSpinner: React$AbstractComponent<LoadingSpinnerT, HTMLElement> = React.forwardRef<LoadingSpinnerT, HTMLElement>(({
  style = {},
  size = 'spacing(9)',
  color,
  ...otherProps
}: LoadingSpinnerT, ref): React.Node => {
  const theme = useTheme();

  const styles = {
    container: styler(style, theme, {
      position: 'relative',
      width: compileSpace(size, theme.spacing),
      ':before': {
        content: '""',
        display: 'block',
        paddingTop: '100%',
      },
    }),
    circular: {
      animationName: rotateKeyframe,
      animationDuration: '2s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      transformOrigin: 'center center',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
    },
    path: {
      animationName: dashKeyframe,
      animationDuration: '1.5s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out',
      strokeLinecap: 'round',
      ...isIE
        ? {
          strokeDasharray: '89, 200',
          strokeDashoffset: '-35px',
        }
        : { ...null },
    },
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      <Box
        as="svg"
        style={styles.circular}
        viewBox="25 25 50 50"
      >
        <Box
          as="circle"
          style={styles.path}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="6"
          strokeMiterlimit="10"
          stroke={color
            ? computeColor(color, theme)
            : theme.colors.primary()}
        />
      </Box>
    </Box>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
