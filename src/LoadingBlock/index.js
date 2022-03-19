// @flow
import * as React from 'react';

import Box, { type BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

import compileSpace from '../internal/compileSpace';

type Props = {
  ...BoxT,
  /**
   * height of the block,
   * can accept px or percentages as a string.
   * Alternatively spacing from the theme engine
   * can be used in the following format,
   * "spacing([space])" as a string
   */
  height?: string | number,
  /**
   * width of the block,
   * can accept px or percentages as a string.
   * Alternatively spacing from the theme engine
   * can be used in the following format,
   * "spacing([space])" as a string
   */
  width?: string | number,
  /** overrides styling for inner element */
  innerStyle?: StyleT,
  ...
};

/**
 * Reusable placeholder component that renders a shimmering effect while waiting for data to load
 */
const LoadingBlock: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  height = 'spacing(4)',
  width = 'spacing(12)',
  style = {},
  innerStyle = {},
  ...otherProps
}: Props, ref) => {
  const containerRef = React.useRef<HTMLElement | null>(null);
  const activeRef = ref || containerRef;

  const theme = useTheme();

  const baseColor = theme.colors.monoHighlight();
  const shineColor = theme.colors.monoLow();
  const containerWidth = compileSpace(width, theme.spacing);
  // Random number, it could really be anything but caters for most use cases
  const shadingWidth = `${400 * theme.scale}px`;

  const translateKeyframes = {
    '0%': {
      transform: `translate(-${shadingWidth}, 0)`,
    },
    '100%': {
      transform: `translate(${shadingWidth}, 0)`,
    },
  };

  const styles = {
    container: styler(style, theme, {
      height: compileSpace(height, theme.spacing),
      width: containerWidth,
      overflow: 'hidden',
      borderRadius: theme.corner(2),
      position: 'relative',
      background: baseColor,
    }),
    inner: styler(innerStyle, theme, {
      animationName: [translateKeyframes],
      animationDuration: '1.5s',
      animationFillMode: 'forwards',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      backgroundImage: `linear-gradient(to right, ${baseColor} 8%, ${shineColor} 18%, ${baseColor} 33%)`,
      position: 'absolute',
      height: '100%',
      width: shadingWidth,
      backgroundPosition: '50% 50%',
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={activeRef}
      style={styles.container}
    >
      <Box
        style={styles.inner}
      />
    </Box>
  );
});

LoadingBlock.displayName = 'LoadingBlock';

export default LoadingBlock;
