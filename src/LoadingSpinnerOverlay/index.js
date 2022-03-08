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
  /** The size of the spinner as pixels or a percentage */
  size?: string,
  /** assign a color to the spinner.
   * Accepts theme value `color` or `color(0.5)` as a string
   * or alternatively accepts a hexcode
   */
  color?: string,
  ...
};

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
