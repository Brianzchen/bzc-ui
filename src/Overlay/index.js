// @flow
import * as React from 'react';
import { createPortal } from 'react-dom';

import hexToRgb from '../internal/hexToRgba';

import Box from '../Box';
import type { BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';
import type { RefObjT } from '../types';

// On a mobile device that has an address bar. When the user scrolls down
// the address bar will scroll away, but as the user is scrolling the frame is
// frozen and the user will get a glimpse of the elements behind the ModalBackground
// which looks quite ugly. This extra padding is there for that reason to
// eliminate this effect.
export const mobileLowerPadding = '100px';

export type OverlayT = {
  ...BoxT,
  /** anything you want to render on top of the background */
  children?: React.Node,
  /** callback function which will trigger when the background is clicked */
  onClick?: (...args: Array<any>) => any,
  ...
};

/**
 * Render a semi transparent overlay on top of all other elements.
 * Usually complemented by an additional element rendered on top of the Overlay
 */
const Overlay: React$AbstractComponent<OverlayT, HTMLElement> = React.forwardRef<OverlayT, HTMLElement>(({
  children = null,
  style = {},
  onClick,
  ...otherProps
}: OverlayT, ref: RefObjT) => {
  const theme = useTheme();

  const backgroundRef = React.useRef();
  const activeRef = ref || backgroundRef;

  const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    if (activeRef.current && event.target === activeRef.current) {
      onClick && onClick(event);
    }
  };

  const styles = {
    background: styler(style, theme, {
      position: 'fixed',
      top: 0,
      left: 0,
      paddingBottom: mobileLowerPadding,
      height: `calc(100% + ${mobileLowerPadding})`,
      width: '100%',
      backgroundColor: hexToRgb(theme.colors.monoPrimary(), 0.5),
      zIndex: theme.elevations.modal,
      lineHeight: 1.4,
    }),
  };

  if (document.body) {
    return createPortal(
      <Box
        {...otherProps}
        ref={activeRef}
        onClick={handleClick}
        style={styles.background}
      >
        {children}
      </Box>,
      document.body,
    );
  }

  return null;
});

Overlay.displayName = 'Overlay';

export default Overlay;
