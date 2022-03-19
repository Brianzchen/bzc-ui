// @flow
import * as React from 'react';

import LoadingSpinner from '../LoadingSpinner';
import type { LoadingSpinnerT } from '../LoadingSpinner';
import Overlay from '../Overlay';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

type Props = {
  ...LoadingSpinnerT,
  /**
   * If the overlay should render
   */
  open?: boolean,
  /** overrides styling for overlay element */
  backgroundStyle?: StyleT,
  ...
};

/**
 * A type of loading that puts an overlay over the top of all other elements.
 * Useful if you want to block user interaction during the loading phase.
 */
const LoadingSpinnerOverlay: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  open = true,
  backgroundStyle = {},
  size,
  color = 'pure',
  ...otherProps
}: Props, ref): React.Node => {
  const theme = useTheme();

  const styles = {
    background: styler(backgroundStyle, theme, {
      display: 'flex',
      justifyContent: 'center',
    }),
  };

  return open && (
    <Overlay
      ref={ref}
      style={styles.background}
    >
      <LoadingSpinner
        {...otherProps}
        color={color}
        size={size ?? `${32 * theme.scale}px`}
      />
    </Overlay>
  );
});

LoadingSpinnerOverlay.displayName = 'LoadingSpinnerOverlay';

export default LoadingSpinnerOverlay;
